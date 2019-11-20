---
title: Card 商品卡片
lang: zh
vant: true
---


# Card 商品卡片

### 引入

在script中引入组件

```js
import VanCard from "@/components/vant/card/index"
```

## 代码演示

### 基础用法

```html
<van-card
  num="2"
  price="2.00"
  desc="描述信息"
  title="2018秋冬新款男士休闲时尚军绿飞行夹克秋冬新款男"
  thumb="//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"
/>
```

### 高级用法

可以通过插槽添加定制内容

```html
<van-card
  num="2"
  tag="标签"
  price="2.00"
  origin-price="10.00"
  desc="描述信息"
  title="2018秋冬新款男士休闲时尚军绿飞行夹克秋冬新款男"
  thumb="//img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"
>
  <view slot="tags">
    <van-tag plain type="danger" custom-class="tag" >标签1</van-tag>
    <van-tag plain type="danger" >标签2</van-tag>
  </view>
  <view slot="footer" class="van-card__footer" >
    <van-button size="mini" round custom-class="button" >按钮</van-button>
    <van-button size="mini" round>按钮</van-button>
  </view>
</van-card>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| thumb | 左侧图片 | *string* | - | - |
| thumb-mode | 左侧图片裁剪、缩放的模式，可选值参考小程序 image 组件 mode 属性值 | *string* | `aspectFit` | - |
| title | 标题 | *string* | - | - |
| desc | 描述 | *string* | - | - |
| tag | 标签 | *string* | - | - |
| num | 商品数量 | *string \| number* | - | - |
| price | 商品价格 | *string \| number* | - | - |
| origin-price | 商品划线原价 | *string \| number* | - | - |
| centered | 内容是否垂直居中 | *string* | `false` | - |
| currency | 货币符号 |  *string* | `¥` | - |
| thumb-link | 点击左侧图片后跳转的链接地址 | *string* | - | - |
| lazy-load | 是否开启图片懒加载 | *boolean* | `false` | - |

### Slot

| 名称 | 说明 |
|-----------|-----------|
| title | 自定义标题栏，如果设置了`title`属性则不生效 |
| desc | 自定义描述栏，如果设置了`desc`属性则不生效 |
| thumb | 自定义 thumb，如果设置了`thumb`属性则不生效 |
| bottom | 自定义价格下方区域 |
| footer | 自定义 footer |
| tags | 自定义 tags |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| thumb-class | 左侧图片样式类 |
| title-class | 标题样式类 |
| price-class | 价格样式类 |
| origin-price-class | 划线原价样式类 |
| desc-class | 描述样式类 |
| num-class | 数量样式类 |
