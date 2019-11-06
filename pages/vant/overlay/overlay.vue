<template>
  <view class="pages-overlay">
    <demo-block
      title="基础用法"
      padding
    >
      <van-button
        type="primary"
        @click="onClickShow"
      >
        显示遮罩层
      </van-button>
      <van-overlay
        :show="show"
        @click="onClickHide"
      />
    </demo-block>
  </view>
</template>

<script>
import DemoBlock from "../../../components/app/demo-block";
import VanButton from "../../../components/vant/button/index"
import VanOverlay from "../../../components/vant/overlay/index.vue"

export default {
  name: 'pages-overlay',
  components: { VanOverlay, VanButton, DemoBlock },
  data () {
    return {
      show: false
    }
  },
  onLoad () {

  },
  onUnload () {

  },
  methods: {
    onClickShow () {
      this.show = true
    },
    onClickHide () {
      this.show = false
    }
  }
}
</script>

<style lang="less">
</style>
