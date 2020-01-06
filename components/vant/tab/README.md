---
title: Tab 标签页
lang: zh
vant: true
---

# Tab 标签页

### 引入

在script中引入组件

```js
import VanTab from "@/components/vant/tab/index";
import VanTabs from "@/components/vant/tabs/index";
```

## 代码演示

### 基础用法

通过`active`设定当前激活标签对应的索引值，默认情况下启用第一个标签

```html
<van-tabs :active="1" @change="onChange">
  <van-tab
      v-for="(item, index) in [1,2,3,4,]"
      :key="index"
      :title="'标签 ' + item"
  >
    <view class="content">
      {{ '内容' + item }}
    </view>
  </van-tab>
</van-tabs>
```

```js
export default {
  data() {
    return {
      tabs: [1, 2, 3, 4],
      tabsMore: [1, 2, 3, 4, 5, 6, 7, 8],
      tabsWithName: [
        {name: 'a', index: 1},
        {name: 'b', index: 2},
        {name: 'c', index: 3}
      ]
    };
  },
  methods:{
    onChange(val) {
      uni.showToast({
        title: `切换到${val.title}`,
        icon: 'none'
      });
    },
  }
}
```

### 通过名称匹配

在标签指定`name`属性的情况下，`active`的值为当前标签的`name`，默认启用第一个标签

```html
<van-tabs active="a">
  <van-tab
      v-for="(item, index) in tabsWithName"
      :key="index"
      :name="item.name"
      :title="'标签 ' + item.index"
  >
    <view class="content">
      {{ '内容' + item.index}}
    </view>
  </van-tab>
</van-tabs>
```

```js
export default {
  data() {
    return {
      tabsWithName: [
        {name: 'a', index: 1},
        {name: 'b', index: 2},
        {name: 'c', index: 3}
      ]
    };
  }
}
```

### 横向滚动

多于 4 个标签时，Tab 可以横向滚动

```html
<van-tabs>
  <van-tab
      v-for="(item, index) in [1,2,3,4,5,6]"
      :key="index"
      :title="'标签 ' + item"
  >
    <view class="content">
      {{ '内容' + item }}
    </view>
  </van-tab>
</van-tabs>
```

### 禁用标签

设置`disabled`属性即可禁用标签。如果需要监听禁用标签的点击事件，可以在`van-tabs`上监听`disabled`事件

```html
<van-tabs @disabled="onClickDisabled">
  <van-tab
      v-for="(item, index) in [1,2,3]"
      :key="index"
      :disabled="index === 1"
      :title="'标签 ' + item"
  >
    <view class="content">
      {{ '内容' + item }}
    </view>
  </van-tab>
</van-tabs>
```

```js
export default {
  methods:{
    onClickDisabled(val) {
      uni.showToast({
        title: `标签 ${val.name} 已被禁用`,
        icon: 'none'
      });
    },
  }
}
```

### 样式风格

`Tab`支持两种样式风格：`line`和`card`，默认为`line`样式，可以通过`type`属性修改样式风格

```html
<van-tabs type="card" tab-class="tab-class">
  <van-tab
      v-for="(item, index) in [1,2,3]"
      :key="index"
      :title="'标签 ' + item"
  >
    <view class="content-2">
      {{ '内容' + item }}
    </view>
  </van-tab>
</van-tabs>
```

### 点击事件

可以在`van-tabs`上绑定`click`事件，在回调参数的`event.detail`中可以取得被点击标签的标题和标识符

```html
<van-tabs @click="onClick">
  <van-tab
      v-for="(item, index) in [1,2]"
      :key="index"
      :title="'标签 ' + item"
  >
    <view class="content">
      {{ '内容' + item }}
    </view>
  </van-tab>
</van-tabs>
```

```js
export default {
  methods:{
    onClick(val) {
      uni.showToast({
        title: `点击标签${val.title}`,
        icon: 'none'
      });
    },
  }
}
```

### 粘性布局

通过`sticky`属性可以开启粘性布局，粘性布局下，当 Tab 滚动到顶部时会自动吸顶

```html
<view id="my-sticky">
    <van-tabs
        sticky
        wrap-id="my-sticky"
        :z-index="10000"
        @scroll="onScroll"
    >
      <van-tab
          v-for="(item, index) in [1,2,3,4]"
          :key="index"
          :title="'标签 ' + item"
      >
        <view class="content">
          {{ '内容' + item }}
        </view>
      </van-tab>
    </van-tabs>
</view>
```

