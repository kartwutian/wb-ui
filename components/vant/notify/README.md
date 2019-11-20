---
title: Notify 消息提示
lang: zh
vant: true
---

# Notify 消息提示

### 引入

在script中引入组件

```js
import VanNotify from "@/components/vant/notify/index";
```

## 代码演示

### 基础用法

```js
import Notify from "@/components/vant/notify/notify";

Notify('通知内容');
```

```html
<!-- 在页面内添加对应的节点 -->
<van-notify ref="van-notify" safe-area-inset-top />
```

### 通知类型

支持`primary`、`success`、`warning`、`danger`四种通知类型，默认为`danger`

```js
// 主要通知
Notify({ type: 'primary', message: '通知内容' });

// 成功通知
Notify({ type: 'success', message: '通知内容' });

// 危险通知
Notify({ type: 'danger', message: '通知内容' });

// 警告通知
Notify({ type: 'warning', message: '通知内容' });
```

### 自定义通知

自定义消息通知的颜色和展示时长

```js
Notify({
  message: '自定义颜色',
  color: '#ad0000',
  background: '#ffe1e1'
});

Notify({
  message: '自定义时长',
  duration: 1000
});
```

## API

### 方法

| 方法名 | 参数 | 返回值 | 介绍 |
|-----------|-----------|-----------|-------------|
| Notify | `options | message` | `notify 实例` | 展示提示 |
| Notify.clear | - | `void` | 关闭提示 |
| Notify.setDefaultOptions | `options` | `void` | 修改默认配置，对所有 Notify 生效 |
| Notify.resetDefaultOptions | - | `void` | 重置默认配置，对所有 Notify 生效 |

### Options

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| type | 类型，可选值为 `primary` `info` `warning` | *string* | `danger` | 1.0.0 |
| message | 展示文案，支持通过`\n`换行 | *string* | 1.0.0 | - |
| duration | 展示时长(ms)，值为 0 时，notify 不会消失 | *number* | `3000` | - |
| color | 字体颜色 | *string* | `#fff` | - |
| background | 背景颜色 | *string* | - | - |
| safe-area-inset-top | 是否留出顶部安全距离（状态栏高度） | *boolean* | `false` | - |
| onClick | 点击时的回调函数 | *Function* | - | - |
| onOpened | 完全展示后的回调函数 | *Function* | - | - |
| onClose | 关闭时的回调函数 | *Function* | - | - |
