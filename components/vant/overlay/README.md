---
title: Overlay 遮罩层
lang: zh
vant: true
---

# Overlay 遮罩层

### 介绍

创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作

### 引入

在script中引入组件

```js
import VanOverlay from "@/components/vant/overlay/index.vue"
```

## 代码演示

### 基础用法

```html
<van-button type="primary" @click="onClickShow">显示遮罩层</van-button>
<van-overlay :show="show" @click="onClickHide"/>
```

```js
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    onClickShow () {
      this.show = true
    },
    onClickHide () {
      this.show = false
    }
  }
}
```

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| show | 是否展示遮罩层 | *boolean* | `false` | - |
| z-index | z-index 层级 | *string \| number* | `1000` | - |
| duration | 动画时长，单位秒 | *string \| number* | `0.3` | - |
| class-name | 自定义类名 | *string* | - | - |
| custom-style | 自定义样式 | *string* | - | - |

### Events

| 事件名 | 说明 | 回调参数 |
|-----------|-----------|-----------|
| @click | 点击时触发 | - |
