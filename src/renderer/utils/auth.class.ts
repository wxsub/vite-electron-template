import { reactive, toRaw } from "vue"
import router from "@/config/router.config"

class Auth {
  private static instance: Auth | null = null
  private UserInfo = reactive<Record<string, any>>({})

  public static getInstance(): Auth {
    if (!this.instance) {
      this.instance = new Auth();
    }
    return this.instance;
  }

  private constructor() {
    this.initUserInfo()
  }

  private initUserInfo() {
    try {
      const storedInfo = localStorage.getItem("XSRF-USER-INFO")
      if (storedInfo) {
        const parsed = JSON.parse(storedInfo)
        Object.assign(this.UserInfo, parsed)
      }
    } catch (e) {
      console.error("Failed to initialize user info:", e);
    }
  }

  public signout(autoRedirect: boolean = true) {
    if (autoRedirect) router.push({ path: "/redirect/chooseRole" })
    localStorage.removeItem("XSRF-TOKEN")
    localStorage.removeItem("XSRF-PHONE")
    localStorage.removeItem("XSRF-USER-INFO")
    Object.assign(this.UserInfo, {})
  }

  public static getToken() {
    return localStorage.getItem("XSRF-TOKEN")
  }

  get Users() { return this.UserInfo }

  set Users(value: any) {
    Object.assign(this.UserInfo, value)
    localStorage.setItem("XSRF-USER-INFO", JSON.stringify(toRaw(this.UserInfo)))
  }
}

export function useAuth() {
  return Auth.getInstance()
}