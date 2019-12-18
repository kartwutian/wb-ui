---
title: Checkbox 复选框
lang: zh
vant: true
---

# Checkbox 复选框

### 引入

```js
import VanCheckbox from "@/components/vant/checkbox/index";
import VanCellGroup from "@/components/vant/cell-group/index";
```

## 代码演示

### 基础用法

通过`value`绑定复选框的勾选状态

```html
<van-checkbox v-model="checkbox1" custom-class="demo-checkbox">复选框</van-checkbox>
```

```js
export default {
  data(){
    return {
      checkbox1: false,
    }
  }
}
```

### 禁用状态

通过设置`disabled`属性可以禁用复选框

```html
<van-checkbox disabled :value="false" custom-class="demo-checkbox">
  复选框
</van-checkbox>
<van-checkbox disabled :value="true" custom-class="demo-checkbox">
  复选框
</van-checkbox>
```

### 自定义形状

将`shape`属性设置为`square`，复选框的形状会变成方形

 ```html
<van-checkbox v-model="checkboxShape" shape="square" custom-class="demo-checkbox">
  复选框
</van-checkbox>
```

```js
export default {
  data(){
    return {
      checkboxShape: true,
    }
  }
}
```

### 自定义颜色

通过`checked-color`属性可以自定义选中状态下的图标颜色

 ```html
<van-checkbox v-model="checkbox2" checked-color="#07c160" custom-class="demo-checkbox">
  复选框
</van-checkbox>
```

```js
export default {
  data(){
    return {
      checkbox2: true,
    }
  }
}
```

### 自定义图标

通过 icon 插槽自定义图标

```html
<van-checkbox use-icon-slot v-model="checkbox3" custom-class="demo-checkbox">
  自定义图标
  <image slot="icon" class="icon" mode="widthFix" :src="checkbox3 ? activeIcon : inactiveIcon" />
</van-checkbox>
```

```js
export default {
  data(){
    return {
      checkbox3: true,
      activeIcon: 'https://img.yzcdn.cn/vant/user-active.png',
      inactiveIcon: 'https://img.yzcdn.cn/vant/user-inactive.png'
    }
  }
}
```

### 复选框组

需要与`van-checkbox-group`一起使用，选中值是一个数组，通过`value`绑定在`van-checkbox-group`上，数组中的项即为选中的`Checkbox`的`name`属性设置的值

```html
<van-checkbox-group v-model="result">
  <van-checkbox
      v-for="(item, index) in list"
      :key="index"
      :name="item"
      custom-class="demo-checkbox"
  >
    复选框 {{ item }}
  </van-checkbox>
</van-checkbox-group>
```

```js
export default {
  data(){
    return {
      result: ['a', 'b'],
      list: ['a', 'b', 'c'],
    }
  }
}
```

### 设置最大可选数

```html
<van-checkbox-group :max="2" v-model="result2">
  <van-checkbox name="a">复选框 a</van-checkbox>
  <van-checkbox name="b">复选框 b</van-checkbox>
  <van-checkbox name="c">复选框 c</van-checkbox>
</van-checkbox-group>
```

```js
export default {
  data(){
    return {
      result2: [],
    }
  }
}
```

### 搭配单元格组件使用

此时你需要再引入`Cell`和`CellGroup`组件，并通过 checkbox 的 toggle 方法手动触发切换

```html
<van-checkbox-group v-model="result3">
  <van-cell-group >
    <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="'复选框 ' + item"
        value-class="value-class"
        clickable
        @tap="toggle(index)"
    >
      <van-checkbox @tap="noop" :ref="'page-checkbox-'+ index" :name="item" slot="right-icon" />
    </van-cell>
  </van-cell-group>
</van-checkbox-group>
```

```js
export default {
  data(){
    return {
      result3: [],
      list: ['a', 'b', 'c'],
    }
  },
  methods:{
    toggle (index) {
      this.$refs[`page-checkbox-${index}`][0].toggle();
    },
    noop () { }
  }
}
```

## API

### Checkbox API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| name | 标识 Checkbox 名称 | *string* | - | - |
| shape | 形状，可选值为 `round` `square` | *string* | `round` | - |
| value | 是否为选中状态 | *boolean* | `false` | - |
| disabled | 是否禁用单选框 | *boolean* | `false` | - |
| label-disabled | 是否禁用单选框内容点击 | *boolean* | `false` | - |
| label-position | 文本位置，可选值为 `left` | *string* | `right` | - |
| use-icon-slot | 是否使用 icon slot | *boolean* | `false` | - |
| checked-color | 选中状态颜色 | *string* | `#1989fa` | - |
| icon-size | icon 大小 | *string \| number* | `40rpx` |

### CheckboxGroup API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| name | 在表单内提交时的标识符 | *string* | - | - |
| value | 所有选中项的 name | *Array* | - | - |
| disabled | 是否禁用所有单选框 | *boolean* | `false` | - |
| max | 设置最大可选数 | *number* | `0`（无限制） | - |

### Checkbox Event

| 事件名 | 说明 | 回调参数 |
|-----------|-----------|-----------|
| @change | 当绑定值变化时触发的事件 | 当前组件的值 |

### Checkbox 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| icon-class | 图标样式类 |
| label-class | 描述信息样式类 |

### CheckboxGroup Event

| 事件名 | 说明 | 回调参数 |
|-----------|-----------|-----------|
| @change | 当绑定值变化时触发的事件 | 当前组件的值 |

### Checkbox Slot

| 名称 | 说明 |
|-----------|-----------|
| - | 自定义文本 |
| icon | 自定义图标 |

### Checkbox 方法

通过 selectComponent 可以获取到 checkbox 实例并调用实例方法

| 方法名 | 参数 | 返回值 | 介绍 |
|-----------|-----------|-----------|-------------|
| toggle | - | - | 切换选中状态 |
