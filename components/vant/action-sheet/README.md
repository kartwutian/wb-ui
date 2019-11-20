---
title: ActionSheet 上拉菜单
lang: zh
vant: true
---

# ActionSheet 上拉菜单

### 引入

在script中引入组件

```js

import VanActionSheet from "@/components/vant/action-sheet/index.vue"

export default {
  components: {VanActionSheet},
  methods: {
    toggle (type) {
      this[`${type}`] = !this[`${type}`]
    },

    toggleActionSheet1 () {
      this.toggle('show1');
    },

    toggleActionSheet2 () {
      this.toggle('show2');
    },

    toggleActionSheet3 () {
      this.toggle('show3');
    },

    toggleActionSheet4 () {
      this.toggle('show4');
    },

    toggleActionSheet5 () {
      this.toggle('show5');
    }
  }
}
  
```


## 代码演示

### 基础用法

需要传入一个`actions`的数组，数组的每一项是一个对象，对象属性见文档下方表格。

```html
<van-action-sheet
  :show="show1"
  :actions="action1"
  @click-overlay="toggleActionSheet1"
  @select="toggleActionSheet1"
/>
```

```js
export default {
  data(){
    return {
      show1: false,
      action1: [
        { name: '选项' },
        { name: '选项' },
        { name: '选项', subname: '副文本' }
      ],
    }
  }
}
```

### 选项状态

选项可以设置为加载状态或禁用状态。

```html
<van-action-sheet
  :show="show2"
  :actions="action2"
  @close="toggleActionSheet2"
/>
```

```js
export default {
  data(){
    return {
      show2: false,
      action2: [
        { name: '选项', color: '#07c160' },
        { loading: true },
        { name: '禁用选项', disabled: true }
      ]
    }
  }
}
```

### 展示取消按钮

设置`cancel-text`属`性后，会在底部展示取消按钮，点击后关闭当前菜单

```html
<van-action-sheet
  :show="show3"
  :actions="action1"
  cancel-text="取消"
  @close="toggleActionSheet3"
  @cancel="toggleActionSheet3"
>
```

```js
export default {
  data(){
    return {
      show3: false,
      action1: [
        { name: '选项' },
        { name: '选项' },
        { name: '选项', subname: '副文本' }
      ],
    }
  }
}
```

### 展示描述信息

设置`description`属性后，会在选项上方显示描述信息

```html
<van-action-sheet
  :show="show4"
  :actions="action1"
  description="这是一段描述信息"
  @close="toggleActionSheet4"
>
```

```js
export default {
  data(){
    return {
      show4: false,
      action1: [
        { name: '选项' },
        { name: '选项' },
        { name: '选项', subname: '副文本' }
      ],
    }
  }
}
```

### 展示标题栏

通过设置`title`属性展示标题栏，同时可以使用插槽自定义菜单内容

```html
<van-action-sheet
  :show="show5"
  title="标题"
  @close="toggleActionSheet5"
>
```

```js
export default {
  data(){
    return {
      show5: false
    }
  }
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| show | 是否展示遮罩层 | *boolean* | - | - |
| description | 选项上方的描述信息 | *string* | - | 1.0.0 |
| actions | 菜单选项 | *Array* | `[]` | - |
| title | 标题 | *string* | - | - |
| description | 选项上方的描述信息 | *string* | - | 1.0.0 |
| z-index | z-index 层级 | *number* | `100` | - |
| cancel-text | 取消按钮文字 | *string* | - | - |
| overlay | 是否显示遮罩层 | *boolean* | - | - |
| round | 是否显示圆角 | *boolean* | `true` | 1.0.0 |
| close-on-click-action | 是否在点击选项后关闭 | *boolean* | `true` | - |
| close-on-click-overlay | 点击遮罩是否关闭菜单 | *boolean* | - | - |
| safe-area-inset-bottom | 是否为 iPhoneX 留出底部安全距离 | *boolean* | `true` | - |

### Events

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| @select | 选中选项时触发，禁用或加载状态下不会触发 | event.detail: 选项对应的对象 |
| @close | 关闭时触发 | - |
| @cancel | 取消按钮点击时触发 | - |
| @click-overlay | 点击遮罩层时触发 | - |

### actions

`API`中的`actions`为一个对象数组，数组中的每一个对象配置每一列，每一列有以下`key`：

| 键名 | 说明 | 类型 |
|-----------|-----------|-----------|
| name | 标题 | *string* |
| subname | 二级标题 | *string* |
| color | 选项文字颜色 | *string* |
| loading | 是否为加载状态 | *boolean* |
| disabled | 是否为禁用状态 | *boolean* |
| className | 为对应列添加额外的 class 类名 | *string* |
| openType | 微信开放能力，具体支持可参考 [微信官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/component/button.html) | *string* |
