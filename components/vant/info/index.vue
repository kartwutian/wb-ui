<template>
  <view
    v-if="(info !== null && info !== '') || dot"
    :class="classes"
    :style="customStyle"
    >{{ dot ? "" : info }}</view
  >
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";

export default {
  name: "van-info",
  mixins: [basic],
  props: {
    dot: Boolean,
    info: null,
    customStyle: {
      type: String,
      default: ""
    }
  },
  computed: {
    classes() {
      //van-info 属性会让使用icon的组件右上角出现白条
      return `${this.customClass} ${utils.bem("info", { dot: this.dot })}`;
    }
  }
};
</script>

<style lang="less"></style>
