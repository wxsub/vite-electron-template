import { createApp } from 'vue'
import "@/assets/styles/reset.css"
import "element-plus/dist/index.css"
import '@/assets/styles/element-theme.css' // 自定义element-plus主题
import App from '@/App.vue'
import Router from '@/config/router.config'
import SvgIcon from "@/components/SvgIcon/index.vue"

const app = createApp(App)

app.use(Router).component("svg-icon", SvgIcon).mount('#app')
