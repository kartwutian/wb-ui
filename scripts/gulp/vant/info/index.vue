<template>
    <wxs src="../wxs/utils.wxs" module="utils" />

<view
  wx:if="{{ info !== null && info !== '' || dot }}"
  class="custom-class van-info {{ utils.bem('info', { dot }) }}"
  style="{{ customStyle }}"
>{{ dot ? '' : info }}</view>

</template>

<script>
    import { VantComponent } from '../common/component';

VantComponent({
  props: {
    dot: Boolean,
    info: null,
    customStyle: String
  }
});

</script>

<style lang="less">

</style>
