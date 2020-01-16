<template>
  <view>
    <view v-if="loading" :class="classes">
      <view
        v-if="avatar"
        :class="avatarClass"
        :style="'width:' + avatarSize + ';height:' + avatarSize"
      />
      <view class="van-skeleton__content">
        <view
          v-if="title"
          class="van-skeleton__title"
          :style="'width:' + titleWidth + ';'"
        />
        <view
          v-for="(item, index) in row"
          :key="index"
          class="van-skeleton__row"
          :style="'width:' + (isArray ? rowWidth[index] : rowWidth)"
        />
      </view>
      <view
        v-if="animate && animateType === 'light'"
        class="van-skeleton__light"
      ></view>
    </view>
    <view v-else class="van-skeleton__content">
      <slot />
    </view>
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";

export default {
  name: "van-skeleton",
  mixins: [basic],
  props: {
    row: {
      type: Number,
      default: 0
    },
    title: Boolean,
    avatar: Boolean,
    loading: {
      type: Boolean,
      default: true
    },
    animate: {
      type: Boolean,
      default: true
    },
    animateType: {
      type: String,
      default: "opacity"
    },
    avatarSize: {
      type: String,
      default: "64rpx"
    },
    avatarShape: {
      type: String,
      default: "round"
    },
    titleWidth: {
      type: String,
      default: "40%"
    },
    rowWidth: {
      type: null,
      default: "100%"
    }
  },

  computed: {
    isArray() {
      return this.rowWidth instanceof Array;
    },
    classes() {
      return `${this.customClass} ${utils.bem("skeleton", [
        { animate: this.animate && this.animateType === "opacity" }
      ])}`;
    },
    avatarClass() {
      return `${utils.bem("skeleton__avatar", [this.avatarShape])}`;
    }
  }
};
</script>

<style lang="less"></style>
