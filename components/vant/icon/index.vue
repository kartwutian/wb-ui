<template>
  <view :class="classes" :style="styles" @tap="onClick">
    <van-info
      v-if="info || dot"
      :dot="dot"
      :info="info"
      custom-class="van-icon__info"
    />
    <image
      v-if="isImageName"
      :src="name"
      mode="aspectFit"
      class="van-icon__image"
    />
  </view>
</template>

<script>
import { addUnit } from "../common/utils";
import { basic } from "../mixins/basic";
import VanInfo from "../info/index";

export default {
  name: "van-icon",
  mixins: [basic],
  components: { VanInfo },
  props: {
    dot: {
      type: Boolean,
      default: false
    },
    info: null,
    size: {
      type: String | Number,
      default: "1em"
    },
    color: String,
    customStyle: {
      type: String,
      default: ""
    },
    classPrefix: {
      type: String,
      default: "van-icon"
    },
    name: {
      type: String
    }
  },

  computed: {
    isImageName() {
      return this.name.indexOf("/") !== -1;
    },
    classes() {
      return `${this.customClass} ${this.classPrefix} ${
        this.isImageName
          ? "van-icon--image"
          : this.classPrefix + "-" + this.name
      }`;
    },
    styles() {
      return `${this.color ? "color: " + this.color + ";" : ""}${
        this.size ? "font-size: " + addUnit(this.size) + ";" : ""
      }${this.customStyle}`;
    }
  },

  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="less"></style>
