---
title: Sidebar 侧边导航
lang: zh
vant: true
---

# Sidebar 侧边导航

### 引入

在script中引入组件

```js
import VanSidebar from "@/components/vant/sidebar/index";
import VanSidebarItem from "@/components/vant/sidebar-item/index";
```

## 代码演示

### 基础用法

通过`v-model`绑定当前选中项的索引

```html
<van-sidebar custom-class="custom-sidebar" @change="onChange">
  <van-sidebar-item title="标签名称" />
  <van-sidebar-item title="标签名称" />
  <van-sidebar-item title="标签名称" />
</van-sidebar>
```

``` javascript
export default {
  methods: {
    onChange(detail) {
      uni.showToast({
        icon: 'none',
        title: `切换至第${detail}项`
      });
    }
  }
}
```

### 提示信息

设置`dot`属性后，会在右上角展示一个小红点。设置`info`属性后，会在右上角展示相应的徽标

```html
<van-sidebar custom-class="custom-sidebar" @change="onChange">
  <van-sidebar-item title="标签名称" dot />
  <van-sidebar-item title="标签名称" info="5" />
  <van-sidebar-item title="标签名称" info="99+" />
</van-sidebar>
```

``` javascript
export default {
  methods: {
    onChange(detail) {
      uni.showToast({
        icon: 'none',
        title: `切换至第${detail}项`
      });
    }
  }
}
```

## API

### Sidebar API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| active | 选中项的索引 | *string \| number* | `0` | - |

### Sidebar Event

| 事件名 | 说明 | 参数 |
|------|------|------|
| @change | 切换徽章时触发 | 当前选中徽章的索引 |

### Sidebar 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |

### SidebarItem API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-------------|-------------|
| title | 内容 | *string* | `''` | - |
| dot | 是否显示右上角小红点 | *boolean* | `false` | - |
| info | 提示消息 | *string \| number* | `''` | - |

### SidebarItem Event

| 事件名 | 说明 | 参数 |
|------|------|------|
| @click | 点击徽章时触发 | 当前徽章的索引 |

### SidebarItem 外部样式类

| 类名 | 说明 |
|-----------|-----------|
| custom-class | 根节点样式类 |
