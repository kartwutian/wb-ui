---
title: Switch 开关
lang: zh
vant: true
---

# Switch 开关

### 引入

在script中引入组件

```js
import VanSwitch from "@/components/vant/switch/index.vue"  
```

## 代码演示

### 基础用法

```html
<van-switch :checked="checked"  @change="onChange" />
```

```js
export default {
  data(){
    return {
      checked: true,
    }
  },
  methods:{
    onChange (detail) {
      this.checked = detail
    }
  }
}
```

### 禁用状态

```html
<van-switch :checked="checked"  @change="onChange" disabled/>
```

```js
export default {
  data(){
    return {
      checked: true,
    }
  },
  methods:{
    onChange (detail) {
      this.checked = detail
    }
  }
}
```

### 加载状态

```html
<van-switch :checked="true" loading />
```

### 自定义大小

```html
<van-switch :checked="true" size="48rpx" />
```

### 自定义颜色

```html
<van-switch
  :checked="true"
  active-color="#07c160"
  inactive-color="#ee0a24"
/>
```

### 异步控制

```html
<van-switch
  :checked="checked2"
  @change="onChange2"
/>
```

```js
export default {
  data(){
    return {
      checked2: true,
    }
  },
  methods:{
    onChange2 (detail) {
      uni.showModal({
        title: '提醒',
        content: '是否切换开关？',
        success: (res) => {
          if (res.confirm) {
            this.checked2 = detail
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    }
  }
}
```


## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| checked | 开关选中状态 | *any* | `false` | - |
| loading | 是否为加载状态 | *boolean* | `false` | - |
| disabled | 是否为禁用状态 | *boolean* | `false` | - |
| size | 开关尺寸 | *string* | `60rpx` | - |
| active-color | 打开时的背景色 | *string* | `#1989fa` | - |
| inactive-color | 关闭时的背景色 | *string* | `#fff` | - |
| active-value | 打开时的值 | *any* | `true` | - |
| inactive-value | 关闭时的值 | *any* | `false` | - |

### Events

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| @change | 开关状态切换回调 | event.detail: 是否选中开关 |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| node-class | 圆点样式类 |
