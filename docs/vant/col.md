---
title: Layout 布局
lang: zh
vant: true
---

# Layout 布局

### 介绍

Layout 提供了`van-row`和`van-col`两个组件来进行行列布局

### 引入

在script中引入组件

```js
import VanRow from "@/components/vant/row/index";
import VanCol from "@/components/vant/col/index";
```

## 代码演示

### 基本用法

Layout 组件提供了`24列栅格`，通过在`Col`上添加`span`属性设置列所占的宽度百分比
此外，添加`offset`属性可以设置列的偏移宽度，计算方式与 span 相同

```html
<van-row>
  <van-col span="8" custom-class="dark">span: 8</van-col>
  <van-col span="8" custom-class="light">span: 8</van-col>
  <van-col span="8" custom-class="dark">span: 8</van-col>
</van-row>

<van-row>
  <van-col span="4" custom-class="dark">span: 4</van-col>
  <van-col span="10" offset="4" custom-class="light">offset: 4, span: 10</van-col>
</van-row>

<van-row>
  <van-col offset="12" span="12" custom-class="dark">offset: 12, span: 12</van-col>
</van-row>
```

### 设置列元素间距

通过`gutter`属性可以设置列元素之间的间距，默认间距为 0

```html
<van-row gutter="20">
  <van-col span="8" custom-class="dark" gutter="20">span: 8</van-col>
  <van-col span="8" custom-class="light" gutter="20">span: 8</van-col>
  <van-col span="8" custom-class="dark" gutter="20">span: 8</van-col>
</van-row>
```

## API

### Row API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| gutter | 列元素之间的间距（单位为px） | *string \| number* | `0` | - |

### Col API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| span | 列元素宽度 | *string \| number* | - | - |
| offset | 列元素偏移距离 | *string \| number* | - | - |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
