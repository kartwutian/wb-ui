<template>

<view class="van-checkbox custom-class">
  <view class="van-checkbox__icon-wrap" bindtap="toggle">
    <slot v-if=" useIconSlot " name="icon" />
    <van-icon
      v-else
      name="success"
      size="0.8em"
      class="{{ utils.bem('checkbox__icon', [shape, { disabled, checked: value }]) }}"
      style="font-size: {{ sizeWithUnit }};{{ checkedColor && value && !disabled ? 'border-color:' + checkedColor + '; background-color:' + checkedColor : '' }}"
      custom-class="icon-class"
      custom-style="line-height: 1.25em;"
    />
  </view>
  <view class="label-class {{ utils.bem('checkbox__label', [labelPosition, { disabled }]) }}" bindtap="onClickLabel">
    <slot />
  </view>
</view>

</template>

<script>
  import utils from '../wxs/utils';

import { addUnit } from '../common/utils';

function emit(target: WechatMiniprogram.Component.TrivialInstance, value: boolean | any[]) {
  target.$emit('input', value);
  target.$emit('change', value);
}

export default {
  field: true,

  relation: {
    name: 'checkbox-group',
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
    value: Boolean,
    disabled: Boolean,
    useIconSlot: Boolean,
    checkedColor: String,
    labelPosition: String,
    labelDisabled: Boolean,
    shape: {
      type: String,
      value: 'round'
    },
    iconSize: {
      type: null,
      observer: 'setSizeWithUnit'
    }
  },

  data: {
    sizeWithUnit: '20px'
  },

  methods: {
    emitChange(value: boolean) {
      if (this.parent) {
        this.setParentValue(this.parent, value);
      } else {
        emit(this, value);
      }
    },

    toggle() {
      const { disabled, value } = this.data;
      if (!disabled) {
        this.emitChange(!value);
      }
    },

    onClickLabel() {
      const { labelDisabled, disabled, value } = this.data;
      if (!disabled && !labelDisabled) {
        this.emitChange(!value);
      }
    },

    setParentValue(parent: WechatMiniprogram.Component.TrivialInstance, value: boolean) {
      const parentValue = parent.data.value.slice();
      const { name } = this.data;
      const { max } = parent.data;

      if (value) {
        if (max && parentValue.length >= max) {
          return;
        }

        if (parentValue.indexOf(name) === -1) {
          parentValue.push(name);
          emit(parent, parentValue);
        }
      } else {
        const index = parentValue.indexOf(name);
        if (index !== -1) {
          parentValue.splice(index, 1);
          emit(parent, parentValue);
        }
      }
    },

    setSizeWithUnit(size: string | number): void {
      this.set({
        sizeWithUnit: addUnit(size)
      });
    },
  }
};

</script>

<style lang="less">

</style>
