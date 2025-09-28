import { setupLayouts } from 'virtual:meta-layouts'
import generatedRoutes from 'virtual:generated-pages'
import {
  createRouter,
  RouteLocationNormalized,
  NavigationGuardNext,
  createWebHashHistory
} from 'vue-router'
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import defaultSettings from "@/config/setting"

NProgress.configure({ showSpinner: false })

const routes = setupLayouts(generatedRoutes);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

router.beforeEach(async (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
  NProgress.start()

  const { meta, query } = to || {},
    { hash, title } = meta || {};

  const width = (meta && meta.windowWidth) || defaultSettings.windowWidth;
  const height = (meta && meta.windowHeight) || defaultSettings.windowHeight;
  
  if (typeof window !== 'undefined' && (window as any).electronWindow) {
    (window as any).electronWindow.resizeWindow(width, height);
  }

  next()
})

router.afterEach(() => NProgress.done())

export default router

function hasWhiteList(path: string) {
  return /^\/(redirect|commons)\//.test(path)
}

function browserSetter(title: any) {
  if (title) {
    window.document.title = title
  }
}

export interface bridgeTicketInterface {
  token?: string;
  baseUrl?: string;
  appVersion?: string;
  id?: string;
  downLoadLinkType?: string;
  tempDxSource?: string;
  app?: string;
}