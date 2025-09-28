interface DefaultSettings {
    title: string;  // system title
    header: string,
    language: "zh-cn" | "en",  // language, default is en
    layout: string;
    size: "default" | "small" | "medium" | "large";  // ElementPlus Components Layout size
    themeColor: string;
}

const defaultSettings: DefaultSettings = {
    title: "vite-electron-template",
    header: "60px",
    language: "en",  // default language, you can set more languages in the app store
    layout: "left",
    size: "default",
    themeColor: "#409EFF"
};

export default defaultSettings
