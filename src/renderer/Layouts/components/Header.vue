<template>
  <div class="flex w-full h-full items-center justify-between gap-x-2 bg-white z-10" style="-webkit-app-region: drag;">
    <div class="flex items-center" style="-webkit-app-region: no-drag;">
      <button @click="goBack" aria-label="返回" class="transition-all duration-200 select-none w-8 h-8 bg-transparent border-none p-1 cursor-pointer hover:opacity-80 hover:bg-gray-100 rounded">
        <img src="/images/goBack.png" class="w-4 h-4" alt="返回" />
      </button>
    </div>

    <h1 class="title text-lg text-black flex-1 truncate overflow-hidden text-ellipsis">{{ title }}</h1>

    <div class="flex items-center gap-x-2" style="-webkit-app-region: no-drag;">
      <button @click="minimize" aria-label="最小化窗口" class="transition-all duration-200 select-none w-8 h-8 bg-transparent border-none p-1 cursor-pointer hover:opacity-80 hover:bg-gray-100 rounded">
        <img src="/images/min.png" class="w-5 h-6" alt="最小化" />
      </button>
      <button @click="close" aria-label="关闭窗口" class="transition-all duration-200 select-none w-8 h-8 bg-transparent border-none p-1 cursor-pointer hover:opacity-80 hover:bg-gray-100 rounded">
        <img src="/images/close.png" class="w-5 h-5" alt="关闭" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import { computed } from "vue"

const route = useRoute(),
  router = useRouter();

const title = computed(() => {
  if (route.meta?.title) {
    return route.meta.title
  }
  if (route.name) {
    return route.name
  }
  return "vite-electron-template"
})

function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

const minimize = () => {
  window.electron.ipcRenderer.send("minimize");
};

const close = () => {
  window.electron.ipcRenderer.send("quit");
};
</script>
