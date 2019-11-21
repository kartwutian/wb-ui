---
title: 引入方式
lang: zh
---

# uni-app 组件（基于vant的改造）

### 引入方式

- 在components目录下面放置下载的vant组件目录
- 在main.js里引入全局VantUni
- 在App.vue文件中引入vant全局样式

main.js
```js

import VantUni from './components/vant';

Vue.use(VantUni);

```

App.vue
```less

  @import "./components/vant/index.less";

```
