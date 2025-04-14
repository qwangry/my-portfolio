# 项目实现

## 依赖安装

### 初始化项目

```bash
npm create vite@latest my-portfolio --template react-ts
cd my-portfolio
```

### 安装ESLint

```bash
npm install --save-dev eslint@9.24.0 @eslint/js@9.21.0
```

```bash
npm install --save-dev eslint-plugin-react-hooks@5.1.0 eslint-plugin-react-refresh@0.4.19
```

### 配置 Git 提交规范（Husky + Commitlint）

```bash
npm install --save-dev husky@9.1.7 lint-staged@15.5.1 @commitlint/cli@19.8.0 @commitlint/config-conventional@19.8.0
```

- 初始化

```bash
npx husky install
npm pkg set scripts.prepare="husky install"
```

- 配置Commitlint

```bash
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

- 配置Lint-Staged

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

### 安装TypeScript相关

```bash
npm install --save-dev typescript@~5.7.2 @types/react@19.1.1 @types/react-dom@19.0.4
```

### 安装项目依赖

- 安装路由库

```bash
npm install react-router-dom@7.5.0
npm install --save-dev @types/react-router-dom@5.3.3
```

- 安装 Three.js 相关库（3D 渲染）

```bash
npm install three@0.175.0 @react-three/fiber@9.1.2 @react-three/drei@10.0.6
npm install --save-dev @types/three@0.175.0
```

- 安装动画库

```bash
npm install framer-motion@12.6.5
```

### 安装Vite插件

```bash
npm install --save-dev @vitejs/plugin-react@4.3.4 rollup-plugin-visualizer@5.14.0
```

## 项目实现

### 基础功能实现

定义需要展示的简历内容，完成基础内容的展示

### 动画效果实现

1. 3D旋转地球

2. 3D文字标题

3. 个人头像点云效果

4. 星空背景

### 主题切换实现

定义不同主题的css变量，在NavBar添加主题切换按钮

### 添加AI助手

选用[petercat项目](https://github.com/petercat-ai/petercat)，能将所有相关 Github 文档和 issue 将自动入库，作为机器人的知识依据

### 移动端适配

在最初的实现中就实时关注移动端效果，完成移动端适配

## 项目部署

选用[vercel平台](https://vercel.com/)托管[GitHub仓库](https://github.com/qwangry/my-portfolio)，部署项目