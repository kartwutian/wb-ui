---
title: Tag 标记
lang: zh
vant: true
---

# Tag 标签

### 引入

```js
import VanTag from "@/components/vant/tag/index.vue"
```

## 代码演示

### 基础用法

通过`type`属性控制标签颜色，默认为灰色

```html
<van-tag>标签</van-tag>
<van-tag class="demo-margin-right" type="primary">标签</van-tag>
<van-tag class="demo-margin-right" type="success">标签</van-tag>
<van-tag class="demo-margin-right" type="danger">标签</van-tag>
<van-tag class="demo-margin-right" type="warning">标签</van-tag>
```

### 空心样式

设置`plain`属性设置为空心样式

```html
<van-tag class="demo-margin-right" plain>标签</van-tag>
<van-tag class="demo-margin-right" plain type="primary">标签</van-tag>
<van-tag class="demo-margin-right" plain type="success">标签</van-tag>
<van-tag class="demo-margin-right" plain type="danger">标签</van-tag>
<van-tag class="demo-margin-right" plain type="warning">标签</van-tag>
```

### 圆角样式

通过`round`设置为圆角样式

```html
<van-tag class="demo-margin-right" round>标签</van-tag>
<van-tag class="demo-margin-right" round type="primary">标签</van-tag>
<van-tag class="demo-margin-right" round type="success">标签</van-tag>
<van-tag class="demo-margin-right" round type="danger">标签</van-tag>
<van-tag class="demo-margin-right" round type="warning">标签</van-tag>
```

### 标记样式

通过`mark`设置为标记样式(半圆角)

```html
<van-tag class="demo-margin-right" mark>标签</van-tag>
<van-tag class="demo-margin-right" mark type="primary">标签</van-tag>
<van-tag class="demo-margin-right" mark type="success">标签</van-tag>
<van-tag class="demo-margin-right" mark type="danger">标签</van-tag>
<van-tag class="demo-margin-right" mark type="warning">标签</van-tag>
```

### 自定义颜色

```html
<van-tag class="demo-margin-right" color="#f2826a">标签</van-tag>
<van-tag class="demo-margin-right" color="#f2826a" plain>标签</van-tag>
<van-tag class="demo-margin-right" color="#7232dd">标签</van-tag>
<van-tag class="demo-margin-right" color="#7232dd" plain>标签</van-tag>
<van-tag class="demo-margin-right" color="#ffe1e1" text-color="#ad0000">标签</van-tag>
```

### 标签大小

```html
<van-tag class="demo-margin-right" type="danger">标签</van-tag>
<van-tag class="demo-margin-right" type="danger" size="medium">标签</van-tag>
<van-tag class="demo-margin-right" type="danger" size="large">标签</van-tag>
```

### 可关闭标签

```html
<van-tag
  v-if="show.primary"
  class="demo-margin-right"
  type="primary"
  size="medium"
  closeable
  id="primary"
  @close="onClose('primary')"
>标签</van-tag>
<van-tag
  v-if="show.success"
  class="demo-margin-right"
  type="success"
  size="medium"
  closeable
  id="success"
  @close="onClose('success')"
>标签</van-tag>
```

```js
export default {
  data() {
    return {
      show: {
        success: true,
        primary: true
      }
    };
  }，
  methods: {
    onClose (type) {
      this.show[type] = false
    }
  }
};
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| type | 类型，可选值为`primary` `success` `danger` `warning` | *string* | `default` | - |
| size | 大小, 可选值为`large` `medium` | *string* | - | - |
| color | 标签颜色 | *string* | - | - |
| plain | 是否为空心样式 | *boolean* | `false` | - |
| round | 是否为圆角样式 | *boolean* | `false` | - |
| mark | 是否为标记样式 | *boolean* | `false` | - |
| closeable | 是否为可关闭标签 | *boolean* | `false` | - |
| text-color | 文本颜色，优先级高于`color`属性 | *string* | `white` | - |

### Slot

| 名称 | 说明 |
|-----------|-----------|
| - | 自定义 Tag 显示内容 |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
