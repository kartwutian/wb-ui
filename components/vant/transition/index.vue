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
import { type } from 'os';

export default {
  name: "van-transition",
  // classes: [
  //   'enter-class',
  //   'enter-active-class',
  //   'enter-to-class',
  //   'leave-class',
  //   'leave-active-class',
  //   'leave-to-class'
  // ],

  data () {
    return {
      currentDuration: this.duration
    }
  },


  mixins: [transition(true), basic],
  props: {
    enterClass: {
      type: String,
      default: ""
    },
    enterActiveClass: {
      type: String,
      default: ""
    },
    entertoClass: {
      type: String,
      default: ""
    },
    leaveClass: {
      type: String,
      default: ""
    },
    leaveActiveClass: {
      type: String,
      default: ""
    },
    leavetoClass: {
      type: String,
      default: ""
    },
    customStyle: {
      type: String
    }
  }

};

</script>

<style lang="less">
</style>
