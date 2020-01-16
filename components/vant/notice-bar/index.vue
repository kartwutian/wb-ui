<template>
  <view
    v-if="show"
    :class="noticeBar"
    :style="'color:' + color + '; background-color:' + backgroundColor"
    @tap="onClick"
  >
    <van-icon
      v-if="leftIcon"
      size="32rpx"
      :name="leftIcon"
      class="van-notice-bar__left-icon"
    />
    <slot v-else name="left-icon" />

    <view class="van-notice-bar__wrap">
      <view
        :class="
          'van-notice-bar__content' +
            (!scrollable && !wrapable ? 'van-ellipsis' : '')
        "
        :animation="animationData"
      >
        {{ text }}
      </view>
    </view>

    <van-icon
      v-if="mode === 'closeable'"
      class="van-notice-bar__right-icon"
      name="cross"
      @tap="onClickIcon"
    />
    <navigator v-else-if="mode === 'link'" :url="url" :open-type="openType">
      <van-icon class="van-notice-bar__right-icon" name="arrow" />
    </navigator>
    <slot v-else name="right-icon" />
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";
import VanIcon from "../icon/index";

// import { Weapp } from 'definitions/weapp';

const FONT_COLOR = "#ed6a0c";
const BG_COLOR = "#fffbe8";

export default {
  name: "van-notice-bar",
  mixins: [basic],
  components: { VanIcon },
  props: {
    text: {
      type: String,
      default: ""
    },
    mode: {
      type: String,
      default: ""
    },
    url: {
      type: String,
      default: ""
    },
    openType: {
      type: String,
      default: "navigate"
    },
    delay: {
      type: Number,
      default: 1
    },
    speed: {
      type: Number,
      default: 50
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    leftIcon: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: FONT_COLOR
    },
    backgroundColor: {
      type: String,
      default: BG_COLOR
    },
    wrapable: Boolean
  },

  data() {
    return {
      show: true,
      animationData: {}
    };
  },

  watch: {
    text() {
      this.init();
    }
  },

  beforeCreate() {
    this.$nextTick(() => {
      this.resetAnimation = uni.createAnimation({
        duration: 0,
        timingFunction: "linear"
      });
      this.init();
    });
  },

  computed: {
    noticeBar() {
      return `${this.customClass} ${utils.bem("notice-bar", {
        withicon: this.mode,
        wrapable: this.wrapable
      })}`;
    }
  },

  destroyed() {
    this.timer && clearTimeout(this.timer);
  },

  methods: {
    init() {
      Promise.all([
        this.getRect(".van-notice-bar__content"),
        this.getRect(".van-notice-bar__wrap")
      ]).then(rects => {
        const [contentRect, wrapRect] = rects;
        if (
          contentRect == null ||
          wrapRect == null ||
          !contentRect.width ||
          !wrapRect.width
        ) {
          return;
        }

        const { speed, scrollable, delay } = this;

        if (scrollable && wrapRect.width < contentRect.width) {
          const duration = (contentRect.width / speed) * 1000;

          this.wrapWidth = wrapRect.width;
          this.contentWidth = contentRect.width;
          this.duration = duration;
          this.animation = uni.createAnimation({
            duration,
            timingFunction: "linear",
            delay
          });

          this.scroll();
        }
      });
    },

    scroll() {
      this.timer && clearTimeout(this.timer);
      this.timer = null;

      this.animationData = this.resetAnimation
        .translateX(this.wrapWidth)
        .step()
        .export();

      setTimeout(() => {
        this.animationData = this.animation
          .translateX(-this.contentWidth)
          .step()
          .export();
      }, 20);

      this.timer = setTimeout(() => {
        this.scroll();
      }, this.duration);
    },

    onClickIcon() {
      this.timer && clearTimeout(this.timer);
      this.timer = null;

      // this.setData({ show: false });
      this.show = false;
    },

    onClick(event) {
      this.$emit("click", event);
    }
  }
};
</script>

<style lang="less"></style>
