<template>
  <view class="van-circle">
    <canvas
      class="van-circle__canvas"
      :style="style"
      canvas-id="van-circle"
    ></canvas>
    <view v-if="!text" class="van-circle__text">
      <slot></slot>
    </view>
    <cover-view v-else class="van-circle__text">{{ text }}</cover-view>
  </view>
</template>

<script>
import { isObj } from "../common/utils";
import { BLUE, WHITE } from "../common/color";

function format(rate) {
  return Math.min(Math.max(rate, 0), 100);
}

const PERIMETER = 2 * Math.PI;
const BEGIN_ANGLE = -Math.PI / 2;
const STEP = 1;

export default {
  name: "van-circle",
  props: {
    text: {
      type: String,
      default: ""
    },
    lineCap: {
      type: String,
      default: "round"
    },
    value: {
      type: Number,
      default: 0
    },
    speed: {
      type: Number,
      default: 50
    },
    size: {
      type: Number,
      default: 100
    },
    fill: {
      type: String,
      default: "transparent"
    },
    layerColor: {
      type: String,
      default: WHITE
    },
    color: {
      type: String | Object,
      default: BLUE
    },
    strokeWidth: {
      type: Number,
      default: 4
    },
    clockwise: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      style: "width: 200rpx; height: 200rpx;",
      hoverColor: BLUE
    };
  },

  methods: {
    getContext() {
      if (!this.ctx) {
        this.ctx = uni.createCanvasContext("van-circle", this);
      }
      return this.ctx;
    },

    setHoverColor() {
      const context = this.getContext();
      const { color, size } = this;
      let hoverColor = color;

      if (isObj(color)) {
        const LinearColor = context.createLinearGradient(size, 0, 0, 0);
        Object.keys(color)
          .sort((a, b) => parseFloat(a) - parseFloat(b))
          .map(key =>
            LinearColor.addColorStop(parseFloat(key) / 100, color[key])
          );
        hoverColor = LinearColor;
      }

      this.hoverColor = hoverColor;
    },

    setStyle() {
      const { size } = this;
      const style = `width: ${size}px; height: ${size}px;`;

      this.style = style;
    },

    presetCanvas(context, strokeStyle, beginAngle, endAngle, fill) {
      const { strokeWidth, lineCap, clockwise, size } = this;
      const position = size / 2;
      const radius = position - strokeWidth / 2;

      context.setStrokeStyle(strokeStyle);
      context.setLineWidth(strokeWidth);
      context.setLineCap(lineCap);
      context.beginPath();
      context.arc(position, position, radius, beginAngle, endAngle, !clockwise);
      context.stroke();

      if (fill) {
        context.setFillStyle(fill);
        context.fill();
      }
    },

    renderLayerCircle(context) {
      const { layerColor, fill } = this;
      this.presetCanvas(context, layerColor, 0, PERIMETER, fill);
    },

    renderHoverCircle(context, formatValue) {
      const { clockwise, hoverColor } = this;
      // 结束角度
      const progress = PERIMETER * (formatValue / 100);
      const endAngle = clockwise
        ? BEGIN_ANGLE + progress
        : 3 * Math.PI - (BEGIN_ANGLE + progress);

      this.presetCanvas(context, hoverColor, BEGIN_ANGLE, endAngle);
    },

    drawCircle(currentValue) {
      const context = this.getContext();
      const { size } = this;
      context.clearRect(0, 0, size, size);
      this.renderLayerCircle(context);

      const formatValue = format(currentValue);
      if (formatValue !== 0) {
        this.renderHoverCircle(context, formatValue);
      }

      context.draw();
    },

    reRender() {
      // tofector 动画暂时没有想到好的解决方案
      const { value, speed } = this;

      if (speed <= 0 || speed > 1000) {
        this.drawCircle(value);
        return;
      }

      this.clearInterval();
      this.currentValue = this.currentValue || 0;
      this.interval = setInterval(() => {
        if (this.currentValue !== value) {
          if (this.currentValue < value) {
            this.currentValue += STEP;
          } else {
            this.currentValue -= STEP;
          }
          this.drawCircle(this.currentValue);
        } else {
          this.clearInterval();
        }
      }, 1000 / speed);
    },

    clearInterval() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }
  },

  watch: {
    color: "setHoverColor",
    size: "setStyle",
    value: "reRender"
  },

  mounted() {
    const { value } = this;
    this.currentValue = value;

    setTimeout(() => {
      this.drawCircle(value);
    }, 16.7);
  },

  destroyed() {
    this.ctx = null;
    this.clearInterval();
  }
};
</script>

<style lang="less"></style>
