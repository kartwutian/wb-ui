<template>
  <view class="pages-uploader">
    <demo-block
      title="基础用法"
      padding
    >
      <van-uploader
        name="1"
        :file-list="fileList.fileList1"
        @after-read="afterRead"
        @delete="deletes"
        @oversize="oversize"
      />
    </demo-block>

    <demo-block
      title="文件预览"
      padding
    >
      <van-uploader
        name="2"
        :file-list="fileList.fileList2"
        multiple
        @after-read="afterRead"
        @delete="deletes"
        @click-preview="clickPreview"
      />
    </demo-block>

    <demo-block
      title="限制上传数量"
      padding
    >
      <van-uploader
        name="3"
        :file-list="fileList.fileList3"
        multiple
        :max-count="2"
        @after-read="afterRead"
        @delete="deletes"
        @click-preview="clickPreview"
      />
    </demo-block>

    <demo-block
      title="自定义上传样式"
      padding
    >
      <van-uploader
        name="4"
        :file-list="fileList.fileList4"
        :max-count="2"
        @after-read="afterRead"
        @delete="deletes"
        @click-preview="clickPreview"
        :use-slot="true"
      >
        <van-button
          icon="photo"
          type="primary"
        >上传图片</van-button>
      </van-uploader>
    </demo-block>

    <demo-block
      title="上传前校验"
      padding
    >
      <van-uploader
        name="5"
        :file-list="fileList.fileList5"
        @before-read="beforeRead"
        @after-read="afterRead"
        @delete="deletes"
        @click-preview="clickPreview"
        :use-before-read="true"
      />
    </demo-block>
  </view>
</template>

<script>
import DemoBlock from "../../../components/app/demo-block";
import VanButton from "../../../components/vant/button/index"
import VanUploader from "../../../components/vant/uploader/index"
import { EEXIST } from 'constants';

export default {
  name: 'pages-uploader',
  components: { VanUploader, VanButton, DemoBlock },
  data () {
    return {
      fileList: {
        fileList1: [],
        fileList2: [
          { url: 'https://img.yzcdn.cn/vant/tree.jpg', name: '图片1', isImage: true },
          { url: 'https://img.yzcdn.cn/vant/leaf.jpg', name: '图片2', isImage: true }
        ],
        fileList3: [],
        fileList4: [],
        fileList5: []
      }

    }
  },
  onLoad () {

  },
  onUnload () {

  },
  methods: {
    beforeRead (event) {
      const { file, callback = () => { } } = event;
      if (file.path.indexOf('jpeg') < 0) {
        uni.showToast({ title: '请选择jpg图片上传', icon: 'none' });
        callback(false);
        return;
      }
      callback(true);
    },

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

    clickPreview () { }
  }
}
</script>

<style lang="less">
</style>
