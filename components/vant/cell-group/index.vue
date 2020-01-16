<template>
  <view>
    <view v-if="title" class="van-cell-group__title">
      {{ title }}
    </view>
    <view :class="classes">
      <slot />
    </view>
  </view>
</template>

<script>
import { basic } from "../mixins/basic";

export default {
  name: "van-cell-group",
  mixins: [basic],
  props: {
    title: String,
    border: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classes() {
      return `${this.customClass} van-cell-group ${
        this.border ? "van-hairline--top-bottom" : ""
      }`;
    }
  }
};
</script>

<style lang="less"></style>
