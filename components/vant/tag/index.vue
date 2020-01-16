<template>
  <!-- <view
    :class="classes"
    :style="styles"
  >
    <slot />
  </view> -->

  <view :class="classes" :style="styles">
    <slot />
    <van-icon
      v-if="closeable"
      name="cross"
      custom-class="van-tag__close"
      @click="onClose"
    />
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";
import VanIcon from "../icon/index";

export default {
  name: "van-tag",
  components: { VanIcon },
  mixins: [basic],
  props: {
    size: {
      type: String
    },
    mark: {
      type: Boolean
    },
    color: {
      type: String
    },
    plain: {
      type: Boolean
    },
    round: {
      type: Boolean
    },
    textColor: {
      type: String
    },
    type: {
      type: String,
      default: "default"
    },
    closeable: {
      type: Boolean
    }
  },
  computed: {
    classes() {
      return `${this.customClass} ${utils.bem("tag", [
        this.type,
        this.size,
        { mark: this.mark, plain: this.plain, round: this.round }
      ])} ${this.plain ? "van-hairline--surround" : ""}`;
    },
    styles() {
      return `${
        this.color && !this.plain ? "background-color: " + this.color + ";" : ""
      } ${
        this.textColor || (this.color && this.plain)
          ? "color: " + (this.textColor || this.color)
          : ""
      }`;
    }
  },
  methods: {
    onClose() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="less"></style>
