# Image 图片

### 介绍

增强版的 img 标签，提供多种图片填充模式，支持图片懒加载、加载中提示、加载失败提示

### 引入

``` javascript
import VanImage from "@/components/vant/image/index";

```

## 代码演示

### 基础用法

基础用法与原生`img`标签一致，可以设置`src`、`width`、`height`、`alt`等原生属性

```html
<van-image
  width="100"
  height="100"
  src="https://img.yzcdn.cn/vant/cat.jpeg"
/>
```

### 填充模式

通过`fit`属性可以设置图片填充模式，可选值见下方表格

```html
<van-image
  width="10rem"
  height="10rem"
  fit="contain"
  src="https://img.yzcdn.cn/vant/cat.jpeg"
/>
```

### 圆形图片

通过`round`属性可以设置图片变圆，注意当图片宽高不相等且`fit`为`contain`或`scale-down`时，将无法填充一个完整的圆形。

```html
<van-image
  round
  width="10rem"
  height="10rem"
  src="https://img.yzcdn.cn/vant/cat.jpeg"
/>
```

### 图片懒加载

设置`lazy-load`属性来开启图片懒加载。只针对page与scroll-view下的image有效
### Tips

- <image> 组件默认宽度 300px、高度 225px；app-nvue平台，暂时默认为屏幕宽度
- src 仅支持相对路径、绝对路径，支持 base64 码；
- 页面结构复杂，css样式太多的情况，使用 image 可能导致样式生效较慢，出现 “闪一下” 的情况，此时设置 image{will-change: transform} ,可优化此问题。
- 自定义组件里面使用 <image>时，若 src 使用相对路径可能出现路径查找失败的情况，故建议使用绝对路径。
- webp格式的图片，app-vue下，iOS不支持，Android支持；app-nvue下，iOS和Android均支持。app-vue下也支持gif。

```html
<van-image
  width="100"
  height="100"
  lazy-load
  src="https://img.yzcdn.cn/vant/cat.jpeg"
/>
```

### 加载中提示

`Image`组件提供了默认的加载中提示，支持通过`loading`插槽自定义内容

```html
<van-image src="https://img.yzcdn.cn/vant/cat.jpeg">
  <template v-slot:loading>
    <van-loading type="spinner" size="20" />
  </template>
</van-image>
```

### 加载失败提示

`Image`组件提供了默认的加载失败提示，支持通过`error`插槽自定义内容

```html
<van-image src="https://img.yzcdn.cn/vant/cat.jpeg">
  <template v-slot:error>加载失败</template>
</van-image>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| src | 图片链接 | *string* | - | - |
| fit | 图片填充模式 | *string* | `fill` | - |
| width | 宽度，默认单位为`px` | *string \| number* | - | - |
| height | 高度，默认单位为`px` | *string \| number* | - | - |
| round | 是否显示为圆形 | *boolean* | `false` | - |
| lazy-load | 图片懒加载。只针对page与scroll-view下的image有效 | *boolean* | `false` | - |
| show-error | 是否展示图片加载失败提示 | *boolean* | `true` | 2.0.9 |
| show-loading | 是否展示图片加载中提示 | *boolean* | `true` | 2.0.9 |
| fade-show | 图片显示动画效果，仅App-nvue 2.3.4+ Android有效 | *boolean* | `true` | 2.0.9 |

### 图片填充模式

| 名称 | 含义 |
|------|------|
| contain | 保持宽高缩放图片，使图片的长边能完全显示出来 |
| cover | 保持宽高缩放图片，使图片的短边能完全显示出来，裁剪长边 |
| fill | 拉伸图片，使图片填满元素 |
| none | 保持图片原有尺寸 |
| scale-down | 取`none`或`contain`中较小的一个 |

### Events

| 事件名 | 说明 | 回调参数 |
|------|------|------|
| click | 点击图片时触发 | event: Event |
| load | 图片加载完毕时触发 | - |
| error | 图片加载失败时触发 | - |

### Slots

| 名称 | 说明 |
|------|------|
| loading | 自定义加载中的提示内容 |
| error | 自定义加载失败时的提示内容 |
