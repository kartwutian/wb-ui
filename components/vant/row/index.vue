<template>
  <view :class="customClass + ' van-row'" :style="style">
    <slot />
  </view>
</template>

<script>
import { basic } from "../mixins/basic";

export default {
  name: "van-row",
  mixins: [basic],
  props: {
    gutter: {
      type: Number | String,
      default: 0
    }
  },

  computed: {
    style() {
      const margin = `-${Number(this.gutter) / 2}px`;
      return this.gutter
        ? `margin-right: ${margin}; margin-left: ${margin};`
        : "";
    }
  },

  methods: {}
};
</script>

<style lang="less"></style>
