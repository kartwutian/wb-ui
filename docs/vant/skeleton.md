---
title: Skeleton 骨架屏
vant: true
---

# Skeleton 骨架屏

### 引入

在script中引入组件

```js
import VanSkeleton from "@/components/vant/skeleton/index";
```

## 代码演示

### 基础用法

通过`title`属性显示标题占位图，通过`row`属性配置占位段落行数

```html
<van-skeleton title row="3" :row-width="['100%', '100%', '80%']"/>
```

### 显示头像

通过`avatar`属性显示头像占位图

```html
<van-skeleton title avatar row="3" />
```

### 展示子组件

将`loading`属性设置成`false`表示内容加载完成，此时会隐藏占位图，并显示`Skeleton`的子组件

```html
<van-skeleton
  title
  avatar
  row="3"
  loading="loading"
>
  <view>实际内容</view>
</van-skeleton>
```

```js
export default {
  data(){
    return {
      loading:true
    }
  },
  mounted() {
    this.loading = false;
  }
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| row | 段落占位图行数 | *number* | `0` | - |
| row-width | 段落占位图宽度，可传数组来设置每一行的宽度 | *string \| string[]* | `100%` | - |
| title | 是否显示标题占位图 | *boolean* | `false` | - |
| title-width | 标题占位图宽度 | *string \| number* | `40%` | - |
| avatar | 是否显示头像占位图 | *boolean* | `false` | - |
| avatar-size | 头像占位图大小 | *string \| number* | `64rpx` | - |
| avatar-shape | 头像占位图形状，可选值为`square` | *string* | `round` | - |
| loading | 是否显示占位图，传`false`时会展示子组件内容 | *boolean* | `true` | - |
| animate | 是否开启动画 | *boolean* | `true` | - |
| animate-type | 动画类型（opacity , light） | *string* | `opacity` | - |
