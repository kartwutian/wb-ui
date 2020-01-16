<template>
  <view class="van-uploader">
    <view class="van-uploader__wrapper">
      <!-- 预览样式 -->
      <block v-if="previewImage">
        <view
          v-for="(item, index) in lists"
          :key="index"
          class="van-uploader__preview"
        >
          <image
            v-if="item.isImage"
            :mode="imageFit"
            :src="item.url || item.path"
            :alt="item.name || '图片' + index"
            class="van-uploader__preview-image"
            :style="
              'width: ' +
                computedPreviewSize +
                'px; height: ' +
                computedPreviewSize +
                'px;' +
                (previewImageRadius
                  ? 'border-radius: ' + previewImageRadius
                  : '')
            "
            @tap="doPreviewImage(item)"
          />
          <view
            v-else
            class="van-uploader__file"
            :style="
              'width: ' +
                computedPreviewSize +
                'px; height: ' +
                computedPreviewSize +
                'px;'
            "
          >
            <van-icon name="description" class="van-uploader__file-icon" />
            <view class="van-uploader__file-name van-ellipsis">{{
              item.name || item.url || item.path
            }}</view>
          </view>
          <van-icon
            name="clear"
            size="36rpx"
            class="van-uploader__preview-delete"
            @tap="deleteItem(index)"
          />
        </view>
      </block>
      <!-- 上传样式 -->
      <block v-if="isInCount">
        <block v-if="useSlot">
          <view class="van-uploader__slot" @tap="startUpload">
            <slot />
          </view>
        </block>
        <block v-else>
          <!-- 默认上传样式 -->
          <view
            class="van-uploader__upload"
            :style="
              'width: ' +
                computedPreviewSize +
                'px; height: ' +
                computedPreviewSize +
                'px;'
            "
            @tap="startUpload"
          >
            <van-icon
              name="plus"
              class="van-uploader__upload-icon"
              :style="'font-size:' + unloadfontSize"
            />
            <text v-if="uploadText" class="van-uploader__upload-text">{{
              uploadText
            }}</text>
          </view>
        </block>
      </block>
    </view>
  </view>
</template>

<script>
import { isImageFile } from "./utils";
import { addUnit } from "../common/utils";
import VanIcon from "../icon/index";
// import utils from '../wxs/utils';
//     interface File {
//   path: string; // 上传临时地址
//   url: string; // 上传临时地址
//   size: number; // 上传大小
//   name: string; // 上传文件名称，accept="image" 不存在
//   type: string; // 上传类型，accept="image" 不存在
//   time: number; // 上传时间，accept="image" 不存在
//   image: boolean; // 是否为图片
// }

export default {
  name: "van-uploader",
  components: { VanIcon },
  props: {
    disabled: Boolean,
    multiple: Boolean,
    uploadText: String,
    previewSize: {
      type: null,
      default: 90
      // observer: 'setComputedPreviewSize'
    },
    name: {
      type: [Number, String],
      default: ""
    },
    accept: {
      type: String,
      default: "image"
    },
    fileList: {
      type: Array,
      default: () => {
        return [];
      }
      // observer: 'formatFileList'
    },
    maxSize: {
      type: Number,
      default: Number.MAX_VALUE
    },
    maxCount: {
      type: Number,
      default: 100
    },
    previewImage: {
      type: Boolean,
      default: true
    },
    previewImageRadius: {
      type: String,
      default: "8rpx"
    },
    previewFullImage: {
      type: Boolean,
      default: true
    },
    imageFit: {
      type: String,
      default: "scaleToFill"
    },
    useSlot: Boolean,
    useBeforeRead: Boolean,
    unloadfontSize: {
      type: String,
      default: "48rpx"
    }
  },
  data() {
    return {
      lists: [],
      computedPreviewSize: "",
      isInCount: true
    };
  },

  watch: {
    previewSize: "setComputedPreviewSize",
    fileList: "formatFileList"
  },

  beforeCreate() {
    this.$nextTick(() => {
      this.lists = this.fileList;
    });
  },

  methods: {
    formatFileList() {
      const { fileList = [], maxCount } = this;
      const lists = fileList.map(item => ({
        ...item,
        isImage:
          typeof item.isImage === "undefined" ? isImageFile(item) : item.isImage
      }));
      this.lists = lists;
      this.isInCount = lists.length < maxCount;
      this.lists.map(item => {
        item.isImage = true;
      });
    },

    setComputedPreviewSize(val) {
      this.computedPreviewSize = addUnit(val);
    },

    startUpload() {
      if (this.disabled) return;
      const {
        name = "",
        capture = ["album", "camera"],
        maxCount = 100,
        multiple = false,
        maxSize,
        accept,
        lists,
        useBeforeRead = false // 是否定义了 beforeRead
      } = this;

      let chooseFile = null;
      const newMaxCount = maxCount - lists.length;
      // 设置为只选择图片的时候使用 chooseImage 来实现
      if (accept === "image") {
        chooseFile = new Promise((resolve, reject) => {
          uni.chooseImage({
            count: multiple ? (newMaxCount > 9 ? 9 : newMaxCount) : 1, // 最多可以选择的数量，如果不支持多选则数量为1
            sourceType: capture, // 选择图片的来源，相册还是相机
            success: resolve,
            fail: reject
          });
        });
      } else {
        chooseFile = new Promise((resolve, reject) => {
          uni.chooseMessageFile({
            count: multiple ? newMaxCount : 1, // 最多可以选择的数量，如果不支持多选则数量为1
            type: "file",
            success: resolve,
            fail: reject
          });
        });
      }

      chooseFile.then(res => {
        const file = multiple ? res.tempFiles : res.tempFiles[0];
        // 检查文件大小
        if (file instanceof Array) {
          const sizeEnable = file.every(item => item.size <= maxSize);
          if (!sizeEnable) {
            this.$emit("oversize", { name });
            return;
          }
        } else if (file.size > maxSize) {
          this.$emit("oversize", { name });
          return;
        }

        // 触发上传之前的钩子函数
        if (useBeforeRead) {
          this.$emit("before-read", {
            file,
            name,
            callback: result => {
              if (result) {
                // 开始上传
                this.$emit("after-read", { file, name });
              }
            }
          });
        } else {
          this.$emit("after-read", { file, name });
        }
      });
    },

    deleteItem(index) {
      this.$emit("delete", { index, name: this.name });
    },

    doPreviewImage(item) {
      if (!this.previewFullImage) return;
      const curUrl = item.url || item.path;
      const images = this.lists
        .filter(item => item.isImage)
        .map(item => item.url || item.path);

      this.$emit("click-preview", { url: curUrl, name: this.name });

      uni.previewImage({
        urls: images,
        current: curUrl,
        fail() {
          uni.showToast({ title: "预览图片失败", icon: "none" });
        }
      });
    }
  }
};
</script>

<style lang="less"></style>
