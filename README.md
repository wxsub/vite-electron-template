# vite-electron-template

Vite Electron Template 是一款基于主流前端技术（如 TypeScript、ElementPlus、Tailwindcss、Vue3 和 Electron）构建的轻量级高性能桌面应用开发框架。该框架集成了文件路由系统、自动化组件库及 MockJs 模拟工具等功能模块。

**项目node版本不低于18.0.0**

1. 安装python
安装路径`lib/python-3.11.9-amd64.exe`
安装完成后执行`python --version`会显示版本号

2. 安装Visual Studio
[下载](https://visualstudio.microsoft.com/zh-hans/thank-you-downloading-visual-studio/?sku=Community&channel=Release&version=VS2022&source=VSLandingPage&passive=false&cid=2030)后选择c++ 桌面开发

3. 安装Visual Studio Build Tools
[下载](https://visualstudio.microsoft.com/zh-hans/thank-you-downloading-visual-studio/?sku=BuildTools)后选择c++ 桌面开发

4. 安装NodeJS版本
```bash
// 版本
v20.18.1
```

6. 设置pnpm以及清除npm缓存
```bash
npm install -g pnpm
pnpm cache clean --force
```

5. 设置electron为国内镜像源
```bash
pnpm config set ELECTRON_MIRROR https://npmmirror.com/mirrors/electron/
```


### 启动开发环境 ⚒️

```bash
pnpm run dev
```

## 构建指令
```bash
// 打包目录结构
pnpm run build:dir

// 打包windows安装包
pnpm run build:win

// 打包mac安装包
pnpm run build:mac

// 打包linux安装包
pnpm run build:linux
```

## Project Structure

```bash
- scripts/ # all the scripts used to build or serve your application, change as you like.
- src/
  - main/ # Main thread (Electron application source)
  - renderer/ # Renderer thread (VueJS application source)
```

## 使用静态文件

若需在安装后将文件复制到应用程序目录，请将这些文件添加至 `src/main/static` 目录中。

该目录下的文件仅对 `main` 进程可见，类似于 `src/renderer/assets` 仅对 `renderer` 进程可见的机制。除此之外，其工作原理与您在其他前端项目中的操作完全一致。

#### 从主进程引用静态文件

```ts
import { app } from 'electron';
import { join } from 'path';
import { readFileSync } from 'fs';

const path = join(app.getAppPath(), 'static', 'myFile.txt');
const buffer = readFileSync(path);
```

## FAQ

### ⨯ cannot execute  cause=fork/exec C:\Users\EDY\AppData\Local\nvm\v20.18.1\node_modules\pnpm\bin\pnpm.cjs: %1 is not a valid Win32 application.

bin\pnpm.cjs文件头部`#!/usr/bin/env node`替换成`#!node`

### electron always "Electron failed to install correctly, please delete node_modules/electron and try installing again"

package.json文件中添加

```json
"pnpm": {
  "onlyBuiltDependencies": ["electron"]
}
```