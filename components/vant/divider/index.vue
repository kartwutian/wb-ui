<template>
  <view :class="divider" :style="styles">
    <slot />
  </view>
</template>

<script>
import utils from "../wxs/utils";

export default {
  name: "van-divider",
  props: {
    dashed: {
      type: Boolean,
      default: false
    },
    hairline: {
      type: Boolean,
      default: false
    },
    contentPosition: {
      type: String,
      default: "center"
    },
    fontSize: {
      type: String,
      default: ""
    },
    borderColor: {
      type: String,
      default: ""
    },
    textColor: {
      type: String,
      default: ""
    },
    customStyle: {
      type: String,
      default: ""
    }
  },
  computed: {
    divider() {
      // custom-class {{ utils.bem('divider', [{dashed, hairline}, contentPosition]) }}
      return `${this.customClass} ${utils.bem("divider", [
        { dashed: this.dashed, hairline: this.hairline },
        this.contentPosition
      ])}`;
    },
    styles() {
      // {{ borderColor  ? 'border-color: ' + borderColor + ';' : '' }}{{ textColor ? 'color: ' + textColor + ';' : '' }} {{ fontSize ? 'font-size: ' + fontSize + 'px;' : '' }} {{ customStyle }}
      return `${
        this.borderColor ? "border-color: " + this.borderColor + ";" : ""
      } ${this.textColor ? "color: " + this.textColor + ";" : ""} ${
        this.fontSize ? "font-size: " + this.fontSize + "px;" : ""
      } ${this.customStyle}`;
    }
  }
};
</script>

<style lang="less"></style>
