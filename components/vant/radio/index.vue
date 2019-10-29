<template>
    <wxs src="../wxs/utils.wxs" module="utils" />

<view class="van-radio custom-class">
  <view
    v-if=" labelPosition === 'left' "
    class="label-class {{ utils.bem('radio__label', [labelPosition, { disabled }]) }}"
    bindtap="onClickLabel"
  >
    <slot />
  </view>
  <view class="van-radio__icon-wrap" style="font-size: {{ iconSizeWithUnit }};" bindtap="onChange">
    <slot v-if=" useIconSlot " name="icon" />
    <van-icon
      wx:else
      name="success"
      class="{{ utils.bem('radio__icon', [shape, { disabled, checked: value === name }]) }}"
      :style=" checkedColor && !disabled && value === name ? 'border-color:' + checkedColor + '; background-color:' + checkedColor + ';' : '' "
      custom-class="icon-class"
      custom-style="line-height: {{ iconSizeWithUnit }};font-size: .8em;display: block;"
    />
  </view>
  <view
    v-if=" labelPosition === 'right' "
    class="label-class {{ utils.bem('radio__label', [labelPosition, { disabled }]) }}"
    bindtap="onClickLabel"
  >
    <slot />
  </view>
</view>

</template>

<script>
    import { VantComponent } from '../common/component';
import { Weapp } from 'definitions/weapp';
import { addUnit } from '../common/utils';

VantComponent({
  field: true,

  relation: {
    name: 'radio-group',
    type: 'ancestor',
    linked(target) {
      this.parent = target;
    },
    unlinked() {
      this.parent = null;
    }
  },

  classes: ['icon-class', 'label-class'],

  props: {
    value: null,
    disabled: Boolean,
    useIconSlot: Boolean,
    checkedColor: String,
    labelPosition: {
      type: String,
      value: 'right'
    },
    labelDisabled: Boolean,
    shape: {
      type: String,
      value: 'round'
    },
    iconSize: {
      type: null,
      observer: 'setIconSizeUnit'
    }
  },

  data: {
    iconSizeWithUnit: '20px'
  },

  methods: {
    setIconSizeUnit(val) {
      this.setData({
        iconSizeWithUnit: addUnit(val)
      });
    },

    emitChange(value: boolean) {
      const instance = this.parent || this;
      instance.$emit('input', value);
      instance.$emit('change', value);
    },

    onChange(event) {
      console.log(event);
      this.emitChange(this.data.name);
    },

    onClickLabel() {
      const { disabled, labelDisabled, name } = this.data;
      if (!disabled && !labelDisabled) {
        this.emitChange(name);
      }
    }
  }
});

</script>

<style lang="less">

</style>
