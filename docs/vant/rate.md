---
title: Rate 评分
lang: zh
vant: true
---

# Rate 评分

### 引入

```js
import VanRate from "@/components/vant/rate/index.vue"
```
### 基础用法

 ```html
<van-rate
  :value="value.value1"
  custom-class="van-rate"
/>
```

```js
export default {
  data(){
    return {
      value: {
        value1: 3
      }
    }
  }
}
```

### 自定义图标

 ```html
<van-rate
  :value="value.value2"
  icon="like"
  void-icon="like-o"
  custom-class="van-rate"
/>
```

```js
export default {
  data(){
    return {
      value: {
        value2: 3
      }
    }
  }
}
```

### 自定义样式

```html
<van-rate
  custom-class="van-rate"
  :value="value.value3"
  size="25"
  color="#ee0a24"
  void-color="#eee"
  void-icon="star"
  @change="onChange"
/>
```

```js
export default {
  data(){
    return {
      value: {
        value1: 3
      }
    }
  },
  methods: {
    onChange (event) {
      console.log(event)
    }
  }
}
```

### 半星

```html
<van-rate
  custom-class="van-rate"
  :value="value.value4"
  size="25"
  allow-half
  color="#ee0a24"
  void-color="#eee"
  void-icon="star"
  @change="onChange"
/>
```

```js
export default {
  data(){
    return {
      value: {
        value4: 3.5
      }
    }
  },
  methods: {
    onChange (event) {
      console.log(event)
    }
  }
}
```

### 自定义数量

```html
<van-rate
  custom-class="van-rate"
  :value="value.value5"
  :count="6"
  @change="onChange"
```

```js
export default {
  data(){
    return {
      value: {
        value5: 4
      }
    }
  },
  methods: {
    onChange (event) {
      console.log(event)
    }
  }
}
```

### 禁用状态

```html
<van-rate
  custom-class="van-rate"
  :value="value.value6"
  disabled
/>
```

```js
export default {
  data(){
    return {
      value: {
        value6: 3
      }
    }
  }
}
```

### 只读状态

```html
<van-rate
  custom-class="van-rate"
  :value="value.value6"
  readonly
/>
```

```js
export default {
  data(){
    return {
      value: {
        value6: 3
      }
    }
  }
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| value | 当前分值 | *number* | - | - |
| count | 图标总数 | *number* | `5` | - |
| size | 图标大小，默认单位为 `px` | *string \| number* | `40rpx` | - |
| gutter | 图标间距，默认单位为 `px` | *string \| number* | `8rpx` |
| color | 选中时的颜色 | *string* | `#ffd21e` | - |
| void-color | 未选中时的颜色 | *string* | `#c7c7c7` | - |
| icon | 选中时的图标名称或图片链接，可选值见 [Icon 组件](#/icon) | *string* | `star` | - |
| void-icon | 未选中时的图标名称或图片链接，可选值见 [Icon 组件](#/icon) | *string* | `star-o` | - |
| allow-half | 是否允许半选 | *boolean* | `false` | - |
| readonly | 是否为只读状态 | *boolean* | `false` | - |
| disabled | 是否禁用评分 | *boolean* | `false` | - |
| disabled-color | 禁用时的颜色 | *string* | `#bdbdbd` | - |
| touchable | 是否可以通过滑动手势选择评分 | *boolean* | `true` | - |

### Events

| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| @change | 当前分值变化时触发的事件 | 当前分值 |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| icon-class | 图标样式类 |
