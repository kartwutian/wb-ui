<template>
    <view
  wx:if="{{ inited }}"
  class="van-transition custom-class {{ classes }}"
  style="-webkit-transition-duration:{{ currentDuration }}ms; transition-duration:{{ currentDuration }}ms; {{ display ? '' : 'display: none;' }} {{ customStyle }}"
  bind:transitionend="onTransitionEnd"
>
  <slot />
</view>

</template>

<script>
    import { VantComponent } from '../common/component';
import { transition } from '../mixins/transition';

VantComponent({
  classes: [
    'enter-class',
    'enter-active-class',
    'enter-to-class',
    'leave-class',
    'leave-active-class',
    'leave-to-class'
  ],

  mixins: [transition(true)]
});

</script>

<style lang="less">

</style>
