<template>
  <view :class="classes" :style="style" @tap="onClick">
    <image
      v-if="!error"
      :class="imageClass + ' van-image__img'"
      :mode="mode"
      :src="src"
      :lazy-load="lazyLoad"
      :fade-show="fadeShadow"
      @load="onImageLoad"
      @error="onImageError"
    />

    <view
      v-if="loading && showLoading"
      :class="loadingClass + ' van-image__loading'"
    >
      <slot v-if="useLoadingSlot" name="loading" />
      <van-icon v-else name="photo-o" size="22" />
    </view>
    <view v-if="error && showError" :class="errorClass + ' van-image__error'">
      <slot v-if="useErrorSlot" name="error" />
      <van-icon v-else name="warning-o" size="22" />
    </view>
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { addUnit, isDef } from "../common/utils";
import { basic } from "../mixins/basic";
import { button } from "../mixins/button";
import { openType } from "../mixins/open-type";
import VanIcon from "../icon/index";

export default {
  name: "van-image",
  components: { VanIcon },
  mixins: [basic, button, openType],

  props: {
    src: String,
    width: String,
    height: String,
    fit: {
      type: String,
      default: "fill"
    },
    round: Boolean,
    lazyLoad: Boolean,
    imageClass: {
      type: String,
      default: ""
    },
    loadingClass: {
      type: String,
      default: ""
    },
    errorClass: {
      type: String,
      default: ""
    },
    showError: {
      type: Boolean,
      default: true
    },
    showLoading: {
      type: Boolean,
      default: true
    },
    fadeShadow: {
      type: Boolean,
      default: true
    }, // 仅App-nvue 2.3.4+ Android有效

    // 受小程序slot限制所需要的属性
    useLoadingSlot: Boolean,
    useErrorSlot: Boolean
  },

  computed: {
    classes() {
      return `${this.customClass} ${utils.bem("image", { round: this.round })}`;
    }
  },

  data() {
    return {
      mode: "",
      style: "",
      FIT_MODE_MAP: {
        contain: "aspectFit",
        cover: "aspectFill",
        fill: "scaleToFill",
        none: "center",

        // 适配uni-app mode
        aspectFit: "aspectFit",
        aspectFill: "aspectFill",
        scaleToFill: "scaleToFill",
        center: "center",

        widthFix: "widthFix",
        top: "top",
        bottom: "bottom",
        left: "left",
        right: "right",
        "top-left": "top left",
        "top-right": "top right",
        "bottom-left": "bottom left",
        "bottom-right": "bottom right"
      },
      loading: true,
      error: false
    };
  },

  watch: {
    src() {
      this.loading = true;
      this.error = false;
    }
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      const { FIT_MODE_MAP, fit } = this;
      this.mode = FIT_MODE_MAP[fit];
      this.style = this.getStyle();
    },

    getStyle() {
      const { width, height } = this;
      let style = "";

      if (isDef(width)) {
        style += `width: ${addUnit(width)};`;
      }

      if (isDef(height)) {
        style += `height: ${addUnit(height)};`;
      }

      return style;
    },

    onImageLoad(event) {
      this.loading = false;
      this.$emit("load", event.detail);
    },

    onImageError(event) {
      this.loading = false;
      this.error = true;
      console.log("err");
      this.$emit("error", event.detail);
    },

    onClick(event) {
      console.log(event);
      this.$emit("click", event.detail);
    }
  }
};
</script>

<style lang="less"></style>
