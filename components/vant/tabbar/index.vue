<template>
  <view :class="tabberBorder" :style="zIndex ? 'z-index: ' + zIndex : ''">
    <slot />
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";

export default {
  name: "van-tabbar",
  mixins: [basic],
  relation: {
    name: "tabbar-item",
    type: "descendant" //祖先
  },

  props: {
    active: null,
    activeColor: String,
    inactiveColor: String,
    fixed: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 1
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    }
  },

  beforeCreate() {
    this.children = [];
  },

  watch: {
    active: "updateChildren",
    activeColor: "updateChildren",
    inactiveColor: "updateChildren"
  },

  computed: {
    tabberBorder() {
      return `${this.customClass} ${
        this.border ? "van-hairline--top-bottom" : ""
      } ${utils.bem("tabbar", {
        fixed: this.fixed,
        safe: this.safeAreaInsetBottom
      })}`;
    }
  },

  methods: {
    linked(target) {
      this.children.push(target);
      target.parent = this;
      target.updateFromParent();
    },
    unlinked(target) {
      this.children = this.children.filter(item => item !== target);
      this.updateChildren();
    },

    updateChildren() {
      const { children } = this;
      if (!Array.isArray(children) || !children.length) {
        return Promise.resolve();
      }

      return Promise.all(children.map(child => child.updateFromParent()));
    },

    onChange(child) {
      const index = this.children.indexOf(child);
      const active = child.name || index;

      if (active !== this.active) {
        this.$emit("change", active);
      }
    }
  }
};
</script>

<style lang="less"></style>
