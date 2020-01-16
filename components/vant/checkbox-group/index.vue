<template>
  <view>
    <slot />
  </view>
</template>

<script>
export default {
  name: "van-checkbox-group",

  props: {
    max: Number,
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  mounted() {
    this.$emit("parent-link", this);
  },

  methods: {
    linked(target) {
      this.children = this.children || [];
      this.children.push(target);
      this.updateChild(target);
    },
    unlinked(target) {
      this.children = this.children.filter(child => child !== target);
    },

    updateChildren() {
      (this.children || []).forEach(child => {
        this.updateChild(child);
      });
    },

    updateChild(child) {
      const { value, disabled } = this;
      child.proxyValue = value.indexOf(child.name) !== -1;
      child.proxyDisabled = disabled || child.disabled;
    }
  },
  watch: {
    value() {
      this.updateChildren();
    },
    disabled() {
      this.updateChildren();
    }
  }
};
</script>

<style lang="less"></style>
