<template>
  <view>
    <slot />
  </view>
</template>

<script>
export default {
  name: "van-radio-group",
  field: true,

  relation: {
    name: "radio",
    type: "descendant"
  },

  props: {
    value: {
      type: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
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
      (this.children || []).forEach(child => this.updateChild(child));
    },

    updateChild(child) {
      const { value, disabled } = this;
      // child.value = value;
      // child.disabled = disabled || child.disabled;
      child.proxyValue = value;
      child.proxyDisabled = disabled || child.disabled;
    }
  },

  watch: {
    value: "updateChildren",
    disabled: "updateChildren"
  }
};
</script>

<style lang="less"></style>
