<template>
    <wxs src="../wxs/utils.wxs" module="utils" />

<view
  class="custom-class {{ utils.bem('divider', [{dashed, hairline}, contentPosition]) }}"
  style="{{ borderColor  ? 'border-color: ' + borderColor + ';' : '' }}{{ textColor ? 'color: ' + textColor + ';' : '' }} {{ fontSize ? 'font-size: ' + fontSize + 'px;' : '' }} {{ customStyle }}"
>
  <slot />
</view>

</template>

<script>
    import { VantComponent } from '../common/component';

VantComponent({
  props: {
    dashed: {
      type: Boolean,
      value: false
    },
    hairline: {
      type: Boolean,
      value: false
    },
    contentPosition: {
      type: String,
      value: ''
    },
    fontSize: {
      type: Number,
      value: ''
    },
    borderColor: {
      type: String,
      value: ''
    },
    textColor: {
      type: String,
      value: ''
    },
    customStyle: {
      type: String,
      value: ''
    }
  }
});

</script>

<style lang="less">

</style>
