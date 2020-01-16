<template>
  <view :class="'van-sidebar van-hairline--top-bottom ' + customClass">
    <slot />
  </view>
</template>

<script>
import { basic } from "../mixins/basic";

export default {
  name: "van-sidebar",
  mixins: [basic],
  relation: {
    name: "sidebar-item",
    type: "descendant"
  },

  props: {
    active: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      currentActive: -1
    };
  },

  methods: {
    linked(target) {
      this.children = this.children || [];
      this.children.push(target);
      this.setActive(this.active);
    },
    unlinked(target) {
      this.children = this.children.filter(item => item !== target);
      this.setActive(this.active);
    },

    setActive(active) {
      const { children, currentActive } = this;

      if (!children.length) {
        return Promise.resolve();
      }

      this.currentActive = active;

      const stack = [];

      if (currentActive !== active && children[currentActive]) {
        stack.push(children[currentActive].setActive(false));
      }

      if (children[active]) {
        stack.push(children[active].setActive(true));
      }

      return Promise.all(stack);
    }
  },

  watch: {
    active: "setActive"
  }
};
</script>

<style lang="less"></style>
