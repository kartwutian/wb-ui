<template>
    <wxs src="../wxs/utils.wxs" module="utils" />

<view
  class="van-uploader"
>
  <view class="van-uploader__wrapper">
    <!-- 预览样式 -->
    <block wx:if="{{ previewImage }}">
      <view
        wx:for="{{ lists  }}"
        wx:key="{{ index }}"
        class="van-uploader__preview"
      >
        <image
          wx:if="{{ item.isImage }}"
          mode="{{ imageFit }}"
          src="{{ item.url || item.path }}"
          alt="{{ item.name || ('图片' + index) }}"
          class="van-uploader__preview-image"
          style="width: {{ computedPreviewSize }}px; height: {{ computedPreviewSize }}px;"
          data-url="{{ item.url || item.path }}"
          bind:tap="doPreviewImage"
        />
        <view
          wx:else
          class="van-uploader__file"
          style="width: {{ computedPreviewSize }}px; height: {{ computedPreviewSize }}px;"
        >
          <van-icon name="description" class="van-uploader__file-icon" />
          <view class="van-uploader__file-name van-ellipsis">{{ item.name || item.url || item.path }}</view>
        </view>
        <van-icon
          name="delete"
          class="van-uploader__preview-delete"
          bind:tap="deleteItem"
          data-index="{{ index }}"
        />
      </view>
    </block>
    <!-- 上传样式 -->
    <block wx:if="{{ isInCount }}">
      <block wx:if="{{ useSlot }}">
        <view class="van-uploader__slot" bind:tap="startUpload">
          <slot />
        </view>
      </block>
      <block wx:else>
        <!-- 默认上传样式 -->
        <view
          class="van-uploader__upload"
          style="width: {{ computedPreviewSize }}px; height: {{ computedPreviewSize }}px;"
          bind:tap="startUpload"
        >
          <van-icon name="plus" class="van-uploader__upload-icon" />
          <text wx:if="{{ uploadText }}" class="van-uploader__upload-text">{{ uploadText }}</text>
        </view>
      </block>
    </block>
  </view>
</view>

</template>

<script>
    interface File {
  path: string; // 上传临时地址
  url: string; // 上传临时地址
  size: number; // 上传大小
  name: string; // 上传文件名称，accept="image" 不存在
  type: string; // 上传类型，accept="image" 不存在
  time: number; // 上传时间，accept="image" 不存在
  image: boolean; // 是否为图片
}

const IMAGE_EXT = ['jpeg', 'jpg', 'gif', 'png', 'svg'];

export function isImageUrl(url: string): boolean {
  return IMAGE_EXT.some(ext => url.indexOf(`.${ext}`) !== -1);
}

export function isImageFile(item: File): boolean {
  if (item.type) {
    return item.type.indexOf('image') === 0;
  }

  if (item.path) {
    return isImageUrl(item.path);
  }

  if (item.url) {
    return isImageUrl(item.url);
  }

  return false;
}

</script>

<style lang="less">

</style>
