<template>
  <van-transition
    :show="show"
    custom-class="van-overlay"
    :custom-style="customStyles"
    :duration="duration"
    @tap="onClick"
    @touchmove="noop"
  />
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";
import { button } from "../mixins/button";
import { openType } from "../mixins/open-type";
import VanTransition from "../transition/index";

export default {
  name: "van-overlay",
  components: { VanTransition },
  mixins: [basic, button, openType],
  props: {
    show: Boolean,
    customStyle: {
      type: String,
      default: ""
    },
    duration: {
      type: null,
      default: 300
    },
    zIndex: {
      type: Number,
      default: 1000
    }
  },

  computed: {
    customStyles() {
      return `z-index: ${this.zIndex}; ${this.customStyle}`;
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    },

    // for prevent touchmove
    noop() {}
  }
};
</script>

<style lang="less"></style>
