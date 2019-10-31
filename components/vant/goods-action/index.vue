<template>

<view class="custom-class {{ utils.bem('goods-action', { safe: safeAreaInsetBottom }) }}">
  <slot />
</view>

</template>

<script>
  import utils from '../wxs/utils';


export default {
  relation: {
    type: 'descendant',
    name: 'goods-action-button',
    linked(child) {
      this.children.push(child);
    },
    unlinked(child) {
      this.children = this.children.filter((item) => item !== child);
    }
  },
  beforeCreate() {
    this.children = [];
  },
  props: {
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  }
};

</script>

<style lang="less">

</style>
