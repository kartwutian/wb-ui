<template>
  <view
    :class="'wb-icon icon-' + type"
    :style="{
      color: color ? color : 'inherit',
      'font-size': size ? size + 'rpx' : 'inherit'
    }"
    @click="onClick"
  />
</template>

<script>
export default {
  name: "wb-icon",
  props: {
    type: {
      type: String,
      default: ""
    },
    color: {
      type: String
    },
    size: {
      type: [Number, String]
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="less"></style>
