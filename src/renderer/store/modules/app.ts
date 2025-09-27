import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import defaultSettings from "@/config/setting";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";

export const useAppStore = defineStore("app", () => {
  const language = useStorage("language", defaultSettings.language),
    size = useStorage<any>("size", defaultSettings.size);

  const locale = computed(() => {
    if (language?.value == "en") {
      return en;
    } else {
      return zhCn;
    }
  })

  // Change language
  function changeLanguage(val: string) {
    language.value = val;
  }

  function changeSize(val: string) {
    size.value = val;
  }

  return {
    locale,
    changeLanguage,
    size,
    changeSize
  };
});
