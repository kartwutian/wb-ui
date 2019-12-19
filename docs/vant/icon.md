---
title: Icon 图标
lang: zh
vant: true
---

# Icon 图标

### 介绍

基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组件中通过`icon`属性引用

### 引入

```js
import VanIcon from "@/components/vant/icon/index.vue"
```

## 代码演示

### 基础用法

`Icon`的`name`属性支持传入图标名称或图片链接

```html
<van-icon name="close" />
<van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
```

### 提示信息

设置`dot`属性后，会在图标右上角展示一个小红点。设置`info`属性后，会在图标右上角展示相应的徽标

```html
<van-icon name="chat" dot />
<van-icon name="chat" info="9" />
<van-icon name="chat" info="99+" />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| name | 图标名称或图片链接 | *string* | - | - |
| dot | 是否显示图标右上角小红点 | *boolean* | `false` | - |
| info | 图标右上角文字提示 | *string \| number* | - | - |
| color | 图标颜色 | *string* | `inherit` | - |
| size | 图标大小，如 `40rpx`，`2em`，默认单位为`px` | *string \| number* | `inherit` | - |
| custom-style | 自定义样式 | *string* | - | - |
| class-prefix | 类名前缀 | *string* | `van-icon` | - |
>项目中需要自己引入*iconfont*字体图标库的，可以直接在app.vue中直接引入字体图标样式，用van-icon配置 class-prefix
为icon，custom-class配置为iconfont，这时候就能直接引自定义的字体图标了，name配置为自己项目中的icon名

```vue
  <van-icon
      class-prefix="icon"
      name="success"
      size="64rpx"
      custom-class="iconfont"
  />  
```

### Events

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| @click | 点击图标时触发 | - |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
