<template>
  <van-transition
    name="slide-down"
    :show="isShow"
    custom-class="van-notify__container"
    :custom-style="'z-index:' + zIndex"
    @tap="onTap"
  >
    <view
      :class="'van-notify van-notify--' + type"
      :style="'background:' + background + ';color:' + color"
    >
      <view v-if="safeAreaInsetTop" class="van-notify__safe-area"></view>
      <text>{{ message }}</text>
    </view>
  </van-transition>
</template>

<script>
import { basic } from "../mixins/basic";
import { set } from "../mixins/set";
import { WHITE } from "../common/color";
import VanTransition from "../transition/index";

export default {
  name: "van-notify",
  components: { VanTransition },
  mixins: [basic, set],

  data() {
    return {
      type: "danger",
      message: "",
      background: "",
      color: WHITE,
      duration: 3000,
      zIndex: 110,
      safeAreaInsetTop: false,

      isShow: false
    };
  },

  methods: {
    show() {
      const { duration, onOpened } = this;

      clearTimeout(this.timer);
      this.set(
        {
          isShow: true
        },
        onOpened
      );

      if (duration > 0 && duration !== Infinity) {
        this.timer = setTimeout(() => {
          this.hide();
        }, duration);
      }
    },

    hide() {
      const { onClose } = this;

      clearTimeout(this.timer);
      this.set(
        {
          isShow: false
        },
        onClose
      );
    },

    onTap() {
      const { onClick } = this;
      console.log("clicked");
      if (onClick) {
        onClick();
      }
    }
  }
};
</script>

<style lang="less"></style>