### 切换动画

可以通过`animated`来设置是否启用切换tab时的动画。

```html
<van-tabs animated>
  <van-tab
    v-for="(item, index) in [1,2,3,4]"
    :key="index"
    :title="'标签 ' + item"
  >
    <view class="content">
      {{ '内容' + item }}
    </view>
  </van-tab>
</van-tabs>
```

### 滑动切换

通过`swipeable`属性可以开启滑动切换标签页

```html
<van-tabs swipeable>
  <van-tab
      v-for="(item, index) in [1,2,3,4]"
      :key="index"
      :title="'标签 ' + item"
  >
    <view class="content">
      {{ '内容' + item }}
    </view>
  </van-tab>
</van-tabs>
```

### 自定义标题

```html
<van-tabs :active="1" @change="onChange" tab-class="tab-class" tab-active-class="tab-active-class">
  <van-icon
    slot="nav-right"
    name="search"
    custom-class="right-nav"
    @click="onClickNavRight"
  />
  <van-tab
    v-for="(item, index) in [1,2,3,4]"
    :key="index"
    :title="'标签 ' + item"
    :dot="index === 1"
    :info="index === 2 ? 99 : null"
  >
    <view class="content">
      {{ '内容' + item }}
    </view>
  </van-tab>
</van-tabs>
```

```js
export default {
  methods:{
    onChange(val) {
      uni.showToast({
        title: `切换到${val.title}`,
        icon: 'none'
      });
    },
    onClickNavRight() {
      uni.showToast({
        title: '点击 right nav',
        icon: 'none'
      });
    }
  }
}
```

## API

### Tabs API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| active | 当前选中标签的标识符 | *string \| number* | `0` | - |
| color | 标签颜色 | *string* | `#ee0a24` | - |
| z-index | z-index 层级 | *number* | `1` | - |
| type | 样式风格，可选值为`card` | *string* | `line` | - |
| border | 是否展示外边框，仅在`line`风格下生效 | *boolean* | `true` | - |
| duration | 动画时间 (单位秒)  | *number* | `0.3` | - |
| line-width | 底部条宽度 (px) | *string \| number* | 与当前标签等宽 | - |
| line-height | 底部条高度 (px) | *string \| number* | `6rpx` | - |
| swipe-threshold | 滚动阈值，设置标签数量超过多少个可滚动 | *number* | `4` | - |
| animated | 是否使用动画切换 Tabs | *boolean* | `false` | - |
| swipeable | 是否开启手势滑动切换 | *boolean* | `false` | - |
| sticky | 是否使用粘性定位布局 | *boolean* | `false` | - |
| offset-top | 粘性定位布局下与顶部的最小距离，单位 px | *number* | `0` | - |
| wrap-id | 当前组件外层元素的id，保证能获取当前.van-sticky,H5端页面存在多个van-sticky时必须传 | *string* | `` | - |
### Tab API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| name | 标签名称，作为匹配的标识符 | *string \| number* | 标签的索引值 | - |
| title | 标题 | *string* | - | - |
| disabled | 是否禁用标签 | *boolean* | `false` | - |
| dot | 是否显示小红点 | *boolean* | - | - |
| info | 图标右上角提示信息 | *string \| number* | - | - |
| title-style | 自定义标题样式 | *string* | - | - |

### Tabs Slot

| 名称 | 说明 |
|-----------|-----------|
| nav-left | 标题左侧内容 |
| nav-right | 标题右侧内容 |

### Tab Slot

| 名称 | 说明 |
|-----------|-----------|
| - | 标签页内容 |

### Tabs Event

| 事件名 | 说明 | 参数 |
|-----------|-----------|-----------|
| @click | 点击标签时触发 | name：标签标识符，title：标题 |
| @change | 当前激活的标签改变时触发 | name：标签标识符，title：标题 |
| @disabled | 点击被禁用的标签时触发 | name：标签标识符，title：标题 |
| @scroll | 滚动时触发 | { scrollTop: 距离顶部位置, isFixed: 是否吸顶 } |

### 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
| nav-class | 标签栏样式类 |
| tab-class | 标签样式类 |
| tab-active-class | 标签激活态样式类 |
