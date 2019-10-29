<template>
  <view>
    <view
        v-if=" title "
        class="van-cell-group__title"
    >
      {{ title }}
    </view>
    <view class="classes">
      <slot/>
    </view>
  </view>
</template>

<script>

  export default {
    name: 'van-cell-group',
    props: {
      title: String,
      border: {
        type: Boolean,
        value: true
      }
    },
    computed: {
      classes(){
        return `custom-class van-cell-group ${this.border ? 'van-hairline--top-bottom' : ''}`
      }
    }
  };

</script>

<style lang="less">

</style>
