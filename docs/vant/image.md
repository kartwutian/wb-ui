---
title: Image 图片
lang: zh
vant: true
---

# Image 图片

### 引入

```js
import VanImage from "@/components/vant/image/index";
```

## 代码演示

### 基础用法

基础用法与[原生](https://developers.weixin.qq.com/miniprogram/dev/component/image.html)image一致，可以设置`src`、`width`、`height`等原生属性

```html
<van-image
  width="100"
  height="100"
  src="https://img.yzcdn.cn/vant/cat.jpeg"
/>
```

### 填充模式

通过`fit`属性可以设置图片填充模式，可选值见下方表格

```html
<van-image
  width="10rem"
  height="10rem"
  fit="contain"
  src="https://img.yzcdn.cn/vant/cat.jpeg"
/>
```

### 圆形图片

通过`round`属性可以设置图片变圆，注意当图片宽高不相等且`fit`为`contain`或`scale-down`时，将无法填充一个完整的圆形。

```html
<van-image
  round
  width="10rem"
  height="10rem"
  src="https://img.yzcdn.cn/vant/cat.jpeg"
/>
```

### 加载中提示

`Image`组件提供了默认的加载中提示，支持通过`loading`插槽自定义内容

```html
<van-image width="100%" height="27vw" use-loading-slot>
  <van-loading
    slot="loading"
    type="spinner"
    size="20"
    vertical
  />
</van-image>
```

### 加载失败提示

`Image`组件提供了默认的加载失败提示，支持通过`error`插槽自定义内容

```html
<van-image width="100%" height="27vw" src="x"></van-image>
```

```html
<van-image width="100%" height="27vw" src="x" use-error-slot>
  <text slot="error">加载失败</text>
</van-image>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| src | 图片链接 | `string` | - | - |
| fit | 图片填充模式 | `string` | `fill` | - |
| alt | 替代文本 | `string` | - | - |
| width | 宽度，默认单位为`px` | `string | number` | - | - |
| height | 高度，默认单位为`px` | `string | number` | - | - |
| round | 是否显示为圆形 | `boolean` | `false` | - |
| lazy-load | 是否懒加载 | `boolean` | `false` | - |
| show-error | 是否展示图片加载失败提示 | `boolean` | `true` | - |
| show-loading | 是否展示图片加载中提示 | `boolean` | `true` | - |
| show-menu-by-longpress | 开启长按图片显示识别小程序码菜单 | `boolean` | `false` | - |
| use-loading-slot | 是否使用了loading slot | `boolean` | `false` | - |
| use-error-slot | 是否使用了error slot | `boolean` | `false` | - |

### 图片填充模式

| 名称 | 含义 |
|------|------|
| contain | 保持宽高缩放图片，使图片的长边能完全显示出来 |
| cover | 保持宽高缩放图片，使图片的短边能完全显示出来，裁剪长边 |
| fill | 拉伸图片，使图片填满元素 |
| none | 保持图片原有尺寸 |
| scale-down | 由于小程序原生不支持这个属性，所以暂时和contain保持一致 |

### Events

| 事件名 | 说明 | 回调参数 |
|------|------|------|
| @click | 点击图片时触发 | event: Event |
| @load | 图片加载完毕时触发 | event: Event |
| @error | 图片加载失败时触发 | event: Event |

### Slots

| 名称 | 说明 |
|------|------|
| loading | 自定义加载中的提示内容 |
| error | 自定义加载失败时的提示内容 |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| image-class | 图片样式类 |
| loading-class | loading样式类 |
| error-class | error样式类 |
