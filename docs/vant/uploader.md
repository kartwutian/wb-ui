---
title: Upload 上传文件
lang: zh
vant: true
---

# Upload 上传文件

### 引入

在script中引入组件

```js
import VanUploader from "@/components/vant/uploader/index"
```

## 代码演示

### 基础用法

文件上传完毕后会触发`after-read`回调函数，获取到对应的`file`对象

#### html 示例

```html
<van-uploader
  name="1"
  :file-list="fileList.fileList1"
  @after-read="afterRead"
  @delete="deletes"
  @oversize="oversize"
/>
```

```js
export default {
  data(){
    return {
      fileList: {
        fileList1: []
      }
    }
  },
  methods:{
    afterRead (event) {
      const { file, name } = event;
      const fileList = this.fileList[`fileList${name}`]
      this.fileList[`fileList${name}`] = fileList.concat(file)
    },

    oversize () {
      uni.showToast({ title: '文件超出大小限制', icon: 'none' });
    },

    deletes (event) {
      const { index, name } = event;
      const fileList = this.fileList[`fileList${name}`]
      fileList.splice(index, 1);
      this.fileList[`fileList${name}`] = fileList
    },
  }
}
```

### 图片预览

通过向组件传入`file-list`属性，可以绑定已经上传的图片列表，并展示图片列表的预览图

```html
<van-uploader
  name="2"
  :file-list="fileList.fileList2"
  multiple
  @click-preview="clickPreview"
/>
```

```js
export default {
  data(){
    return {
      fileList: {
        fileList2: [
          { url: 'https://img.yzcdn.cn/vant/tree.jpg', name: '图片1', isImage: true },
          { url: 'https://img.yzcdn.cn/vant/leaf.jpg', name: '图片2', isImage: true }
        ]
      }
    }
  },
  methods:{
    clickPreview () { }
  }
}
```

### 限制上传数量

通过`max-count`属性可以限制上传文件的数量，上传数量达到限制后，会自动隐藏上传区域

```html
<van-uploader
  name="3"
  :file-list="fileList.fileList3"
  multiple
  :max-count="2"
/>
```

```js
export default {
  data(){
    return {
      fileList: {
        fileList3: []
      }
    }
  }
}
```


### 自定义上传样式

将`use-slot`属性设置为`true`，通过插槽可以自定义上传区域的样式

```html
<van-uploader
  name="4"
  :file-list="fileList.fileList4"
  :max-count="2"
  :use-slot="true"
>
  <van-button
    icon="photo"
    type="primary"
  >上传图片</van-button>
</van-uploader>
```

```js
export default {
  data(){
    return {
      fileList: {
        fileList4: []
      }
    }
  }
}
```

### 上传前校验

将`use-before-read`属性设置为`true`，然后绑定 `before-read` 事件可以在上传前进行校验，调用 `callback` 方法传入 `true` 表示校验通过，传入 `false` 表示校验失败。

```html
<van-uploader
  name="5"
  :file-list="fileList.fileList5"
  @before-read="beforeRead"
  :use-before-read="true"
/>
```

```js
export default {
  data(){
    return {
      fileList: {
        fileList5: []
      }
    }
  },
  methods:{
    beforeRead (event) {
      const { file, callback = () => { } } = event;
      if (file.path.indexOf('jpeg') < 0) {
        uni.showToast({ title: '请选择jpg图片上传', icon: 'none' });
        callback(false);
        return;
      }
      callback(true);
    },
  }
}
```

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|-----------|-----------|-----------|-----------|-----------|
| name | 标识符，可以在回调函数的第二项参数中获取 | _string \| number_ | - |
| accept | 接受的文件类型, 可选值为`all` `image` `file` | _string_ | `image` |
| preview-size | 预览图和上传区域的尺寸，默认单位为`px` | _string \| number_ | `180rpx` |
| preview-image | 是否在上传完成后展示预览图 | _boolean_ | `true` |
| preview-image-radius | 预览图片的border-radius | _string_ | `8rpx` |
| preview-full-image | 是否在点击预览图后展示全屏图片预览 | _boolean_ | `true` |
| multiple | 是否开启图片多选，部分安卓机型不支持 | _boolean_ | `false` |
| capture | 图片选取模式，当`accept`为`image`类型时设置`capture`可选值为`camera`可以直接调起摄像头 | _string \| Array_ | `['album', 'camera']` |
| disabled | 是否禁用文件上传 | _boolean_ | `false` |
| max-size | 文件大小限制，单位为`byte` | _number_ | - |
| max-count | 文件上传数量限制 | _number_ | - |
| upload-text | 上传区域文字提示 | _string_ | - |
| image-fit | 预览图裁剪模式，可选值参考小程序`image`组件的`mode`属性 | _string_ | `scaleToFill` |
| unloadfontSize | 上传文件图标icon字体大小 | _string_ | `48rpx` |
| file-list | 存放图片路径数组 | _array_ | [] |
| use-slot | 是否使用插槽 | _boolean_ | - |
| use-before-read | 是否在上传前进行校验 | _boolean_ | - |

### Slot

| 名称 | 说明 |
| ---- | -------------------------------- |
| - | 自定义上传样式，用法见上面的例子 |

### Event

| 事件名 | 说明 | 参数 |
| ------------------ | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| @before-read | 文件读取前的回调函数，返回 `false` 可终止文件读取，绑定事件的同时需要将`use-before-read`属性设置为`true` | `event.detail.file`: 当前读取的文件，`event.detail.callback`: 回调函数，调用`callback(false)`终止文件读取 |
| @after-read | 文件读取完成后的回调函数 | `event.detail.file`: 当前读取的文件 |
| @oversize | 文件超出大小限制的回调函数 | - |
| @click-preview | 点击预览图片的回调函数 | `event.detail.index`: 点击图片的序号值 |
| @delete | 删除图片的回调函数 | `event.detail.index`: 删除图片的序号值 |
