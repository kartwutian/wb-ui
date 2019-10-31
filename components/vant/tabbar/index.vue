<template>

<view
  class="custom-class {{ border ? 'van-hairline--top-bottom' : '' }} {{ utils.bem('tabbar', { fixed, safe: safeAreaInsetBottom }) }}"
  :style=" zIndex ? 'z-index: ' + zIndex : '' "
>
  <slot />
</view>

</template>

<script>
  import utils from '../wxs/utils';


export default {
  relation: {
    name: 'tabbar-item',
    type: 'descendant',
    linked(target) {
      this.children.push(target);
      target.parent = this;
      target.updateFromParent();
    },
    unlinked(target) {
      this.children = this.children.filter(
        (item: WechatMiniprogram.Component.TrivialInstance) => item !== target
      );
      this.updateChildren();
    }
  },

  props: {
    active: {
      type: null,
      observer: 'updateChildren'
    },
    activeColor: {
      type: String,
      observer: 'updateChildren'
    },
    inactiveColor: {
      type: String,
      observer: 'updateChildren'
    },
    fixed: {
      type: Boolean,
      value: true
    },
    border: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 1
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  },

  beforeCreate() {
    this.children = [];
  },

  methods: {
    updateChildren() {
      const { children } = this;
      if (!Array.isArray(children) || !children.length) {
        return Promise.resolve();
      }

      return Promise.all(
        children.map((child: WechatMiniprogram.Component.TrivialInstance) => child.updateFromParent())
      );
    },

    onChange(child: WechatMiniprogram.Component.TrivialInstance) {
      const index = this.children.indexOf(child);
      const active = child.data.name || index;

      if (active !== this.data.active) {
        this.$emit('change', active);
      }
    }
  }
};

</script>

<style lang="less">

</style>
