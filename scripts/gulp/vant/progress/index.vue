<template>
    <wxs src="./index.wxs" module="getters" />

<view
  class="van-progress custom-class"
  style="height: {{ strokeWidthUnit }}; {{ trackColor ? 'background: ' + trackColor : '' }}"
>
  <view
    class="van-progress__portion"
    style="width: {{ percentage }}%; background: {{ inactive ? '#cacaca' : color }}"
  >
    <view
      wx:if="{{ showPivot && getters.text(pivotText, percentage) }}"
      style="color: {{ textColor }}; background: {{ pivotColor ? pivotColor : inactive ? '#cacaca' : color }}"
      class="van-progress__pivot"
    >
      {{ getters.text(pivotText, percentage) }}
    </view>
  </view>
</view>

</template>

<script>
    import { VantComponent } from '../common/component';
import { BLUE } from '../common/color';
import { addUnit } from '../common/utils';

VantComponent({
  props: {
    inactive: Boolean,
    percentage: Number,
    pivotText: String,
    pivotColor: String,
    trackColor: String,
    showPivot: {
      type: Boolean,
      value: true
    },
    color: {
      type: String,
      value: BLUE
    },
    textColor: {
      type: String,
      value: '#fff'
    },
    strokeWidth: {
      type: null,
      observer: 'setStrokeWidthUnit'
    }
  },

  data: {
    strokeWidthUnit: '4px'
  },

  methods: {
    setStrokeWidthUnit(val) {
      this.setData({
        strokeWidthUnit: addUnit(val)
      });
    }
  }
});

</script>

<style lang="less">

</style>
