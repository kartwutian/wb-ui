---
title: NoticeBar 通告栏
lang: zh
vant: true
---

# NoticeBar 通告栏

### 引入

在script中引入组件

```js

import VanNoticeBar from "@/components/vant/notice-bar/index.vue"

export default {
  components: {VanNoticeBar},
  data () {
    return {
      text: '足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。'
    }
  }
}
```
  

## 代码演示

### 基础用法

```html
<van-notice-bar
  :text="text"
  left-icon="//img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
/>
```

### 禁用滚动
文字内容多于一行时，可通过`scrollable`参数控制是否开启滚动

```html
<van-notice-bar
  :scrollable="false"
  :text="text"
/>
```

### 多行展示
禁用滚动时，可以设置`wrapable`来开启多行展示

```html
<van-notice-bar
  wrapable
  :scrollable="false"
  :text="text"
/>
```

### 使用左右插槽
使用`left-icon`插槽和`right-icon`插槽自定义左右固定内容

```html
<van-notice-bar :text="text">
  <text slot="left-icon">[公告]</text>
  <text slot="right-icon">[结束]</text>
</van-notice-bar>
```

### 自定义样式

```html
<van-notice-bar
  :text="text"
  color="#1989fa"
  background="#ecf9ff"
  left-icon="info-o"
/>
```

### 通告栏模式
默认模式为空，支持`closeable`和`link`。

```html
<!-- closeable 模式，在右侧显示关闭按钮 -->
<van-notice-bar
  mode="closeable"
  :text="text"
/>

<!-- link 模式，在右侧显示链接箭头 -->
<van-notice-bar
  mode="link"
  :text="text"
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| text | 通知文本内容 | *string* | - | - |
| mode | 通告栏模式，可选值为 `closeable` `link` | *string* | `''` | - |
| delay | 动画延迟时间 (s) | *number* | `1` | - |
| speed | 滚动速率 (px/s) | *number* | `50` | - |
| scrollable | 是否在长度溢出时滚动播放 | *boolean* | `true` | - |
| left-icon | 左侧图标名称或图片链接，可选值见 [Icon 组件](#/icon) | *string* | - | - |
| color | 文本颜色 | *string* | `#ed6a0c` | - |
| backgroundColor | 滚动条背景 | *string* | `#fffbe8` | - |
| open-type | 微信开放能力 | *string* | `navigate` | - |
| url | 点击后跳转的链接地址 | *string* | - | - |
| wrapable | 是否开启文本换行，只在禁用滚动时生效 | *boolean* | `false` | - |

### Events

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| @click | 点击事件回调 | - |

### Slot

| 名称 | 说明 |
|-----------|-----------|
| left-icon | 自定义左侧固定内容 |
| right-icon | 自定义右侧固定内容 |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
