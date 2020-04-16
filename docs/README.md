---
home: true
actionText: Get Started →
actionLink: /mobx-admin/
features:
  - title: mobx-admin
    details: 基于react+mobx+antd+hooks的admin项目模板
  - title: next-portail
    details: 基于next+mobx的ssr项目模板
  - title: uni-app-pro
    details: 基于uni-app的项目模板
footer: MIT Licensed | Copyright © 2019-present
---
## 万博内部项目的脚手架

```
// 全局安装
npm i -g wanbo-cli

// 显示help
wanbo --help

// 显示init子命令的help
wanbo init -h

// 初始化uni-app项目
wanbo init [project-name]

// 初始化admin项目
wanbo init --type=admin [project-name]

// 初始化porta项目
wanbo init --type=portail [project-name]


// 自定义仓库, 只支持github

wanbo init demo --repo=kartwutian/vscode_snippet_tempalte_generate

// 自定义分支

wanbo init demo --repo=kartwutian/wb-ui -b=wb-uni-pro

```