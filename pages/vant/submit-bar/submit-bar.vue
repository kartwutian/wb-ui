<template>
  <view class="pages-submit-bar">
    <demo-block title="基础用法">
      <van-submit-bar
        :price="3050"
        button-text="提交订单"
        @submit="onClickButton"
        custom-class="van-submit-bar"
        :safe-area-inset-bottom="false"
      />
    </demo-block>

    <demo-block title="禁用状态">
      <van-submit-bar
        disabled
        price="3050"
        button-text="提交订单"
        tip="您的收货地址不支持同城送, 我们已为您推荐快递"
        tip-icon="//img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
        @submit="onClickButton"
        custom-class="van-submit-bar"
        :safe-area-inset-bottom="false"
      />
    </demo-block>

    <demo-block title="加载状态">
      <van-submit-bar
        loading
        price="3050"
        button-text="提交订单"
        @submit="onClickButton"
        custom-class="van-submit-bar"
        :safe-area-inset-bottom="false"
      />
    </demo-block>

    <demo-block title="高级用法">
      <van-submit-bar
        price="3050"
        button-text="提交订单"
        @submit="onClickButton"
        custom-class="van-submit-bar"
        :tip="true"
        :safe-area-inset-bottom="false"
      >
        <van-tag
          type="primary"
          custom-class="van-tag"
        >标签</van-tag>
        <view slot="tip">
          您的收货地址不支持同城送
          <text
            class="edit-address"
            @tap="onClickLink"
          >修改地址</text>
        </view>
      </van-submit-bar>
    </demo-block>

    <!-- <van-toast id="van-toast" /> -->

  </view>
</template>

<script>
import DemoBlock from "../../../components/app/demo-block";
import VanButton from "../../../components/vant/button/index"
import VanSubmitBar from "../../../components/vant/submit-bar/index"
import VanTag from "../../../components/vant/tag/index"

export default {
  name: 'pages-submit-bar',
  components: { VanSubmitBar, VanButton, DemoBlock, VanTag },
  onLoad () {

  },
  onUnload () {

  },
  methods: {
    onClickButton (val) {
      console.log(val)
    },
    onClickLink () {
      console.log("点击修改")
    }
  }
}
</script>

<style lang="less">
.van-submit-bar {
  position: relative !important;
}

.edit-address {
  color: #1989fa;
}

.van-tag {
  margin-left: 15px;
}
</style>
