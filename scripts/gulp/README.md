## 说明

packages/为vant-weapp的源代码

1. 通过gulp转化packages/下的组件为uni-app的初始代码

```$xslt

compiler.js文件存放gulp任务代码

gulp less -f ./scripts/gulp/compiler.js  生成样式文件

node ./scripts/gulp/generate.js 按照依赖生成入口index.less


```
