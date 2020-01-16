<template>
  <view
    :class="sliders"
    :style="inactiveColor ? 'background:' + inactiveColor : ''"
    @tap="onClick"
  >
    <view
      class="van-slider__bar"
      :style="barStyle + (activeColor ? 'background:' + activeColor : '')"
    >
      <view
        class="van-slider__button-wrapper"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
      >
        <slot v-if="useButtonSlot" name="button" />
        <view v-else class="van-slider__button" />
      </view>
    </view>
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";
import { touch } from "../mixins/touch";
// import { Weapp } from 'definitions/weapp';
import { addUnit } from "../common/utils";

export default {
  mixins: [touch, basic],

  props: {
    disabled: Boolean,
    useButtonSlot: Boolean,
    activeColor: String,
    inactiveColor: String,
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    },
    value: {
      type: Number,
      default: 0
    },
    barHeight: {
      type: null,
      default: "4rpx"
    }
  },

  data() {
    return {
      values: 0,
      barStyle: {}
    };
  },

  watch: {
    value(value) {
      this.updateValue(value, false);
    }
  },

  computed: {
    sliders() {
      return `${this.customClass} ${utils.bem("slider", {
        disabled: this.disabled
      })}`;
    }
  },

  beforeCreate() {
    this.$nextTick(() => {
      this.values = this.value;
      this.updateValue(this.values);
    });
  },

  methods: {
    onTouchStart(event) {
      if (this.disabled) return;

      this.touchStart(event);
      this.startValue = this.format(this.value);
      this.dragStatus = "start";
    },

    onTouchMove(event) {
      if (this.disabled) return;

      if (this.dragStatus === "start") {
        this.$emit("drag-start");
      }

      this.touchMove(event);
      this.dragStatus = "draging";

      this.getRect(".van-slider").then(rect => {
        const diff = (this.deltaX / rect.width) * 100;
        this.newValue = this.startValue + diff;
        this.updateValue(this.newValue, false, true);
      });
    },

    onTouchEnd() {
      if (this.disabled) return;

      if (this.dragStatus === "draging") {
        this.updateValue(this.newValue, true);
        this.$emit("drag-end");
      }
    },

    onClick(event) {
      if (this.disabled) return;

      const { min } = this;

      this.getRect(".van-slider").then(rect => {
        const value =
          ((event.detail.x - rect.left) / rect.width) * this.getRange() + min;
        this.updateValue(value, true);
      });
    },

    updateValue(value, end, drag) {
      value = this.format(value);
      const { barHeight, min } = this;
      const width = `${((value - min) * 100) / this.getRange()}%`;

      this.values = value;
      this.barStyle = `width: ${width}; height: ${addUnit(barHeight)};${
        drag ? "transition: none;" : ""
      }`;

      if (drag) {
        this.$emit("drag", value);
      }

      if (end) {
        this.$emit("change", value);
      }
    },

    getRange() {
      const { max, min } = this;
      return max - min;
    },

    format(value) {
      const { max, min, step } = this;
      return Math.round(Math.max(min, Math.min(value, max)) / step) * step;
    }
  }
};
</script>

<style lang="less"></style>
