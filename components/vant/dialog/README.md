---
title: Dialog 弹出框
lang: zh
vant: false
---

# Dialog 弹出框

### 介绍

弹出模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作

弹出框组件支持函数调用和组件调用两种方式

### 引入

在script中引入组件

```js

import VanDialog from "@/components/vant/dialog/index.vue"

export default {
  components: {VanDialog},
  data () {
    return {
      show: false
    }
  }
}
  
```

## 代码演示

### 消息提示

用于提示一些消息，只包含一个确认按钮

```html
<van-dialog ref="van-dialog"/>
```

```javascript
import Dialog from "@/components/vant/dialog/dialog"

Dialog.alert({
  title: '标题',
  message: '代码是写出来给人看的，附带能在机器上运行'
}).then(() => {
  // on close
});

Dialog.alert({
  message: '代码是写出来给人看的，附带能在机器上运行'
}).then(() => {
  // on close
});
```

### 消息确认

用于确认消息，包含取消和确认按钮

```javascript
Dialog.confirm({
  title: '标题',
  message: '代码是写出来给人看的，附带能在机器上运行'
}).then(() => {
  // on confirm
}).catch(() => {
  // on cancel
});
```

### 异步关闭

设置`asyncClose`属性开启异步关闭，开启后可以手动调用`Dialog.close`方法关闭弹窗

```javascript
Dialog.confirm({
  title: '标题',
  message: '代码是写出来给人看的，附带能在机器上运行'
  asyncClose: true
})
 .then((dialog) => {
    dialog.loading.confirm = true;
    setTimeout(() => {
      Dialog.close();
      dialog.loading.confirm = false;
    }, 1000);
  })
  .catch(() => {
    Dialog.close();
  });
```

## API

### 方法

| 方法名 | 参数 | 返回值 | 介绍 |
|-----------|-----------|-----------|-------------|
| Dialog | `options` | `Promise` | 展示弹窗 |
| Dialog.alert | `options` | `Promise` | 展示消息提示弹窗 |
| Dialog.confirm | `options` | `Promise` | 展示消息确认弹窗 |
| Dialog.setDefaultOptions | `options` | `void` | 修改默认配置，对所有 Dialog 生效 |
| Dialog.resetDefaultOptions | - | `void` | 重置默认配置，对所有 Dialog 生效 |
| Dialog.close | - | `void` | 关闭弹窗 |
| Dialog.stopLoading | - | `void` | 停止按钮的加载状态 |

### Options

通过函数调用 Dialog 时，支持传入以下选项：

| 参数 | 说明 | 类型 | 默认值 | 版本 | 
|-----------|-----------|-----------|-------------|-------------|
| show | 是否展示遮罩层 | *boolean* | `false` | - |
| title | 标题 | *string* | - | - |
| width | 弹窗宽度，默认单位为`px` | *string \| number* | `640rpx` | 1.0.0 |
| message | 文本内容，支持通过`\n`换行 | *string* | - | 1.0.0 |
| messageAlign | 内容对齐方式，可选值为`left` `right` | *string* | `center` | - |
| use-slot | 是否使用插槽 | *boolean* | `false` | - |
| use-title-slot | 是否使用标题插槽 | *boolean* | `false` | - |
| zIndex | z-index 层级 | *number* | `2000` | - |
| className | 自定义类名，dialog在自定义组件内时无效 | *string* | '' | - |
| customStyle | 自定义样式 | *string* | '' | - |
| showConfirmButton | 是否展示确认按钮 | *boolean* | `true` | - |
| showCancelButton | 是否展示取消按钮 | *boolean* | `false` | - |
| confirmButtonText | 确认按钮的文案 | *string* | `确认` | - |
| cancelButtonText | 取消按钮的文案 | *string* | `取消` | - |
| confirmButtonColor | 确认按钮颜色 | *string* | `BLUE` | - |
| cancelButtonColor | 取消按钮颜色 | *string* | `GRAY` | - |
| overlay | 是否展示遮罩层 | *boolean* | `true` | - |
| overlayStyle | 自定义遮罩层样式 | *object* | - | 1.0.0 |
| closeOnClickOverlay | 点击遮罩层时是否关闭弹窗 | *boolean* | `false` | - |
| asyncClose | 是否异步关闭弹窗，开启后需要手动控制弹窗的关闭 | *boolean* | `false` | - |
| transition | 动画名称，可选值为`fade` `none` | *string* | `scale` | - |
| confirmButtonOpenType | 确认按钮的微信开放能力，具体支持可参考 [微信官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/component/button.html) | *string* | - | - |

### OpenType Options

使用`confirmButtonOpenType`后，支持以下选项：

