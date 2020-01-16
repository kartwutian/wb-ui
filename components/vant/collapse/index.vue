<template>
  <view :class="classes">
    <slot />
  </view>
</template>

<script>
import { basic } from "../mixins/basic";

export default {
  name: "van-collapse",
  mixins: [basic],
  relation: {
    name: "collapse-item",
    type: "descendant"
  },

  props: {
    value: {
      type: null
      // observer: 'updateExpanded'
    },
    accordion: {
      // 手风琴
      type: Boolean,
      default: false
      // observer: 'updateExpanded'
    },
    border: {
      type: Boolean,
      default: true
    },
    customClass: {
      type: String,
      default: ""
    }
  },

  computed: {
    classes() {
      return `${this.customClass} van-collapse ${
        this.border ? "van-hairline--top-bottom" : ""
      }`;
    }
  },

  methods: {
    linked(child) {
      this.children = this.children || [];
      this.children.push(child);
    },
    unlinked(child) {
      this.children = this.children.filter(item => item !== child);
    },

    updateExpanded() {
      this.children.forEach(child => {
        child.updateExpanded();
      });
    },

    switch(name, expanded) {
      const { accordion, value } = this;
      if (!accordion) {
        name = expanded
          ? (value || []).concat(name)
          : (value || []).filter(activeName => activeName !== name);
      } else {
        name = expanded ? name : "";
      }
      this.$emit("change", name);
      this.$emit("input", name);
    }
  },

  watch: {
    value: "updateExpanded",
    accordion: "updateExpanded"
  }
};
</script>

<style lang="less"></style>
