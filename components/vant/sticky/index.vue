<template>
  <view
    :class="customClass + ' van-sticky'"
    :style="'z-index:' + zIndex + ';' + containerStyle"
  >
    <view :class="classes" :style="wrapStyle">
      <slot />
    </view>
  </view>
</template>

<script>
import { basic } from "../mixins/basic";
import { nextTick } from "../common/utils";

export default {
  name: "van-sticky",
  mixins: [basic],
  props: {
    zIndex: {
      type: Number,
      default: 99
    },
    offsetTop: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    wrapId: {
      type: String,
      default: ""
    }
  },

  computed: {
    classes() {
      return `${this.$utils.bem("sticky-wrap", { fixed: this.fixed })}`;
    }
  },

  data() {
    return {
      fixed: false,
      height: 0,
      wrapStyle: "",
      containerStyle: ""
    };
  },

  methods: {
    setStyle() {
      const { offsetTop, height, fixed, zIndex } = this;

      if (fixed) {
        this.wrapStyle = `top: ${offsetTop}px;`;
        this.containerStyle = `height: ${height}px; z-index: ${zIndex};`;
      } else {
        this.wrapStyle = "";
        this.containerStyle = "";
      }
    },

    observerContentScroll() {
      const { offsetTop } = this;
      const intersectionObserver = uni.createIntersectionObserver(this, {
        thresholds: [0, 1]
      });
      this.intersectionObserver = intersectionObserver;
      intersectionObserver.relativeToViewport({ top: -offsetTop });
      let selector = ".van-sticky";
      // 兼容不同平台，H5平台多个.van-sticky节点的情况下无法准确获取当前节点的情况
      //#ifdef APP-PLUS || H5
      if (this.wrapId) {
        selector = "#" + this.wrapId + " " + selector;
      }
      //#endif

      intersectionObserver.observe(selector, res => {
        if (this.disabled) {
          return;
        }
        // console.log(res)

        // @ts-ignore
        const { top, height } = res.boundingClientRect;
        const fixed = top <= offsetTop;
        this.$emit("scroll", {
          scrollTop: top,
          isFixed: fixed
        });

        this.fixed = fixed;
        this.height = height;

        this.setStyle();
      });
    }
  },

  mounted() {
    this.observerContentScroll();
  },

  destroyed() {
    this.intersectionObserver.disconnect();
  }
};
</script>

<style lang="less"></style>
