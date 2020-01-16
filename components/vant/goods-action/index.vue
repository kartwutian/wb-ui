<template>
  <view :class="goodsAction">
    <slot />
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";

export default {
  name: "van-goods-action",
  mixins: [basic],
  relation: {
    type: "descendant",
    name: "goods-action-button"
  },
  beforeCreate() {
    this.children = [];
  },
  props: {
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    goodsAction() {
      // custom-class {{ utils.bem('goods-action', { safe: safeAreaInsetBottom }) }}
      return `${this.customClass} ${utils.bem("goods-action", {
        safe: this.safeAreaInsetBottom
      })}`;
    }
  },
  methods: {
    linked(child) {
      this.children.push(child);
    },
    unlinked(child) {
      this.children = this.children.filter(item => item !== child);
    }
  }
};
</script>

<style lang="less"></style>
