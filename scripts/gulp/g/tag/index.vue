<template>
    <wxs src="../wxs/utils.wxs" module="utils" />

<view
  class="custom-class {{ utils.bem('tag', [type, size, { mark, plain, round }]) }} {{ plain ? 'van-hairline--surround' : '' }}"
  style="{{ color && !plain ? 'background-color: ' + color + ';' : '' }}{{ textColor || (color && plain) ? 'color: ' + (textColor || color) : '' }}"
>
  <slot />
</view>

</template>

<script>
    import { VantComponent } from '../common/component';

VantComponent({
  props: {
    size: String,
    mark: Boolean,
    color: String,
    plain: Boolean,
    round: Boolean,
    textColor: String,
    type: {
      type: String,
      value: 'default'
    }
  }
});

</script>

<style lang="less">

</style>
