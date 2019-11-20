---
title: Toast 轻提示
lang: zh
vant: true
---

# Toast 轻提示

### 引入

在script中引入组件

```js
import VanToast from "@/components/vant/toast/index";
```

## 代码演示

### 文字提示

```javascript
import Toast from '@/components/vant/toast/toast'

Toast('提示内容');
```

```html
<van-toast ref="van-toast" />
```

### 加载提示

```javascript
Toast.loading({
  mask: true,
  message: '加载中...'
});
```

### 成功/失败提示

```javascript
Toast.success('成功文案');
Toast.fail('失败文案');
```

### 高级用法

```javascript
const text = second => `倒计时 ${second} 秒`;
const toast = Toast.loading({
  duration: 0,
  forbidClick: true,
  loadingType: 'spinner',
  message: text(3)
});

let second = 3;
const timer = setInterval(() => {
  second--;
  if (second) {
    toast.message = text(second);
  } else {
    clearInterval(timer);
    Toast.clear();
  }
}, 1000);
```

## API

### 方法

| 方法名 | 参数 | 返回值 | 介绍 |
|-----------|-----------|-----------|-------------|
| Toast | `options | message` | toast 实例 | 展示提示 |
| Toast.loading | `options | message` | toast 实例 | 展示加载提示 |
| Toast.success | `options | message` | toast 实例 | 展示成功提示 |
| Toast.fail | `options | message` | toast 实例 | 展示失败提示 |
| Toast.clear | `clearAll` | `void` | 关闭提示 |
| Toast.setDefaultOptions | `options` | `void` | 修改默认配置，对所有 Toast 生效 |
| Toast.resetDefaultOptions | - | `void` | 重置默认配置，对所有 Toast 生效 |

### Options

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| type | 提示类型，可选值为 `loading` `success` `fail` `html` | *string* | `text` | - |
| position | 位置，可选值为 `top` `middle` `bottom` | *string* | `middle` | - |
| message | 内容 | *string* | `''` | - | - |
| mask | 是否显示遮罩层 | *boolean* | `false` | - |
| forbidClick | 是否禁止背景点击 | *boolean* | `false` | - |
| loadingType | 加载图标类型, 可选值为 `spinner` | *string* | `circular` | - |
| zIndex | z-index 层级 | *number* | `1000` | - |
| duration | 展示时长(ms)，值为 0 时，toast 不会消失 | *number* | `3000` | - |
| onClose | 关闭时的回调函数 | *Function* | - | - |

### Slot

| 名称 | 说明 |
|-----------|-----------|
| - | 自定义内容 |
