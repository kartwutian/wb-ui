<template>

<view
  v-if=" info !== null && info !== '' || dot "
  class="custom-class van-info {{ utils.bem('info', { dot }) }}"
  :style=" customStyle "
>{{ dot ? '' : info }}</view>

</template>

<script>
    import utils from '../wxs/utils';


export default {
  props: {
    dot: Boolean,
    info: null,
    customStyle: String
  }
};

</script>

<style lang="less">

</style>
