---
title: Nav-bar 导航栏
lang: zh
vant: true
---

# NavBar 导航栏

### 引入

在script中引入组件

```js
import VanNavBar from "@/components/vant/nav-bar/index.vue"
```

## 代码演示

### 基础用法

```html
<van-nav-bar
  title="标题"
  left-text="返回"
  right-text="按钮"
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>
```

``` javascript
export default {
  methods: {
    onClickLeft () {
      uni.showToast({
        title: "点击返回",
        icon: "none"
      })
    },
    onClickRight () {
      uni.showToast({
        title: "点击按钮！！！",
        icon: "none"
      })
    }
  }
}
```


### 高级用法
通过 slot 定制内容

```html
<van-nav-bar
  title="标题"
  left-text="返回"
  left-arrow
>
  <van-icon
    name="search"
    slot="right"
    custom-class="icon"
  />
</van-nav-bar>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| title | 标题 | *string* | `''` | - |
| left-text | 左侧文案 | *string* | `''` | - |
| right-text | 右侧文案 | *string* | `''` | - |
| left-arrow | 是否显示左侧箭头 | *boolean* | `false` | - |
| fixed | 是否固定在顶部 | *boolean* | `false` | - |
| border | 是否显示下边框 | *boolean* | `true` | - |
| z-index | 元素 z-index | *number* | `1` | - |
| safe-area-inset-top | 是否留出顶部安全距离（状态栏高度） | *boolean* | `true` | - |

### Slot

| 名称 | 说明 |
|-----------|-----------|
| title | 自定义标题 |
| left | 自定义左侧区域内容 |
| right | 自定义右侧区域内容 |

### Events

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| @click-left | 点击左侧按钮时触发 | - |
| @click-right | 点击右侧按钮时触发 | - |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| title-class | 标题样式类 |
