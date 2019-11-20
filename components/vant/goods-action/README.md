---
title: GoodsAction 商品导航
lang: zh
vant: true
---

# GoodsAction 商品导航

### 引入

在script中引入组件

```js
import VanGoodsAction from "@/components/vant/goods-action/index"
import VanGoodsActionButton from "@/components/vant/goods-action-button/index"
import VanGoodsActionIcon from "@/components/vant/goods-action-icon/index"
```

## 代码演示

### 基础用法

```html
<van-goods-action
  custom-class="goods-action"
  :safe-area-inset-bottom="false"
>
  <van-goods-action-icon
    icon="chat-o"
    text="客服"
    open-type="contact"
    @click="onClickIcon"
  />
  <van-goods-action-icon
    icon="cart-o"
    text="购物车"
    @click="onClickIcon"
  />
  <van-goods-action-button
    text="加入购物车"
    type="warning"
    @click="onClickButton"
  />
  <van-goods-action-button
    text="立即购买"
    @click="onClickButton"
  />
</van-goods-action>
```

```javascript
export default {
  methods:{
    onClickIcon () {
      uni.showToast({
        title: '点击图标',
        icon: 'none'
      });
    },

    onClickButton () {
      uni.showToast({
        title: '点击按钮',
        icon: 'none'
      });
    }
  }
}
```

### 提示信息

设置`dot`属性后，会在图标右上角展示一个小红点。设置`info`属性后，会在图标右上角展示相应的徽标

```html
<van-goods-action custom-class="goods-action" :safe-area-inset-bottom="false">
  <van-goods-action-icon icon="chat-o" text="客服" dot />
  <van-goods-action-icon icon="cart-o" text="购物车" info="10" />
  <van-goods-action-icon icon="shop-o" text="店铺" info="11" />
  <van-goods-action-button text="加入购物车" type="warning" />
  <van-goods-action-button text="立即购买" />
</van-goods-action>
```

### 自定义按钮颜色

通过`color`属性可以自定义按钮的颜色，支持传入`linear-gradient`渐变色

```html
<van-goods-action custom-class="goods-action" :safe-area-inset-bottom="false">
  <van-goods-action-icon icon="chat-o" text="客服" />
  <van-goods-action-icon icon="cart-o" text="购物车" />
  <van-goods-action-icon icon="shop-o" text="店铺" />
  <van-goods-action-button text="加入购物车" type="warning" color="#be99ff" />
  <van-goods-action-button text="立即购买" color="#7232dd" type="danger"/>
</van-goods-action>
```

## API

### GoodsAction API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| safe-area-inset-bottom | 是否为 iPhoneX 留出底部安全距离 | *boolean* | `true` | - |

### GoodsActionIcon API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| text | 按钮文字 | *string* | - | - |
| icon | 图标类型，可选值见`icon`组件 | *string* | - | - |
| info | 图标右上角提示信息 | *string \| number* | - | - |
| url | 点击后跳转的链接地址 | *string* | - | - |
| disabled | 是否禁用按钮 | *boolean* | `false` | - |
| dot | 是否显示图标右上角小红点 | *boolean* | `false` | - |
| loading | 是否显示为加载状态 | *boolean* | `false` | - |

### GoodsActionButton API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| text | 按钮文字 | *string* | - | - |
| color | 按钮颜色，支持传入 `linear-gradient` 渐变色 | *string* | - | - |
| url | 点击后跳转的链接地址 | *string* | - | - |
| type | 按钮类型，可选值为 `primary` `warning` `danger` | *string* | `danger` | - |
| disabled | 是否禁用按钮 | *boolean* | `false` | - |
| loading | 是否显示为加载状态 | *boolean* | `false` | - |

### Events

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| @click | 按钮点击事件回调 | - |

### GoodsActionIcon Slot

| 名称 | 说明 |
|-----------|-----------|
| icon | 自定义图标 |

### GoodsActionIcon 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| icon-class | 图标样式类 |
| text-class | 文字样式类 |

### GoodsActionButton 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
