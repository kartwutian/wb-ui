---
title: 使用文档
lang: zh
---

## 写在前面

这是一个轻量级的后台模板，诞生的背景是觉得ant-design-pro依赖过于庞大，redux的数据流写法有点繁琐，自带的css-module样式写法繁琐，不舒服，umi的
外层框架，开箱即用，降低了使用成本，把路由相关的代码直接生成在了.umi文件夹下，但是深入使用你还是得了解的实现，配置，一定程度上增加了学习成本，不舒服，不自由，相对大点的后台管理项目，总是会有很多类似的界面，能否一键生成，service，module，page之间的依赖关系，每次都要手写，费时费力，能否自动生成... so，mobx + react-css-modules + antd + template了解一下

## features

- 使用mobx mobx-react管理数据流
- 引入react-css-modules
- 全面拥抱hooks
- 提取全局配置到src/pages.js,统一生成页面及相关service，model，less等文件


## 初始化项目

```bash

# 安装脚手架
$ npm i -g wanbo-cli

# 生成admin项目
$ wanbo init wb-admin --type=admin

# 进入到项目根目录
$ cd wb-admin

# Install deps 安装依赖
$ yarn install # or npm install

# 用编辑器打开项目，推荐使用vscode

```

## 目录结构

```
.
├── __DLL__/                        // dll动态链接库生成的文件目录
├── config/                         // 配置文件目录
    ├── config.js                   // exports 公用配置变量
    ├── webpack.config.common.js    // 公用webpack配置
    ├── webpack.config.dev.js       // 开发时的webpack通用配置
    ├── webpack.config.dll.js       // 生成动态链接库的webpack配置
    ├── webpack.config.prod.js      // 打包生成环境的配置
├── scripts/                        // 辅助脚本目录
├── src/                            // 源代码目录
    └── assets/                     // 路由目录
        ├── styles/                 // 全局样式放置的目录，该目录下的样式不会被css-module处理，是全局的
            ├── app.less/           // 应用全局样式入口文件
            ├── cantd.less/         // 自定义antd主题的less文件
        ├── template/               // html-webpack-plugin模板index.html的存放的目录
    └── components/                 // 应用级别组件目录
        ├── Exception/              // 相关组件
    └── layouts/                    // 应用整体结构布局目录
        ├── App/                    // 登录后的layout
        ├── Root/                   // 应用跟目录
            ├── AppRouter.js        // 处理应用所有路由
            ├── index.js            // 入口文件
    └── models/                     // 自己手动书写的store模块目录
        ├── global.js               // 全局的global store
    └── pages/                      // 路由目录
        ├── Home/                   // 页面目录
            ├── _service.Home.js    // service文件，代理request
            ├── index.js            // Home页面文件，除了index，其它的文件页面都应该用大写字母开头
            ├── index.model.js      // model文件，存放该页面的全局store
    └── public/                     // 服务器静态资源目录
        ├── logo.png                // 
    └── store/                      // mobx 全局 store 目录
        ├── createStore.js          // 封装createStore, 这个文件在生成页面的时候会被重写，
                                    // 自动注入生成好的model依赖，理论上不应该被手动修改，
                                    // 若真需要修改，记得同时改动生成该文件的模板文件，在scripts/template目录下
        ├── index.js                // export StoreProvider 及 useStore
    ├── utils/                      // 工具方法目录
            ├── auth.js             // 可以封装自己权限相关的代码
            ├── helper.js           // 项目中用到的工具方法
            ├── request.js          // ajax请求封装
    ├── _router.js                  // 依据pages.js中相关页面生成的路由文件，理论上不应该手动修改，会注入到全局的global store
    ├── index.js                    // render入口文件
    ├── pages.js                    // 页面及打包 配置文件

└── package.json

```
# mobx mobx-react
- 对不熟悉mobx及mobx-react的情况，推荐先阅读相关文档
> [mobx-react](https://mobx-react.js.org/) 

> [mobx-react github](https://github.com/mobxjs/mobx-react) 

> [mobx github](https://github.com/mobxjs/mobx) 


## 开始使用

- 依赖安装完成后，先跑一遍 `yarn run dll`或者`npm run dll`，重新按照你安装的依赖版本生成相应的dll文件,目前默认提取了mobx，moment，axios，react，具体可以按实际项目扩展，在`pages.js`的`webapck.dll`上添加入口及依赖；

```js
// 扩展动态链接库，扩展完成后执行一遍 yarn run dll
{
  webpack: {
    dll: {
      // jquery: ['jquery'] 类似
    }, // 扩展dll动态链接库
  },
}
```

- 执行yarn start，启动项目

- 在pages.js里配置页面

- 执行`yarn run g:pages`生成初始页面

- 开始开发业务

```js
module.exports = {
  webpack: { // 开发及打包相关的配置提到这里统一配置
    dll: {}, // 扩展dll动态链接库
    //存放需要变动的webpack的配置参数
    publicPath: '/demo/', // 打包时候的前缀配置，注意一定要/开头，/结尾，因为我偷懒了,不会用在开发环境
    htmlWebpackPlugin: {
      title: 'template-admin',
    }, // html-webpack-plugin 的配置参数，主要可以用来配置title及其meta
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    }, // 开发时候的代理配置
  },
  pages: [ // 需要生成的页面
    // pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
    // {
    //   path: 'pages/Home/index', // 生成的页面路径
    //   //   template: 'list', // 配置生成相关页面使用的模板文件，没有则用默认模板文件
    //   route: '/project', // 使用的前端路由
    //   name: '首页',
    //   hasBread: true, // 是否展示自带面包屑
    //   subTitle: '子标题', // 自带header的子标题
    // },
    {
      path: 'pages/Login/index',
      route: '/login',
      name: '登录',
      isInLayout: false, // 标记不包括layout
    },
    {
      path: 'pages/Home/index',
      route: '/home',
      name: '首页',
    },
    {
      route: '/project',
      name: '项目',
    },
    {
      path: 'pages/Project/List',
      route: '/project/list',
      name: '项目列表',
      hasBread: true,
    },
    {
      path: 'pages/Project/Developing',
      route: '/project/Developing',
      name: '项目开发',
      template: 'list',
      hasBread: true,
    },
    // {
    //   path: 'pages/Home/Shop/Demo',
    //   route: '/home/shop/demo',
    //   name: 'demo',
    //   isInLayout: false, // 标记不包括layout
    // },
    // {
    //   route: '/form', // 没有path,代表不生成页面，只是为了注入name等元信息
    //   name: '表单页',
    // },
    // {
    //   path: 'pages/Form/Basic',
    //   route: '/form/basic',
    //   template: 'list',
    //   name: 'basic',
    //   authority: ['user'], // 用于权限控制，菜单和路由
    // },
    // {
    //   path: 'pages/Form/Step',
    //   route: '/form/step',
    //   template: 'list',
    //   name: 'step',
    //   authority: 'admin', // 用于权限控制，菜单和路由
    // },
    // {
    //   path: 'pages/Maps/index',
    //   route: '/maps',
    //   name: '地图',
    //   isHideInMenus: true, // 代表在菜单栏隐藏菜单
    // },
    // {
    //   path: 'pages/Test/Demo',
    //   template: 'list'
    // }
  ],
};

```
