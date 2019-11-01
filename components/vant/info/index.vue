<template>

<view
  v-if=" info !== null && info !== '' || dot "
  :class="classes"
  :style=" customStyle "
>{{ dot ? '' : info }}</view>

</template>

<script>
    import utils from '../wxs/utils';
    import { basic } from '../mixins/basic';

export default {
  name: 'van-info',
  mixins: [basic],
  props: {
    dot: Boolean,
    info: null,
    customStyle: String
  },
  computed: {
    classes(){
      return `${this.customClass} van-info ${utils.bem('info', { dot: this.dot })}`
    }
  }
};

</script>

<style lang="less">

</style>
