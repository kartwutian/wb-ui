<template>
  <view
    v-if=" inited "
    :class="'van-transition ' + customClass + ' ' + classes"
    :style="[{'-webkit-transition-duration':currentDuration + 'ms'},{'transition-duration':currentDuration + 'ms'},display ? '' : 'display: none;',customStyle]"
    @transitionend="onTransitionEnd"
  >
    <slot />
  </view>

</template>

<script>

import { transition } from '../mixins/transition';
import { basic } from '../mixins/basic';

export default {
  classes: [
    'enter-class',
    'enter-active-class',
    'enter-to-class',
    'leave-class',
    'leave-active-class',
    'leave-to-class'
  ],

  mixins: [transition(true), basic]

};

</script>

<style lang="less">
</style>
