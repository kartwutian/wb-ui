<template>
  <view
    v-if="inited"
    :class="'van-transition ' + customClass + ' ' + classes"
    :style="styles"
    @transitionend="onTransitionEnd"
    @tap="onClick"
  >
    <slot />
  </view>
</template>

<script>
import { transition } from "../mixins/transition";
import { basic } from "../mixins/basic";

export default {
  name: "van-transition",
  mixins: [basic, transition(true)],

  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="less"></style>
