<template>

  <view
    :class="tabberBorder"
    :style=" zIndex ? 'z-index: ' + zIndex : '' "
  >
    <slot />
  </view>

</template>

<script>
import utils from '../wxs/utils';
import { basic } from '../mixins/basic';
import { queryParentComponent } from '../common/utils';


export default {
  name: "van-tabber",
  mixins: [basic],
  // relation: {
  //   name: 'tabbar-item',
  //   type: 'descendant',
  //   linked (target) {
  //     this.children.push(target);
  //     target.parent = this;
  //     target.updateFromParent();
  //   },
  //   unlinked (target) {
  //     this.children = this.children.filter(
  //       (item) => item !== target
  //     );
  //     this.updateChildren();
  //   }
  // },

  props: {
    active: {
      type: null,
      default () {
        return {};
      },
    },
    activeColor: {
      type: String,
      default () {
        return "";
      },
    },
    inactiveColor: {
      type: String,
      default () {
        return "";
      },
    },
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

  beforeCreate () {
    this.children = [];
  },

  computed: {
    tabberBorder () {
      return `${this.customClass} ${this.border ? 'van-hairline--top-bottom' : ''} ${utils.bem('tabbar', { fixed: this.fixed, safe: this.safeAreaInsetBottom })}`
    }
  },

  methods: {
    linked (target) {
      this.children.push(target);
      target.parent = this;
      target.updateFromParent();
    },
    unlinked (target) {
      this.children = this.children.filter(
        (item) => item !== target
      );
      this.updateChildren();
    },

    updateChildren () {
      const { children } = this;
      if (!Array.isArray(children) || !children.length) {
        return Promise.resolve();
      }

      return Promise.all(
        children.map((child) => child.updateFromParent())
      );
    },

    onChange (child) {
      const index = this.children.indexOf(child);
      const active = child.name || index;

      if (active !== this.active) {
        this.$emit('change', active);
      }
    }
  }
};

</script>

<style lang="less">
</style>
