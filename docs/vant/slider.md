---
title: Slider 滑块
lang: zh
vant: true
---


# Slider 滑块

## 请优先使用uni-app自带的slider

### 引入

在script中引入组件

```js

import VanSlider from "@/components/vant/slider/index.vue"

export default {
  components: {VanSlider},
  data () {
    return {
      currentValue: 50
    }
  }
```

### 基本用法

```html
<van-slider
  :value="currentValue"
  custom-class="slider"
  @change="onChange"
  @drag-start="dragStart"
  @drag-end="dragEnd"
/>
```

```js
export default {
  methods: {
    onChange (event) {
      uni.showToast({
        title: `当前值：${event}`,
        icon: "none"
      });
    },
    dragStart () {
      uni.showToast({
        title: "开始滑动",
        icon: "none"
      });
    },
    dragEnd () {
      setTimeout(() => {
        uni.showToast({
          title: "结束滑动",
          icon: "none"
        });
      }, 1000);
    }
  }
}
```

### 指定选择范围

```html
<van-slider
  custom-class="slider"
  :min="-50"
  :max="50"
/>
```

### 禁用

```html
<van-slider
  custom-class="slider"
  v-model="currentValue"
  disabled
/>
```

### 指定步长

```html
<van-slider
  custom-class="slider"
  v-model="currentValue"
  :step="10"
/>
```

### 自定义样式

```html
<van-slider
  v-model="currentValue"
  custom-class="slider"
  bar-height="8rpx"
  active-color="#ee0a24"
/>
```

### 自定义按钮

```html
<van-slider
  v-model="currentValue"
  custom-class="slider"
  use-button-slot
  active-color="#ee0a24"
  @drag="onDrag"
>
  <view
    class="custom-button"
    slot="button"
  >
    {{ currentValue }}
  </view>
</van-slider>
```

```js
export default {
  methods: {
    onDrag (event) {
      this.currentValue = event
      uni.showToast({
        title: `当前值：${event}`,
        icon: "none"
      });
    }
  }
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| value | 当前进度百分比，取值范围为 0-100 | *number* | `0` | - |
| disabled | 是否禁用滑块 | *boolean* | `false` | - |
| max | 最大值 | *number* | `100` | - |
| min | 最小值 | *number* | `0` | - |
| step | 步长 | *number* | `1` | - |
| bar-height | 进度条高度，默认单位为 `px` | *string \| number* | `4rpx` | - |
| active-color | 进度条激活态颜色 | *string* | `#1989fa` | - |
| inactive-color | 进度条默认颜色 | *string* | `#e5e5e5` | - |
| use-button-slot | 是否开启按钮槽 | *boolean* | `false` | - |

### Events

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| @drag | 拖动进度条时触发 | event.detail.value: 当前进度 |
| @change | 进度值改变后触发 | event.detail: 当前进度 |
| @drag-start | 开始拖动时触发 | - |
| @drag-end | 结束拖动时触发 | - |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
