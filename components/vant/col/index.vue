<template>
  <view :class="classes" :style="styles">
    <slot />
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";

export default {
  name: "van-col",
  mixins: [basic],

  props: {
    span: Number | String,
    offset: Number | String,
    gutter: {
      type: Number | String,
      default: 0
    }
  },

  data() {
    return {};
  },

  computed: {
    classes() {
      return `${this.customClass} ${utils.bem("col", [this.span])} ${
        this.offset ? "van-col--offset-" + this.offset : ""
      }`;
    },
    styles() {
      const padding = `${this.gutter / 2}px`;
      return this.gutter
        ? `padding-left: ${padding}; padding-right: ${padding};`
        : "";
    }
  },

  methods: {}
};
</script>

<style lang="less"></style>
