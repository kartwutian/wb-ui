<template>

<view class="van-submit-bar custom-class">
  <slot name="top" />

  <view class="van-submit-bar__tip">
    <van-icon
      v-if=" tipIcon "
      size="12px"
      :name=" tipIcon "
      custom-class="van-submit-bar__tip-icon"
    />
    <view v-if=" hasTip " class="van-submit-bar__tip-text">
      {{ tip }}
    </view>
    <slot name="tip" />
  </view>

  <view class="bar-class {{ utils.bem('submit-bar__bar', { safe: safeAreaInsetBottom }) }}">
    <slot />
    <view v-if=" hasPrice " class="van-submit-bar__text">
      <text>{{ label || '合计：' }}</text>
      <text class="van-submit-bar__price price-class">
        <text class="van-submit-bar__currency">{{ currency }} </text>
        <text>{{ priceStr }}</text>
      </text>
      <text class="van-submit-bar__suffix-label">{{ suffixLabel }}</text>
    </view>
    <van-button
      square
      size="large"
      :type=" buttonType "
      :loading=" loading "
      :disabled=" disabled "
      class="van-submit-bar__button"
      custom-class="button-class"
      @click="onSubmit"
    >
      {{ loading ? '' : buttonText }}
    </van-button>
  </view>
</view>

</template>

<script>
  import utils from '../wxs/utils';

import { Weapp } from 'definitions/weapp';

export default {
  classes: [
    'bar-class',
    'price-class',
    'button-class'
  ],

  props: {
    tip: {
      type: null,
      observer: 'updateTip'
    },
    tipIcon: String,
    type: Number,
    price: {
      type: null,
      observer: 'updatePrice'
    },
    label: String,
    loading: Boolean,
    disabled: Boolean,
    buttonText: String,
    currency: {
      type: String,
      value: '¥'
    },
    buttonType: {
      type: String,
      value: 'danger'
    },
    decimalLength: {
      type: Number,
      value: 2,
      observer: 'updatePrice'
    },
    suffixLabel: String,
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    updatePrice() {
      const { price, decimalLength } = this.data;
      this.setData({
        hasPrice: typeof price === 'number',
        priceStr: (price / 100).toFixed(decimalLength)
      });
    },

    updateTip() {
      this.setData({ hasTip: typeof this.data.tip === 'string' });
    },

    onSubmit(event) {
      this.$emit('submit', event.detail);
    }
  }
};

</script>

<style lang="less">

</style>
