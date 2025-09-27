<template>
  <el-config-provider :size="size">
    <el-container>
      <el-container>
        <el-main :class="defaultLayout.main">
          <router-view v-slot="{ Component, route }">
            <transition name="router-fade" mode="out-in">
              <keep-alive>
                <section>
                  <component :is="Component" :key="route.fullPath" />
                </section>
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-config-provider>
</template>
<script setup lang="ts">
import setting from '@/config/setting'

const { size } = setting
</script>

<style module="defaultLayout" lang="scss">
.main {
  max-height: 100vh;
  overflow-y: auto;
}
</style>