<template>
    <wxs src="../wxs/utils.wxs" module="utils" />

<view class="custom-class {{ utils.bem('steps', [direction]) }}">
  <view class="van-step__wrapper">
    <view
      v-for=" steps "
      :key="index"
      class="{{ utils.bem('step', [direction, status(index, active)]) }} van-hairline"
    >
      <view class="van-step__title" :style=" index === active ? 'color: ' + activeColor : '' ">
        <view>{{ item.text }}</view>
        <view>{{ item.desc }}</view>
      </view>
      <view class="van-step__circle-container">
        <block v-if=" index !== active ">
          <van-icon
            v-if=" inactiveIcon "
            color="#969799"
            :name=" inactiveIcon "
            custom-class="van-step__icon"
          />
          <view
            wx:else
            class="van-step__circle"
            :style=" index < active ? 'background-color: ' + activeColor : '' "
          />
        </block>

        <van-icon wx:else :name=" activeIcon " :color=" activeColor " custom-class="van-step__icon" />
      </view>
      <view
        v-if=" index !== steps.length - 1 "
        class="van-step__line" :style=" index < active ? 'background-color: ' + activeColor : '' "
      />
    </view>
  </view>
</view>

<wxs module="status">
function get(index, active) {
  if (index < active) {
    return 'finish';
  } else if (index === active) {
    return 'process';
  }

  return '';
}

module.exports = get;
</wxs>

</template>

<script>
    import { VantComponent } from '../common/component';
import { GREEN } from '../common/color';

VantComponent({
  props: {
    icon: String,
    steps: Array,
    active: Number,
    direction: {
      type: String,
      value: 'horizontal'
    },
    activeColor: {
      type: String,
      value: GREEN
    },
    activeIcon: {
      type: String,
      value: 'checked'
    },
    inactiveIcon: String
  }
});

</script>

<style lang="less">

</style>
