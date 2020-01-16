<template>
  <view :class="'van-loading ' + (vertical ? 'van-loading--vertical' : '')">
    <view
      :class="'van-loading__wrapper ' + customClass"
      :style="'width: ' + sizeWithUnit + '; height: ' + sizeWithUnit + ';'"
    >
      <view
        :class="'van-loading__spinner van-loading__spinner--' + type"
        :style="'color: ' + color + ';'"
      >
        <view
          v-if="type === 'spinner'"
          v-for="(item, index) in 12"
          :key="index"
          class="van-loading__dot"
        />
      </view>
    </view>
    <view
      :style="'font-size: ' + textSizeWithUnit + ';'"
      :class="
        'van-loading__text ' + (vertical ? 'van-loading__text--vertical' : '')
      "
    >
      <slot />
    </view>
  </view>
</template>

<script>
import { basic } from "../mixins/basic";
import { addUnit } from "../common/utils";

export default {
  name: "van-loading",
  mixins: [basic],
  props: {
    size: {
      type: String,
      default: "60rpx"
    },
    type: {
      type: String,
      default: "circular"
    },
    color: {
      type: String,
      default: "#c9c9c9"
    },
    textSize: {
      type: String,
      default: "28rpx"
    },
    vertical: Boolean
  },

  computed: {
    sizeWithUnit() {
      return addUnit(this.size);
    },
    textSizeWithUnit() {
      return addUnit(this.textSize);
    }
  }
};
</script>

<style lang="less"></style>