| 参数 | 说明 | 类型 | 默认值 | open-type |
|-----------|-----------|-----------|-------------|-------------|
| appParameter | 打开 APP 时，向 APP 传递的参数 | *string* | - | `launchApp` |
| lang | 指定返回用户信息的语言，zh_CN 简体中文，<br>zh_TW 繁体中文，en 英文 | *string* | `en` | `getUserInfo` |
| sessionFrom | 会话来源 | *string* | - | `contact` |
| businessId | 客服消息子商户 id | *number* | - | `contact` |
| sendMessageTitle | 会话内消息卡片标题 | *string* | 当前标题 | `contact` |
| sendMessagePath | 会话内消息卡片点击跳转小程序路径 | *string* | 当前分享路径 | `contact` |
| sendMessageImg | sendMessageImg | *string* | 截图 | `contact` |
| showMessageCard | 显示会话内消息卡片 | *string* | `false` | `contact` |

### Props

通过组件调用 Dialog 时，支持以下 API：

| 参数 | 说明 | 类型 | 默认值 |
|-----------|-----------|-----------|-------------|
| show | 是否显示弹窗 | *boolean* | - |
| title | 标题 | *string* | - |
| width | 弹窗宽度，默认单位为`px` | *string \| number* | `640rpx` | 1.0.0 |
| message | 文本内容，支持通过`\n`换行 | *string* | - |
| message-align | 内容对齐方式，可选值为`left` `right` | *string* | `center` |
| z-index | z-index 层级 | *number* | `100` |
| class-name | 自定义类名，dialog在自定义组件内时无效 | *string* | '' |
| custom-style | 自定义样式 | *string* | '' |
| show-confirm-button | 是否展示确认按钮 | *boolean* |  `true` |
| show-cancel-button | 是否展示取消按钮 | *boolean* |  `false` |
| confirm-button-text | 确认按钮的文案 | *string* |  `确认` |
| cancel-button-text | 取消按钮的文案 | *string* | `取消` |
| confirm-button-color | 确认按钮的字体颜色 | *string* |  `#1989fa` |
| cancel-button-color | 取消按钮的字体颜色 | *string* | `#333` |
| overlay | 是否展示遮罩层 | *boolean* | `true` |
| overlay-style | 自定义遮罩层样式 | *object* | - | 1.0.0 |
| close-on-click-overlay | 点击遮罩层时是否关闭弹窗 | *boolean* | `false` |
| use-slot | 是否使用自定义内容的插槽 | *boolean* | `false` |
| use-title-slot | 是否使用自定义标题的插槽 | *boolean* | `false` |
| async-close | 是否异步关闭弹窗，开启后需要手动控制弹窗的关闭 | *boolean* | `false` |
| transition | 动画名称，可选值为`fade` | *string* | `scale` |
| confirm-button-open-type | 确认按钮的微信开放能力，具体支持可参考 [微信官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/component/button.html) | *string* | - |

### OpenType Props

使用`confirm-button-open-type`后，支持以下 API：

| 参数 | 说明 | 类型 | 默认值 | open-type |
|-----------|-----------|-----------|-------------|-------------|
| app-parameter | 打开 APP 时，向 APP 传递的参数 | *string* | - | `launchApp` |
| lang | 指定返回用户信息的语言，zh_CN 简体中文，<br>zh_TW 繁体中文，en 英文 | *string* | `en` | `getUserInfo` |
| session-from | 会话来源 | *string* | - | `contact` |
| business-id | 客服消息子商户 id | *number* | - | `contact` |
| send-message-title | 会话内消息卡片标题 | *string* | 当前标题 | `contact` |
| send-message-path | 会话内消息卡片点击跳转小程序路径 | *string* | 当前分享路径 | `contact` |
| send-message-img | sendMessageImg | *string* | 截图 | `contact` |
| show-message-card | 显示会话内消息卡片 | *string* | `false` | `contact` |

### Events

| 事件 | 说明 | 回调参数 |
|-----------|-----------|-----------|
| @close | 弹窗关闭时触发 | event.detail: 触发关闭事件的来源，<br>枚举为`confirm`,`cancel`,`overlay` |
| @confirm | 点击确认按钮时触发 | - |
| @cancel | 点击取消按钮时触发 | - |
| @getuserinfo | 点击确认按钮时，会返回获取到的用户信息，<br>从返回参数的 detail 中获取到的值同 wx.getUserInfo | - |
| @contact | 客服消息回调 | - |
| @getphonenumber | 获取用户手机号回调 | - |
| @error | 当使用开放能力时，发生错误的回调 | - |
| @opensetting | 在打开授权设置页后回调 | - |

### Slot

| 名称 | 说明 |
|-----------|-----------|
| title | 自定义`title`显示内容，如果设置了`title`属性则不生效 |