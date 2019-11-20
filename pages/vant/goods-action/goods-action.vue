<template>
  <view class="pages-goods-action">
    <demo-block title="基础用法">
      <van-goods-action
        custom-class="goods-action"
        :safe-area-inset-bottom="false"
      >
        <van-goods-action-icon
          icon="chat-o"
          text="客服"
          open-type="contact"
          @click="onClickIcon"
        />
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          @click="onClickIcon"
        />
        <van-goods-action-button
          text="加入购物车"
          type="warning"
          @click="onClickButton"
        />
        <van-goods-action-button
          text="立即购买"
          @click="onClickButton"
        />
      </van-goods-action>
    </demo-block>

    <demo-block title="提示信息">
      <van-goods-action
        custom-class="goods-action"
        :safe-area-inset-bottom="false"
      >
        <van-goods-action-icon
          icon="chat-o"
          text="客服"
          dot
        />
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          info="10"
        />
        <van-goods-action-icon
          icon="shop-o"
          text="店铺"
          info="11"
        />
        <van-goods-action-button
          text="加入购物车"
          type="warning"
        />
        <van-goods-action-button text="立即购买" />
      </van-goods-action>
    </demo-block>

    <demo-block title="自定义按钮颜色">
      <van-goods-action
        custom-class="goods-action"
        :safe-area-inset-bottom="false"
      >
        <van-goods-action-icon
          icon="chat-o"
          text="客服"
        />
        <van-goods-action-icon
          icon="shop-o"
          text="店铺"
        />
        <van-goods-action-button
          color="#be99ff"
          type="warning"
          text="加入购物车"
        />
        <van-goods-action-button
          color="#7232dd"
          type="danger"
          text="立即购买"
        />
      </van-goods-action>
    </demo-block>
  </view>
</template>

<script>
import DemoBlock from "@/components/app/demo-block";
import VanGoodsAction from "@/components/vant/goods-action/index"
import VanGoodsActionButton from "@/components/vant/goods-action-button/index"
import VanGoodsActionIcon from "@/components/vant/goods-action-icon/index"

export default {
  name: 'pages-goods-action',
  components: { VanGoodsActionIcon, VanGoodsActionButton, VanGoodsAction, DemoBlock },
  onLoad () {

  },
  onUnload () {

  },
  methods: {
    onClickIcon () {
      uni.showToast({
        title: '点击图标',
        icon: 'none'
      });
    },

    onClickButton () {
      uni.showToast({
        title: '点击按钮',
        icon: 'none'
      });
    }
  }
}
</script>

<style lang="less">
.goods-action {
  position: relative !important;
}
</style>
