<template>

<view
  v-if=" show "
  class="custom-class {{ utils.bem('notice-bar', { withicon: mode, wrapable }) }}"
  style="color: {{ color }}; background-color: {{ backgroundColor }};"
  @tap="onClick"
>
  <van-icon
    v-if=" leftIcon "
    size="16px"
    :name=" leftIcon "
    class="van-notice-bar__left-icon"
  />
  <slot v-else name="left-icon" />

  <view class="van-notice-bar__wrap">
    <view class="van-notice-bar__content {{ !scrollable && !wrapable ? 'van-ellipsis' : '' }}" :animation=" animationData ">
      {{ text }}
    </view>
  </view>

  <van-icon
    v-if=" mode === 'closeable' "
    class="van-notice-bar__right-icon"
    name="cross"
    @tap="onClickIcon"
  />
  <navigator
    v-else-if=" mode === 'link' "
    :url=" url "
    :open-type=" openType "
  >
    <van-icon class="van-notice-bar__right-icon" name="arrow" />
  </navigator>
  <slot v-else name="right-icon" />
</view>

</template>

<script>
  import utils from '../wxs/utils';

import { Weapp } from 'definitions/weapp';

const FONT_COLOR = '#ed6a0c';
const BG_COLOR = '#fffbe8';

export default {
  props: {
    text: {
      type: String,
      value: ''
    },
    mode: {
      type: String,
      value: ''
    },
    url: {
      type: String,
      value: ''
    },
    openType: {
      type: String,
      value: 'navigate'
    },
    delay: {
      type: Number,
      value: 1
    },
    speed: {
      type: Number,
      value: 50
    },
    scrollable: {
      type: Boolean,
      value: true
    },
    leftIcon: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: FONT_COLOR
    },
    backgroundColor: {
      type: String,
      value: BG_COLOR
    },
    wrapable: Boolean
  },

  data: {
    show: true
  },

  watch: {
    text() {
      this.setData({}, this.init);
    }
  },

  created() {
    this.resetAnimation = wx.createAnimation({
      duration: 0,
      timingFunction: 'linear'
    });
  },

  destroyed() {
    this.timer && clearTimeout(this.timer);
  },

  methods: {
    init() {
      Promise.all([
        this.getRect('.van-notice-bar__content'),
        this.getRect('.van-notice-bar__wrap')
      ]).then((rects: WechatMiniprogram.BoundingClientRectCallbackResult[]) => {
        const [contentRect, wrapRect] = rects;
        if (
          contentRect == null ||
          wrapRect == null ||
          !contentRect.width ||
          !wrapRect.width
        ) {
          return;
        }

        const { speed, scrollable, delay } = this.data;

        if (scrollable && wrapRect.width < contentRect.width) {
          const duration = (contentRect.width / speed) * 1000;

          this.wrapWidth = wrapRect.width;
          this.contentWidth = contentRect.width;
          this.duration = duration;
          this.animation = wx.createAnimation({
            duration,
            timingFunction: 'linear',
            delay
          });

          this.scroll();
        }
      });
    },

    scroll() {
      this.timer && clearTimeout(this.timer);
      this.timer = null;

      this.setData({
        animationData: this.resetAnimation
          .translateX(this.wrapWidth)
          .step()
          .export()
      });

      setTimeout(() => {
        this.setData({
          animationData: this.animation
            .translateX(-this.contentWidth)
            .step()
            .export()
        });
      }, 20);

      this.timer = setTimeout(() => {
        this.scroll();
      }, this.duration);
    },

    onClickIcon() {
      this.timer && clearTimeout(this.timer);
      this.timer = null;

      this.setData({ show: false });
    },

    onClick(event) {
      this.$emit('click', event);
    }
  }
};

</script>

<style lang="less">

</style>
