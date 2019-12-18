---
title: DropdownMenu 下拉菜单
lang: zh
vant: true
---

# DropdownMenu 下拉菜单

### 介绍

下拉菜单

### 引入

在script中引入组件

```js
import VanDropdownItem from "@/components/vant/dropdown-item/index.vue"
import VanDropdownMenu from "@/components/vant/dropdown-menu/index.vue"
```

## 代码演示

### 基础用法

```html
<van-dropdown-menu>
  <van-dropdown-item :value="value1" :options="option1" @change="onChange1"/>
  <van-dropdown-item :value="value2" :options="option2" @change="onChange2"/>
</van-dropdown-menu>
```

```js
export default {
  data(){
    return {
      option1: [
        {text: '全部商品', value: 0},
        {text: '新款商品', value: 1},
        {text: '活动商品', value: 2}
      ],
      option2: [
        {text: '默认排序', value: 'a'},
        {text: '好评排序', value: 'b'},
        {text: '销量排序', value: 'c'}
      ],
      value1: 0,
      value2: 'a'
    }
  },
  methods:{
    onChange1(val) {
      this.value1 = val;
    },
    onChange2(val) {
      this.value2 = val;
    },
  }
}
```

### 自定义菜单内容

```html
<van-dropdown-menu ref="custom-drop-down">
  <van-dropdown-item
      :value="value1"
      :options="option1"
  />
  <van-dropdown-item
      :title="itemTitle"
  >
    <van-cell :title="switchTitle1">
      <van-switch
          slot="right-icon"
          size="48rpx"
          style="height: 52rpx"
          :checked="switch1"
          @change="onSwitch1Change"
      />
    </van-cell>
    <van-cell :title="switchTitle2">
      <van-switch
          slot="right-icon"
          size="48rpx"
          style="height: 52rpx"
          :checked="switch2"
          @change="onSwitch2Change"
      />
    </van-cell>
    <van-button
        type="info"
        block
        @click="onConfirm"
    >
      确定
    </van-button>
  </van-dropdown-item>
</van-dropdown-menu>
```

```js
export default {
  data(){
    return {
      switchTitle1: '包邮',
      switchTitle2: '团购',
      itemTitle: '筛选',
      option1: [
        {text: '全部商品', value: 0},
        {text: '新款商品', value: 1},
        {text: '活动商品', value: 2}
      ],
      option2: [
        {text: '默认排序', value: 'a'},
        {text: '好评排序', value: 'b'},
        {text: '销量排序', value: 'c'}
      ],
      switch1: true,
      switch2: false,
      value1: 0,
      value2: 'a'
    }
  },
  methods:{
    onConfirm() {
      console.log(this.$refs['custom-drop-down'])
      this.$refs['custom-drop-down'].itemListData[1].showPopup = false;
      this.$refs['custom-drop-down'].close();
    },

    onSwitch1Change(val) {
      this.switch1 = val;
    },

    onSwitch2Change(val) {
      this.switch2 = val;
    }
  }
}
```

### 自定义选中状态颜色

```html
<van-dropdown-menu active-color="#ee0a24">
  <van-dropdown-item :value="value1" :options="option1" @change="onChange1"/>
  <van-dropdown-item :value="value2" :options="option2" @change="onChange2"/>
</van-dropdown-menu>
```

### 向上展开

```html
<van-dropdown-menu direction="up">
  <van-dropdown-item :value="value1" :options="option1" @change="onChange1"/>
  <van-dropdown-item :value="value2" :options="option2" @change="onChange2"/>
</van-dropdown-menu>
```

### 禁用菜单

```html
<van-dropdown-menu>
  <van-dropdown-item :value="value1" disabled :options="option1"/>
  <van-dropdown-item :value="value2" disabled :options="option2"/>
</van-dropdown-menu>
```

## API

### DropdownMenu Props

| Attribute              | Description                    | Type      | Default   | Version |
| ---------------------- | ------------------------------ | --------- | --------- | ------- |
| active-color           | 菜单标题和选项的选中态颜色     | *string*  | `#1989fa` | -       |
| z-index                | 菜单栏 z-index 层级            | *number*  | `10`      | -       |
| duration               | 动画时长，单位毫秒             | *number*  | `200`     | -       |
| direction              | 菜单展开方向，可选值为up       | *string*  | `down`    | -       |
| overlay                | 是否显示遮罩层                 | *boolean* | `true`    | -       |
| close-on-click-overlay | 是否在点击遮罩层后关闭菜单     | *boolean* | `true`    | -       |
| close-on-click-outside | 是否在点击外部 menu 后关闭菜单 | *boolean* | `true`    | -       |

### DropdownItem Props

| Attribute   | Description            | Type               | Default                 | Version |
| ----------- | ---------------------- | ------------------ | ----------------------- | ------- |
| value       | 当前选中项对应的 value | *string \| number* | -                       | -       |
| title       | 菜单项标题             | *string*           | Text of selected option | -       |
| options     | 选项数组               | *Option[]*         | `[]`                    | -       |
| disabled    | 是否禁用菜单           | *boolean*          | `false`                 | -       |
| title-class | 标题额外类名           | *string*           | -                       | -       |

### DropdownItem Events

| Event  | Description                   | Arguments |
| ------ | ----------------------------- | --------- |
| @change | 点击选项导致 value 变化时触发 | value     |
| @close  | 关闭菜单栏时触发              | -         |

### DropdownItem Methods

通过 selectComponent(id) 可访问

| Name   | Attribute     | Return value | Description      |
| ------ | ------------- | ------------ | ---------------- |
| toggle | show: boolean | -            | 切换菜单是否展示 |

### Data Structure of Option

| Key   | Description                                | Type               |
| ----- | ------------------------------------------ | ------------------ |
| text  | 文字                                       | *string*           |
| value | 标识符                                     | *string \| number* |
| icon  | 左侧图标名称或图片链接，可选值见 Icon 组件 | *string*           |