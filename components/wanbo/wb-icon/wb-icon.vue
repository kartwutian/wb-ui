<template>
  <view
      :class="'wb-icon icon-' + type"
      :style="{ color: color, 'font-size': size + 'rpx' }"
      @click="onClick"
  />
</template>

<script>
  export default {
    name: 'wb-icon',
    props: {
      type: {
        type: String,
        default: ''
      },
      color: {
        type: String,
        default: '#333333'
      },
      size: {
        type: [Number, String],
        default: 32
      }
    },
    methods: {
      onClick () {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="less">

</style>
