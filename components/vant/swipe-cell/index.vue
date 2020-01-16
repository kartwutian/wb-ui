<template>
  <view
    class="van-swipe-cell"
    @tap="onClick({ key: 'cell' })"
    @touchstart="startDrag"
    :catchtouchmove="catchMove ? 'noop' : ''"
    @touchmove="onDrag"
    @touchend="endDrag"
    @touchcancel="endDrag"
  >
    <view :style="wrapperStyle">
      <view
        v-if="leftWidth"
        class="van-swipe-cell__left"
        @tap.stop="onClick({ key: 'left' })"
      >
        <slot name="left" />
      </view>
      <slot />
      <view
        v-if="rightWidth"
        class="van-swipe-cell__right"
        @tap.stop="onClick({ key: 'right' })"
      >
        <slot name="right" />
      </view>
    </view>
  </view>
</template>

<script>
import { touch } from "../mixins/touch";
// import { Weapp } from 'definitions/weapp';

const THRESHOLD = 0.3;
let ARRAY = [];

export default {
  name: "van-swipe-cell",
  props: {
    disabled: Boolean,
    leftWidth: {
      type: Number,
      default: 0
    },
    rightWidth: {
      type: Number,
      default: 0
    },
    asyncClose: Boolean,
    name: {
      type: [Number, String],
      default: ""
    }
  },

  mixins: [touch],

  data() {
    return {
      catchMove: false,
      wrapperStyle: ""
    };
  },

  beforeCreate() {
    this.$nextTick(() => {
      this.offset = 0;
      ARRAY.push(this);
    });
  },

  destroyed() {
    ARRAY = ARRAY.filter(item => item !== this);
  },

  methods: {
    open(position) {
      const { leftWidth, rightWidth } = this;
      const offset = position === "left" ? leftWidth : -rightWidth;
      this.swipeMove(offset);
    },

    close() {
      this.swipeMove(0);
    },

    swipeMove(offset) {
      this.offset = offset;

      const transform = `translate3d(${offset}px, 0, 0)`;
      const transition = this.draging
        ? "none"
        : "transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)";

      this.wrapperStyle = `-webkit-transform:${transform}; -webkit-transition:${transition}; transform:${transform}; transition${transition}`;
    },

    swipeLeaveTransition() {
      const { leftWidth, rightWidth } = this;
      const { offset } = this;

      if (rightWidth > 0 && -offset > rightWidth * THRESHOLD) {
        this.open("right");
      } else if (leftWidth > 0 && offset > leftWidth * THRESHOLD) {
        this.open("left");
      } else {
        this.swipeMove(0);
      }
      this.catchMove = false;
    },

    startDrag(event) {
      if (this.disabled) {
        return;
      }

      ARRAY.forEach(item => {
        if (item !== this) {
          item.close();
        }
      });

      this.draging = true;
      this.startOffset = this.offset;
      this.firstDirection = "";
      this.touchStart(event);
    },

    noop() {},

    onDrag(event) {
      if (this.disabled) {
        return;
      }

      this.touchMove(event);

      if (!this.firstDirection) {
        this.firstDirection = this.direction;
        this.catchMove = this.firstDirection === "horizontal";
      }

      if (this.firstDirection === "vertical") {
        return;
      }

      const { leftWidth, rightWidth } = this;

      const offset = this.startOffset + this.deltaX;

      if (
        (rightWidth > 0 && -offset > rightWidth) ||
        (leftWidth > 0 && offset > leftWidth)
      ) {
        return;
      }

      this.swipeMove(offset);
    },

    endDrag() {
      if (this.disabled) {
        return;
      }

      this.draging = false;
      this.swipeLeaveTransition();
    },

    onClick(event) {
      const { key: position = "outside" } = event;
      this.$emit("click", position);

      if (!this.offset) {
        return;
      }

      if (this.asyncClose) {
        this.$emit("close", { position, instance: this, name: this.name });
      } else {
        this.swipeMove(0);
      }
    }
  }
};
</script>

<style lang="less"></style>
