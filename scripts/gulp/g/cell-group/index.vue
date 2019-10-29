<template>
    <view
  v-if=" title "
  class="van-cell-group__title"
>
  {{ title }}
</view>
<view class="custom-class van-cell-group {{ border ? 'van-hairline--top-bottom' : '' }}">
  <slot />
</view>

</template>

<script>
    import { VantComponent } from '../common/component';

VantComponent({
  props: {
    title: String,
    border: {
      type: Boolean,
      value: true
    }
  }
});

</script>

<style lang="less">

</style>
