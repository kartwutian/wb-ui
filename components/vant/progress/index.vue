<template>
  <view
    :class="'van-progress ' + customClass"
    :style="[
      { height: strokeWidthUnit },
      trackColor ? 'background: ' + trackColor : ''
    ]"
  >
    <view
      class="van-progress__portion"
      :style="[
        { width: percentage + '%' },
        { background: inactive ? '#cacaca' : color }
      ]"
    >
      <view
        v-if="showPivot"
        class="van-progress__pivot"
        :style="[
          { color: textColor },
          { background: pivotColor ? pivotColor : inactive ? '#cacaca' : color }
        ]"
      >
        {{ showText }}
      </view>
    </view>
  </view>
</template>

<script>
import { basic } from "../mixins/basic";
import { BLUE } from "../common/color";
import { addUnit } from "../common/utils";

export default {
  name: "van-progress",
  mixins: [basic],
  props: {
    inactive: {
      type: Boolean,
      default: false
    },
    percentage: Number,
    pivotText: String,
    pivotColor: String,
    trackColor: String,
    showPivot: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: BLUE
    },
    textColor: {
      type: String,
      default: "#fff"
    },
    strokeWidth: {
      type: Number,
      default: 4
    }
  },

  data() {
    return {};
  },
  computed: {
    showText() {
      return this.pivotText || this.percentage + "%";
    },
    strokeWidthUnit() {
      return this.strokeWidth + "px";
    }
  },
  methods: {}
};
</script>

<style lang="less"></style>
