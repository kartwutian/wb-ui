---
title: Collapse 折叠面板
lang: zh
vant: true
---

# Collapse 折叠面板

### 引入

在script中引入组件

```js
import VanCollapse from "@/components/vant/collapse/index";
import VanCollapseItem from "@/components/vant/collapse-item/index";
```

## 代码演示

### 基础用法

通过`v-model`控制展开的面板列表，`activeNames`为数组格式

```html
<van-collapse v-model="active1">
  <van-collapse-item :title="title1">{{ content1 }}</van-collapse-item>
  <van-collapse-item :title="title2">{{ content2 }}</van-collapse-item>
  <van-collapse-item :title="title3" disabled>{{ content3 }}</van-collapse-item>
</van-collapse>
```

```js
export default {
  data() {
    return {
      active1: [0],
      title1: '有赞微商城',
      title2: '有赞零售',
      title3: '有赞美业',
      content1: '提供多样店铺模板，快速搭建网上商城',
      content2: '网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失',
      content3: '线上拓客，随时预约，贴心顺手的开单收银'
    };
  }
};
```

### 手风琴

通过`accordion`可以设置为手风琴模式，最多展开一个面板，此时`activeName`为字符串格式

```html
 <van-collapse v-model="active2" accordion>
  <van-collapse-item :title="title1">{{ content1 }}</van-collapse-item>
  <van-collapse-item :title="title2">{{ content2 }}</van-collapse-item>
  <van-collapse-item :title="title3">{{ content3 }}</van-collapse-item>
</van-collapse>
```

```js
export default {
  data() {
    return {
      active1: 0,
      title1: '有赞微商城',
      title2: '有赞零售',
      title3: '有赞美业',
      content1: '提供多样店铺模板，快速搭建网上商城',
      content2: '网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失',
      content3: '线上拓客，随时预约，贴心顺手的开单收银'
    };
  }
};
```

### 自定义标题内容

```html
<van-collapse v-model="active3">
  <van-collapse-item>
    <view slot="title">
      {{ title1 }}
      <van-icon name="question-o" custom-class="van-icon-question" />
    </view>
    {{ content1 }}
  </van-collapse-item>
  <van-collapse-item
      :title="title2"
      value="内容"
      icon="shop-o"
  >
    {{ content2 }}
  </van-collapse-item>
</van-collapse>
```

```js
export default {
  data() {
    return {
      active3: [],
      title1: '有赞微商城',
      title2: '有赞零售',
      content1: '提供多样店铺模板，快速搭建网上商城',
      content2: '网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失'
    };
  }
};
```

``` css
.van-icon-question {
  margin-left: 10rpx;
  font-size: 30rpx !important;
  color: #1989fa;
  vertical-align: -6rpx;
}
```

## API

### Collapse API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| value | 当前展开面板的 name | 非手风琴模式：*(string \| number)[]*<br>手风琴模式：*string \| number* | - | - |
| accordion | 是否开启手风琴模式 | *boolean* | `false` | - |
| border | 是否显示外边框 | *boolean* | `true` | - |

### Collapse Event

| 事件名 | 说明 | 参数 |
|------|------|------|
| @change | 切换面板时触发 | activeNames: *string \| Array* |

### CollapseItem API

| 参数 | 说明 | 类型 

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |