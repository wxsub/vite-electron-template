import { defineConfig } from "vite"
import restart from 'vite-plugin-restart'

import Path from "path"
import vuePlugin from "@vitejs/plugin-vue"

import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"

import Layouts from "vite-plugin-vue-meta-layouts"
import Pages from "vite-plugin-pages"

import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
// import Icons from "unplugin-icons/vite"
// import { IconsResolver } from "unplugin-icons/resolver"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"

const pathSrc = Path.resolve(__dirname, 'src/renderer')

const config = defineConfig({
    root: Path.join(__dirname, 'src', 'renderer'),
    publicDir: 'public',
    server: {
        port: 8080
    },
    css: {
      modules: {
        generateScopedName: process.env.NODE_ENV === 'production' ? '[hash:base64:6]' : '[name]__[local]'
      },
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/assets/styles/variables.scss" as *;`
        }
      },
      postcss: {
        plugins: [tailwindcss(), autoprefixer()]
      }
    },
    resolve: {
        alias: {
            '@': Path.resolve(__dirname, './src/renderer')
        }
    },
    open: false,
    build: {
        outDir: Path.join(__dirname, 'build', 'renderer'),
        emptyOutDir: true
    },
    plugins: [
        vuePlugin(),
        Pages({
            dirs: 'pages',
            extensions: ['vue'],
            routeStyle: 'nuxt',
            importMode: "sync",
            exclude: ['**/components/*.vue']
        }),
        Layouts({
            target: 'Layouts',
            defaultLayout: 'default'
        }),
        AutoImport({
            imports: ["vue", "@vueuse/core"],
            dirs: ["src/renderer/composable"],
            resolvers: [ElementPlusResolver()],
            eslintrc: {
                enabled: false,
                filepath: "./.eslintrc-auto-import.json",
                globalsPropValue: true
            },
            vueTemplate: true,
            dts: 'src/renderer/types/auto-imports.d.ts'
        }),
        Components({
            resolvers: [
            ElementPlusResolver()
            ],
            dirs: ["src/renderer/components"],
            dts: false
        }),
        // Icons({ autoInstall: true }),
        createSvgIconsPlugin({
            iconDirs: [Path.resolve(pathSrc, "assets/icons")],
            symbolId: "icon-[dir]-[name]"
        }),
        restart({
            restart: ['src/Layouts/**/*']
        })
    ]
});

module.exports = config;
