---
title: Radio 单选框
lang: zh
vant: true
---

# Radio 单选框

### 引入

```js
import VanRadioGroup from "@/components/vant/radio-group/index";
import VanRadio from "@/components/vant/radio/index";
```
### 基础用法

通过`v-model`绑定值当前选中项的 `name`

```html
<van-radio-group v-model="radio1" >
  <van-radio name="1" custom-class="demo-radio">单选框 1</van-radio>
  <van-radio name="2">单选框 2</van-radio>
</van-radio-group>
```

```js
export default {
  data(){
    return {
      radio1: '1',
    }
  }
}
```

### 禁用状态

通过`disabled`属性禁止选项切换，在`van-radio`上设置`diabled`可以禁用单个选项

```html
<van-radio-group v-model="radio2" disabled>
  <van-radio name="1" custom-class="demo-radio">单选框 1</van-radio>
  <van-radio name="2">单选框 2</van-radio>
</van-radio-group>
```

```js
export default {
  data(){
    return {
      radio2: '2',
    }
  }
}
```

### 自定义颜色

 ```html
<van-radio name="1" custom-class="demo-radio" checked-color="#07c160">单选框</van-radio>
<van-radio name="2" checked-color="#07c160">单选框</van-radio>
```

### 自定义图标

通过 icon 插槽自定义图标

```html
<van-radio use-icon-slot name="1">
  自定义图标
  <image
    slot="icon"
    :src="radio4 === '1' ? icon.active : icon.normal"
    class="icon"
    mode="widthFix"
  />
</van-radio>
<van-radio use-icon-slot name="2">
  自定义图标
  <image
      slot="icon"
      :src="radio4 === '2' ? icon.active : icon.normal"
      class="icon"
      mode="widthFix"
  />
</van-radio>
```

```js
export default {
  data(){
    return {
      radio4: '1',
      icon: {
        normal:
          'https://img.yzcdn.cn/public_files/2017/10/13/c547715be149dd3faa817e4a948b40c4.png',
        active:
          'https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png'
      }
    }
  }
}
```

### 与 Cell 组件一起使用

此时你需要再引入`Cell`和`CellGroup`组件。

```html
<van-radio-group v-model="radio5">
    <van-cell-group>
      <van-cell
        title="单选框 1"
        clickable
        @tap="toggle('radio-1')"
      >
        <van-radio
          slot="right-icon"
          name="1"
          ref="radio-1"
        />
      </van-cell>
      <van-cell
        title="单选框 2"
        clickable
        @tap="toggle('radio-2')"
      >
        <van-radio
          slot="right-icon"
          name="2"
          ref="radio-2"
        />
      </van-cell>
    </van-cell-group>
</van-radio-group>
```

```js
export default {
  data(){
    return {
      radio5: '1'
    }
  },
  methods: {
    toggle (refName) {
      this.$refs[refName].onChange();
    }
  }
}
```

## API

### Radio API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| name | 标识 Radio 名称 | *string* | - | - |
| value | 当前选中项的 name | *any* | - | - |
| shape | 形状，可选值为 `round` `square` | *string* | `round` | - |
| disabled | 是否为禁用状态 | *boolean* | `false` | - |
| icon-size | 图标大小，默认单位为`px` | *string \| number* | `40rpx` | - |
| label-disabled | 是否禁用文本内容点击 | *boolean* | `false` | - |
| label-position | 文本位置，可选值为 `left` | *string* | `right` | - |
| use-icon-slot | 是否使用 icon slot | *boolean* | `false` | - |
| checked-color | 选中状态颜色 | *string* | `#1989fa` | - |

### Radio Event

| 事件名 | 说明 | 回调参数 |
|-----------|-----------|-----------|
| @change | 当绑定值变化时触发的事件 | 当前选中项的 name |

### Radio 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| icon-class | 图标样式类 |
| label-class | 描述信息样式类 |

### RadioGroup API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| name | 在表单内提交时的标识符 | *string* | - | - |
| value | 当前选中项的 name | *any* | - | - |
| disabled | 是否禁用所有单选框 | *boolean* | `false` | - |

### RadioGroup Event

| 事件名 | 说明 | 回调参数 |
|-----------|-----------|-----------|
| @change | 当绑定值变化时触发的事件 | 当前选中项的 name |
