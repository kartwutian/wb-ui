<template>
  <view
    v-if=" inited "
    :class="'van-transition ' + customClass + ' ' + classes"
    :style="styles"
    @transitionend="onTransitionEnd"
    @tap="onClick"
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
  mixins: [basic, transition(true)],
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
    leaveToClass: {
      type: String,
      default: ""
    },
    customStyle: {
      type: String
    }
  },

  computed: {
    styles(){
      return `-webkit-transition-duration: ${this.currentDuration}ms;transition-duration: ${this.currentDuration}ms;${this.display ? '' : 'display: none;'} ${this.customStyle}`
    }
  },

  methods: {
    onClick(){
      this.$emit('click')
    }
  },
};

</script>

<style lang="less">
</style>
