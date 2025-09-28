<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import { useAppStore } from "@/store/modules/app";

const showLoading = ref(false),
  appStore = useAppStore();

onMounted(async () => {
  const loadingElement = document.getElementById("splash-loading");

  if (loadingElement) {
    await nextTick();
    setTimeout(() => {
      loadingElement.remove();
    }, 2000);
  }

  window.addEventListener("show-loading", () => {
    showLoading.value = true;
  })

  window.addEventListener("hide-loading", () => {
    showLoading.value = false;
  })
});
</script>

<template>
  <el-config-provider :locale="appStore.locale" :size="appStore.size">
    <router-view />
  </el-config-provider>
</template>
