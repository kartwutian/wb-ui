<template>

<view
  class="{{ utils.bem('nav-bar', { fixed }) }} custom-class {{ border ? 'van-hairline--bottom' : '' }}"
  style="z-index: {{ zIndex }}; padding-top: {{ safeAreaInsetTop ? statusBarHeight : 0 }}px;"
>
  <view class="van-nav-bar__left" @tap="onClickLeft">
    <block v-if=" leftArrow || leftText ">
      <van-icon
        v-if=" leftArrow "
        size="16px"
        name="arrow-left"
        custom-class="van-nav-bar__arrow"
      />
      <view
        v-if=" leftText "
        class="van-nav-bar__text"
        hover-class="van-nav-bar__text--hover"
        hover-stay-time="70"
      >{{ leftText }}</view>
    </block>
    <slot v-else name="left" />
  </view>
  <view class="van-nav-bar__title title-class van-ellipsis">
    <block v-if=" title ">{{ title }}</block>
    <slot v-else name="title" />
  </view>
  <view class="van-nav-bar__right" @tap="onClickRight">
    <view
      v-if=" rightText "
      class="van-nav-bar__text"
      hover-class="van-nav-bar__text--hover"
      hover-stay-time="70"
    >{{ rightText }}</view>
    <slot v-else name="right" />
  </view>
</view>

</template>

<script>
  import utils from '../wxs/utils';


export default {
  classes: ['title-class'],

  props: {
    title: String,
    fixed: Boolean,
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    border: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 1
    },
    safeAreaInsetTop: {
      type: Boolean,
      value: true
    },
  },

  data: {
    statusBarHeight: 0
  },

  created() {
    const { statusBarHeight } = wx.getSystemInfoSync();
    this.setData({ statusBarHeight });
  },

  methods: {
    onClickLeft() {
      this.$emit('click-left');
    },

    onClickRight() {
      this.$emit('click-right');
    }
  }
};

</script>

<style lang="less">

</style>
