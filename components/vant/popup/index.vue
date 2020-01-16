<template>
  <view>
    <van-overlay
      v-if="overlay"
      :show="show"
      :z-index="zIndex"
      :custom-style="overlayStyle"
      :duration="computedDuration"
      @tap="onClickOverlay"
    />
    <view
      v-if="inited"
      :class="popupClass"
      :style="style"
      @transitionend="onTransitionEnd"
    >
      <slot />
      <van-icon
        v-if="closeable"
        :name="closeIcon"
        :class="
          'van-popup__close-icon van-popup__close-icon--' + closeIconPosition
        "
        @tap="onClickCloseIcon"
      />
    </view>
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";
import { transition } from "../mixins/transition";
import VanOverlay from "../overlay/index";
import VanIcon from "../icon/index";

export default {
  name: "van-popup",
  components: { VanIcon, VanOverlay },

  mixins: [basic, transition(false)],

  props: {
    enterClass: {
      type: String,
      default: ""
    },
    enterActiveClass: {
      type: String,
      default: ""
    },
    enterToClass: {
      type: String,
      default: ""
    },
    leaveClass: {
      type: String,
      default: ""
    },
    leaveActiveClass: {
      type: String,
      default: ""
    },
    leaveToClass: {
      type: String,
      default: ""
    },
    round: Boolean,
    closeable: Boolean,
    customStyle: String,
    overlayStyle: {
      type: String,
      default: ""
    },
    transition: {
      type: String,
      default: "none"
    },
    zIndex: {
      type: Number,
      default: 100
    },
    overlay: {
      type: Boolean,
      default: true
    },
    closeIcon: {
      type: String,
      default: "cross"
    },
    closeIconPosition: {
      type: String,
      default: "top-right"
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: "center"
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    safeAreaInsetTop: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    popupClass() {
      return `${this.customClass} ${this.classes} ${utils.bem("popup", [
        this.position,
        {
          round: this.round,
          safe: this.safeAreaInsetBottom,
          safeTop: this.safeAreaInsetTop
        }
      ])}`;
    },
    style() {
      return `z-index: ${this.zIndex}; -webkit-transition-duration:${
        this.currentDuration
      }ms; transition-duration:${this.currentDuration}ms; ${
        this.display ? "" : "display: none;"
      };${this.customStyle}`;
    },
    computedDuration() {
      const { transition, duration } = this;
      return transition === "none" ? 0 : duration;
    }
  },

  methods: {
    onClickCloseIcon() {
      this.$emit("close");
    },

    onClickOverlay() {
      this.$emit("click-overlay");
      if (this.closeOnClickOverlay) {
        this.$emit("close");
      }
    }
  }
};
</script>

<style lang="less"></style>
