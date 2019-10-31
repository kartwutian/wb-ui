<template>

<view
  class="custom-class {{ utils.bem('col', [span]) }} {{ offset ? 'van-col--offset-' + offset : '' }}"
  :style=" style "
>
  <slot />
</view>

</template>

<script>
  import utils from '../wxs/utils';


export default {
  relation: {
    name: 'row',
    type: 'ancestor'
  },

  props: {
    span: Number,
    offset: Number
  },

  data: {
    style: ''
  },

  methods: {
    setGutter(gutter: number) {
      const padding = `${gutter / 2}px`;
      const style = gutter ? `padding-left: ${padding}; padding-right: ${padding};` : '';

      if (style !== this.data.style) {
        this.setData({ style });
      }
    }
  }
};

</script>

<style lang="less">

</style>
