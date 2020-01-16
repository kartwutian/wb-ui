<template>
  <view :class="stepsContainerClass">
    <view class="van-step__wrapper">
      <view
        v-for="(item, index) in steps"
        :key="index"
        :class="
          $utils.bem('step', [
            direction,
            index === active ? 'process' : index < active ? 'finish' : ''
          ]) + ' van-hairline'
        "
      >
        <view
          class="van-step__title"
          :style="index === active ? 'color: ' + activeColor : ''"
        >
          <view>{{ item.text }}</view>
          <view>{{ item.desc }}</view>
        </view>
        <view class="van-step__circle-container">
          <block v-if="index !== active">
            <van-icon
              v-if="inactiveIcon"
              color="#969799"
              :name="inactiveIcon"
              custom-class="van-step__icon"
            />
            <view
              v-else
              class="van-step__circle"
              :style="index < active ? 'background-color: ' + activeColor : ''"
            />
          </block>

          <van-icon
            v-else
            :name="activeIcon"
            :color="activeColor"
            custom-class="van-step__icon"
          />
        </view>
        <view
          v-if="index !== steps.length - 1"
          class="van-step__line"
          :style="index < active ? 'background-color: ' + activeColor : ''"
        />
      </view>
    </view>
  </view>
  <!--
<wxs module="status">

</wxs> -->
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";
import { button } from "../mixins/button";
import { openType } from "../mixins/open-type";
import VanIcon from "../icon/index.vue";

import { GREEN } from "../common/color";

export default {
  name: "van-steps",
  components: { VanIcon },
  mixins: [basic, button, openType],
  props: {
    steps: Array,
    active: Number,
    direction: {
      type: String,
      default: "horizontal"
    },
    activeColor: {
      type: String,
      default: GREEN
    },
    activeIcon: {
      type: String,
      default: "checked"
    },
    inactiveIcon: String
  },
  computed: {
    stepsContainerClass() {
      // custom-class {{ utils.bem('steps', [direction]) }}
      return `${this.customClass} ${utils.bem("steps", [this.direction])}`;
    }
  }
};
</script>

<style lang="less"></style>
