import { createApp } from 'vue'
import "tailwindcss/tailwind.css" // Tailwind CSS
import "@/assets/styles/reset.css"
import "element-plus/dist/index.css"
import '@/assets/styles/element-theme.css' // 自定义element-plus主题
import App from '@/App.vue'
import Router from '@/config/router.config'
import SvgIcon from "@/components/SvgIcon/index.vue"
import { setupStore } from '@/store'

const app = createApp(App)

// Initialize Pinia store
setupStore(app)

app.use(Router).component("svg-icon", SvgIcon).mount('#app')
