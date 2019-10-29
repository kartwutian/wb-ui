<template>
    <wxs src="../wxs/utils.wxs" module="utils" />

<view class="custom-class {{ utils.bem('goods-action', { safe: safeAreaInsetBottom }) }}">
  <slot />
</view>

</template>

<script>
    import { VantComponent } from '../common/component';

VantComponent({
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
});

</script>

<style lang="less">

</style>
