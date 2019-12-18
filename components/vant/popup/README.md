---
title: Popup 弹出层
lang: zh
vant: true
---

# Popup 弹出层

### 介绍

弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示

### 引入

```js

import VanPopup from "@/components/vant/popup/index";

export default {
  components: {VanPopup},
  methods: {
    toggle (type, show) {
      this.show[`${type}`] = show;
    },

    hideBasic () {
      this.toggle('basic', false);
    },

    hideTop () {
      this.toggle('top', false);
    },

    hideRound () {
      this.toggle('round', false);
    },

    hideCloseIcon () {
      this.toggle('closeIcon', false);
    },

    hideCustomCloseIcon () {
      this.toggle('customCloseIcon', false);
    },

    hideCustomIconPosition () {
      this.toggle('customIconPosition', false);
    }
  }
}
  
```

## 代码演示

### 基础用法

通过`show`属性控制弹出层是否展示

```html
<van-cell title="展示弹出层" is-link @click="showBasic" />

<van-popup :show="show.basic" @close="hideBasic" custom-style="padding: 60rpx 100rpx">内容</van-popup>
```

```js
export default {
  data(){
    return {
      show:{
        basic: false,
      }
    }
  }
}
```

### 弹出位置

通过`position`属性设置弹出位置，默认居中弹出，可以设置为`top`、`bottom`、`left`、`right`

```html
<van-popup
  :show="show.top"
  position="top"
  custom-style="height: 20%;"
  @close="hideTop"
/>
```

```js
export default {
  data(){
    return {
      show:{
        top: false,
      }
    }
  }
}
```

### 关闭图标

设置`closeable`属性后，会在弹出层的右上角显示关闭图标，并且可以通过`close-icon`属性自定义图标，使用`close-icon-position`属性可以自定义图标位置

```html
<van-popup
  :show="show.closeIcon"
  closeable
  position="bottom"
  custom-style="height: 20%"
  @close="hideCloseIcon"
/>

<!-- 自定义图标 -->
<van-popup
  :show="show.customCloseIcon"
  closeable
  close-icon="close"
  position="bottom"
  custom-style="height: 20%"
  @close="hideCustomCloseIcon"
/>

<!-- 图标位置 -->
<van-popup
  :show="show.customIconPosition"
  closeable
  close-icon-position="top-left"
  position="bottom"
  custom-style="height: 20%"
  @close="hideCustomIconPosition"
/>
```

```js
export default {
  data(){
    return {
      show:{
        closeIcon: false,
        customCloseIcon: false,
        customIconPosition: false,
      }
    }
  }
}
```

### 圆角弹窗

设置`round`属性后，弹窗会根据弹出位置添加不同的圆角样式

```html
<van-popup
  :show="show.round"
  round
  position="bottom"
  custom-style="height: 20%"
  @close="hideRound"
/>
```

```js
export default {
  data(){
    return {
      show:{
        round: false,
      }
    }
  }
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| show | 是否显示弹出层 | *boolean* | `false` | - |
| z-index | z-index 层级 | *number* | `100` | - |
| overlay | 是否显示遮罩层 | *boolean* | `true` | - |
| position | 弹出位置，可选值为 `top` `bottom` `right` `left` | *string* | `center` | - |
| duration | 动画时长，单位为毫秒 | *number \| object* | `300` | - |
| round | 是否显示圆角 | *boolean* | `false` | - |
| custom-style | 自定义弹出层样式 | *string* | `` | - |
| overlay-style | 自定义遮罩层样式 | *string* | `` | - |
| close-on-click-overlay | 是否在点击遮罩层后关闭 | *boolean* | `true` | - |
| closeable | 是否显示关闭图标 | *boolean* | `false` | - |
| close-icon | 关闭图标名称或图片链接 | *string* | `cross` | - |
| safe-area-inset-bottom | 是否为 iPhoneX 留出底部安全距离 | *boolean* | `true` | - |
| safe-area-inset-top | 是否留出顶部安全距离（状态栏高度） | *boolean* | `false` | - |
| close-icon-position | 关闭图标位置，可选值为top-left bottom-left bottom-right | *string* | `top-right` | - |
| transition | 动画类名，等价于 transtion 的name属性 | *string* | - | - |

### Events

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| @close | 关闭弹出层时触发 | - |
| @click-overlay | 点击遮罩层时触发 | - |
| @before-enter | 进入前触发 | - |
| @enter | 进入中触发 | - |
| @after-enter | 进入后触发 | - |
| @before-leave | 离开前触发 | - |
| @leave | 离开中触发 | - |
| @after-leave | 离开后触发 | - |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| enter-class | 定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。|
| enter-active-class | 定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。 |
| enter-to-class | 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 enter-class 被移除)，在过渡/动画完成之后移除。 |
| leave-class | 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。|
| leave-active-class | 定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。 |
| leave-to-class | 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 leave-class 被删除)，在过渡/动画完成之后移除。 |
