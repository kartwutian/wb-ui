<template>
    <wxs src="../wxs/utils.wxs" module="utils" />

<view
  class="custom-class {{ utils.bem('cell', [size, { center, required, borderless: !border, clickable: isLink || clickable }]) }}"
  hover-class="van-cell--hover hover-class"
  hover-stay-time="70"
  :style=" customStyle "
  @tap="onClick"
>
  <van-icon
    v-if=" icon "
    :name=" icon "
    class="van-cell__left-icon-wrap"
    custom-class="van-cell__left-icon"
  />
  <slot wx:else name="icon" />

  <view
    :style=" titleWidth ? 'max-width:' + titleWidth + ';min-width:' + titleWidth : '' "
    class="van-cell__title title-class"
  >
    <block v-if=" title ">{{ title }}</block>
    <slot wx:else name="title" />

    <view v-if=" label || useLabelSlot " class="van-cell__label label-class">
      <slot v-if=" useLabelSlot " name="label" />
      <block v-else-if=" label ">{{ label }}</block>
    </view>
  </view>

  <view class="van-cell__value value-class">
    <block v-if=" value || value === 0 ">{{ value }}</block>
    <slot wx:else />
  </view>

  <van-icon
    v-if=" isLink "
    :name=" arrowDirection ? 'arrow' + '-' + arrowDirection : 'arrow' "
    class="van-cell__right-icon-wrap right-icon-class"
    custom-class="van-cell__right-icon"
  />
  <slot wx:else name="right-icon" />

  <slot name="extra" />
</view>

</template>

<script>
    import { link } from '../mixins/link';
import { VantComponent } from '../common/component';
import { Weapp } from 'definitions/weapp';

VantComponent({
  classes: [
    'title-class',
    'label-class',
    'value-class',
    'right-icon-class',
    'hover-class'
  ],

  mixins: [link],

  props: {
    title: null,
    value: null,
    icon: String,
    size: String,
    label: String,
    center: Boolean,
    isLink: Boolean,
    required: Boolean,
    clickable: Boolean,
    titleWidth: String,
    customStyle: String,
    arrowDirection: String,
    useLabelSlot: Boolean,
    border: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    onClick(event: Weapp.Event) {
      this.$emit('click', event.detail);
      this.jumpLink();
    }
  }
});

</script>

<style lang="less">

</style>
