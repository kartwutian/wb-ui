<template>
  <view v-if="animated || inited" :class="classes" :style="style">
    <slot />
  </view>
</template>

<script>
import { basic } from "../mixins/basic";
import utils from "../wxs/utils";
import { queryParentComponent } from "../common/utils";

export default {
  name: "van-tab",
  mixins: [basic],
  relation: {
    name: "tabs",
    type: "ancestor"
  },

  props: {
    dot: Boolean,
    info: null,
    title: String,
    disabled: Boolean,
    titleStyle: String,
    name: {
      type: Number | String,
      default: ""
    }
  },

  data() {
    return {
      width: null,
      inited: false,
      active: false,
      animated: false,

      hasParent: false // 标记是否有父元素
    };
  },

  computed: {
    classes() {
      return `${this.customClass} ${utils.bem("tab__pane", {
        active: this.active,
        inactive: !this.active
      })}`;
    },
    style() {
      return `${this.animated || this.active ? "" : "display: none;"} ${
        this.width ? "width:" + this.width + "px;" : ""
      }`;
    }
    // computedName(){
    //   return this.name || this.index;
    // },
  },

  mounted() {
    this.parent = queryParentComponent(this, "van-tabs");

    if (this.parent) {
      this.hasParent = true;
      this.parent.linked(this);
    }
  },

  destroyed() {
    if (this.parent) {
      this.parent.unlinked(this);
      this.parent = null;
      this.hasParent = false;
    }
  },

  watch: {
    title: "update",
    disabled: "update",
    dot: "update",
    info: "update",
    titleStyle: "update"
  },

  methods: {
    // setComputedName() {
    //   this.computedName = this.name || this.index;
    // },

    setComputedName() {
      this.computedName = this.name || this.index;
    },

    getComputedName() {
      if (this.name !== "") {
        return this.name;
      }
      return this.index;
    },

    update() {
      if (this.parent) {
        this.parent.updateTabs();
      }
    }
  }
};
</script>

<style lang="less"></style>
