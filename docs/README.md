---
home: true
actionText: Get Started →
actionLink: /pro/
features:
  - title: 集成vuex
    details: 使用vuex 全局状态管理，实现了基于vuex的loading及reload插件
  - title: 支持自动创建路由结构及依赖
    details: 基于page.json,运行`npm run generatePages`命令，会根据page.json文件的路由配置，生成相应的页面文件
  - title: 支持自动生成service及modules文件内容
    details: 运行`npm run generateApis`命令，基于Yapi接口，自动生成service及module文件,注意cookie需要自己在相应脚本位置配置
footer: MIT Licensed | Copyright © 2019-present
---

### Getting started is very simple

```bash

# 安装脚手架
$ npm i -g wanbo-cli

# 生成wb-uni-pro项目
$ wanbo init wb-uni-pro

# 进入到项目根目录
$ cd wb-uni-pro

# Install deps 安装依赖
$ yarn add # or npm install

# 打开hbuilderX, 导入项目，安装less插件等，运行项目

```
