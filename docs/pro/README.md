---
title: 简介
lang: zh
---
## 写在前面
wb-uni-pro是一套通用的uni-app项目开发模板,抽象了一些通用的项目工具方法，
约定了通用的页面结构，提供了项目开发中常用的工具方法及一些目前场景下的
解决方案，我们希望这套模板，可以尽量减少开发者在框架层面的时间损耗，关注
项目的业务代码，提高项目的开发效率.

## 目录结构
```
.
├── components/                    // 组件目录
    ├──app/                        // 当前app相关组件
        ├── styles/                // 所有组件样式目录，全局使用，在App.vue里引入
    ├──wanbo/                      // 万博通用组件沉淀
        ├── styles/                // 所有组件样式目录，全局使用，在App.vue里引入
    ├──vant/                      // 组件库：基于vant weapp的组件在uni-app里的实现
        ├── index.less/           // vant组件样式目录，全局使用，在App.vue里引入
        ├── index.js/             // vant插件，全局使用，Vue.use(plugin),在App.vue里引入
    ├──[others]/                   // 其他组件
├── config/                        // 配置文件目录
    ├──config.js                   // 配置文件主入口
    ├──config.base.js              // 通用配置
    ├──config.dev.js               // 开发配置
    ├──config.prod.js              // 线上配置
├── locales/                       // 国际化
└── pages/                         // 路由目录
    ├── index/                     // 页面目录
        ├── services/              // 子模块 接口目录
        ├── models/                // vuex 子modules
        ├── page1.vue              // 页面 1，任意命名
        ├── page2.vue              // 页面 2，任意命名
        └── page3.vue              // 页面 3，任意命名
├── services/                      // 全局 接口目录
├── static                         // 本地静态文件目录，小程序大小有限制，不推荐使用，浪费容量
├── store                          // vuex store 目录
        ├── modules/                // 子modules
        ├── plugins/               // vuex插件
        ├── index.js               // store 入口，引入各个子module
├── utils                          // 工具方法目录
        ├── helper.js              // 项目中用到的工具方法
        ├── request.js             // ajax请求封装
└── package.json

```
