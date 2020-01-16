<template>
  <view :class="'van-submit-bar ' + customClass">
    <slot name="top" />

    <view class="van-submit-bar__tip">
      <van-icon
        v-if="tipIcon"
        size="24rpx"
        :name="tipIcon"
        custom-class="van-submit-bar__tip-icon"
      />
      <view v-if="hasTip" class="van-submit-bar__tip-text">
        {{ tip }}
      </view>
      <slot name="tip" />
    </view>

    <view :class="barCount">
      <slot />
      <view v-if="hasPrice" class="van-submit-bar__text">
        <text>{{ label || "合计：" }}</text>
        <text class="van-submit-bar__price price-class">
          <text class="van-submit-bar__currency">{{ currency }} </text>
          <text>{{ priceStr }}</text>
        </text>
        <text class="van-submit-bar__suffix-label">{{ suffixLabel }}</text>
      </view>
      <van-button
        square
        size="large"
        :type="buttonType"
        :loading="loading"
        :disabled="disabled"
        class="van-submit-bar__button"
        custom-class="button-class"
        @tap="onSubmit"
      >
        {{ loading ? "" : buttonText }}
      </van-button>
    </view>
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";
import VanIcon from "../icon/index";
import VanButton from "../button/index";
// import { Weapp } from 'definitions/weapp';

export default {
  name: "van-submit-bar",
  components: { VanButton, VanIcon },
  mixins: [basic],
  // classes: [
  //   'bar-class',
  //   'price-class',
  //   'button-class'
  // ],

  props: {
    tip: {
      type: null
      // observer: 'updateTip'
    },
    tipIcon: String,
    type: Number,
    price: {
      type: null
      // observer: 'updatePrice'
    },
    label: String,
    loading: Boolean,
    disabled: Boolean,
    buttonText: String,
    currency: {
      type: String,
      default: "¥"
    },
    buttonType: {
      type: String,
      default: "danger"
    },
    decimalLength: {
      type: Number,
      default: 2
      // observer: 'updatePrice'
    },
    suffixLabel: String,
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    barClass: {
      type: String,
      default: ""
    },
    priceClass: {
      type: String,
      default: ""
    },
    buttonClass: {
      type: String,
      default: ""
    }
  },

  computed: {
    // bar-class {{ utils.bem('submit-bar__bar', { safe: safeAreaInsetBottom }) }}
    barCount() {
      return `bar-class ${utils.bem("submit-bar__bar", {
        safe: this.safeAreaInsetBottom
      })}`;
    },
    hasPrice() {
      return typeof this.price === "number" || typeof this.price === "string";
    },

    priceStr() {
      return (this.price / 100).toFixed(this.decimalLength);
    },
    hasTip() {
      return typeof this.tip === "string";
    }
  },

  methods: {
    onSubmit(val) {
      this.$emit("submit", this.price);
    }
  }
};
</script>

<style lang="less"></style>
