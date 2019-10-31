<template>

<view
  class="van-rate custom-class"
  @touchmove="onTouchMove"
>
  <view
    class="van-rate__item"
    v-for=" count "
    :key="index"
    style="font-size: {{ sizeWithUnit }};padding-right: {{ index !== count - 1 ? gutterWithUnit : '' }}"
  >
    <van-icon
      :name=" index + 1 <= innerValue ? icon : voidIcon "
      class="van-rate__icon"
      custom-class="icon-class"
      :data-score=" index "
      :color=" disabled ? disabledColor : index + 1 <= innerValue ? color : voidColor "
      @click="onSelect"
    />

    <van-icon
      v-if=" allowHalf "
      :name=" index + 0.5 <= innerValue ? icon : voidIcon "
      :class=" utils.bem('rate__icon', ['half']) "
      custom-class="icon-class"
      :data-score=" index - 0.5 "
      :color=" disabled ? disabledColor : index + 0.5 <= innerValue ? color : voidColor "
      @click="onSelect"
    />
  </view>
</view>

</template>

<script>
  import utils from '../wxs/utils';

import { Weapp } from 'definitions/weapp';
import { addUnit } from '../common/utils';

export default {
  field: true,

  classes: ['icon-class'],

  props: {
    value: Number,
    readonly: Boolean,
    disabled: Boolean,
    allowHalf: Boolean,
    size: {
      type: null,
      observer: 'setSizeWithUnit'
    },
    icon: {
      type: String,
      value: 'star'
    },
    voidIcon: {
      type: String,
      value: 'star-o'
    },
    color: {
      type: String,
      value: '#ffd21e'
    },
    voidColor: {
      type: String,
      value: '#c7c7c7'
    },
    disabledColor: {
      type: String,
      value: '#bdbdbd'
    },
    count: {
      type: Number,
      value: 5
    },
    gutter: {
      type: null,
      observer: 'setGutterWithUnit'
    },
    touchable: {
      type: Boolean,
      value: true
    }
  },

  data: {
    innerValue: 0,
    gutterWithUnit: undefined,
    sizeWithUnit: '20px'
  },

  watch: {
    value(value: number) {
      if (value !== this.data.innerValue) {
        this.setData({ innerValue: value });
      }
    }
  },

  methods: {
    setSizeWithUnit(val) {
      this.setData({
        sizeWithUnit: addUnit(val)
      });
    },

    setGutterWithUnit(val) {
      this.setData({
        gutterWithUnit: addUnit(val)
      });
    },

    onSelect(event) {
      const { data } = this;
      const { score } = event.currentTarget.dataset;
      if (!data.disabled && !data.readonly) {
        this.setData({ innerValue: score + 1 });
        this.$emit('input', score + 1);
        this.$emit('change', score + 1);
      }
    },

    onTouchMove(event: Weapp.TouchEvent) {
      const { touchable } = this.data;
      if (!touchable) return;

      const { clientX } = event.touches[0];

      this.getRect('.van-rate__icon', true).then(
        (list: WechatMiniprogram.BoundingClientRectCallbackResult[]) => {
          const target = list
            .sort(item => item.right - item.left)
            .find(item => clientX >= item.left && clientX <= item.right);
          if (target != null) {
            this.onSelect({
              ...event,
              currentTarget: target
            });
          }
        }
      );
    }
  }
};

</script>

<style lang="less">

</style>
