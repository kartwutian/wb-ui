<template>
  <view
    :class="classes"
    :style="[
      { 'z-index': zIndex },
      { 'padding-top': (safeAreaInsetTop ? statusBarHeight : 0) + 'px' }
    ]"
  >
    <view class="van-nav-bar__left" @tap="onClickLeft">
      <block v-if="leftArrow || leftText">
        <van-icon
          v-if="leftArrow"
          size="32rpx"
          name="arrow-left"
          custom-class="van-nav-bar__arrow"
        />
        <view
          v-if="leftText"
          class="van-nav-bar__text"
          hover-class="van-nav-bar__text--hover"
          :hover-stay-time="70"
          >{{ leftText }}</view
        >
      </block>
      <slot v-else name="left" />
    </view>
    <view :class="'van-nav-bar__title ' + titleClass + ' van-ellipsis'">
      <block v-if="title">{{ title }}</block>
      <slot v-else name="title" />
    </view>
    <view class="van-nav-bar__right" @tap="onClickRight">
      <view
        v-if="rightText"
        class="van-nav-bar__text"
        hover-class="van-nav-bar__text--hover"
        :hover-stay-time="70"
        >{{ rightText }}</view
      >
      <slot v-else name="right" />
    </view>
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";
import { button } from "../mixins/button";
import { openType } from "../mixins/open-type";
import VanIcon from "../icon/index";
import VanLoading from "../loading/index";

export default {
  name: "van-nav-bar",
  components: { VanLoading, VanIcon },
  mixins: [basic, button, openType],

  props: {
    title: String,
    fixed: Boolean,
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    border: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 1
    },
    safeAreaInsetTop: {
      type: Boolean,
      default: true
    },
    titleClass: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      statusBarHeight: 0
    };
  },

  beforeCreate() {
    const { statusBarHeight } = uni.getSystemInfoSync();
    this.statusBarHeight = statusBarHeight;
  },

  computed: {
    classes() {
      return `${utils.bem("nav-bar", this.fixed)} ${this.customClass} ${
        this.border ? "van-hairline--top-bottom" : ""
      })`;
    }
  },
  methods: {
    onClickLeft() {
      this.$emit("click-left");
    },

    onClickRight() {
      this.$emit("click-right");
    }
  }
};
</script>

<style lang="less"></style>
