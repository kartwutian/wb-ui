<template>
    <wxs src="../wxs/utils.wxs" module="utils" />

<view
  class="{{ utils.bem('nav-bar', { fixed }) }} custom-class {{ border ? 'van-hairline--bottom' : '' }}"
  style="z-index: {{ zIndex }}; padding-top: {{ safeAreaInsetTop ? statusBarHeight : 0 }}px;"
>
  <view class="van-nav-bar__left" bind:tap="onClickLeft">
    <block wx:if="{{ leftArrow || leftText }}">
      <van-icon
        wx:if="{{ leftArrow }}"
        size="16px"
        name="arrow-left"
        custom-class="van-nav-bar__arrow"
      />
      <view
        wx:if="{{ leftText }}"
        class="van-nav-bar__text"
        hover-class="van-nav-bar__text--hover"
        hover-stay-time="70"
      >{{ leftText }}</view>
    </block>
    <slot wx:else name="left" />
  </view>
  <view class="van-nav-bar__title title-class van-ellipsis">
    <block wx:if="{{ title }}">{{ title }}</block>
    <slot wx:else name="title" />
  </view>
  <view class="van-nav-bar__right" bind:tap="onClickRight">
    <view
      wx:if="{{ rightText }}"
      class="van-nav-bar__text"
      hover-class="van-nav-bar__text--hover"
      hover-stay-time="70"
    >{{ rightText }}</view>
    <slot wx:else name="right" />
  </view>
</view>

</template>

<script>
    import { VantComponent } from '../common/component';

VantComponent({
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
});

</script>

<style lang="less">

</style>
