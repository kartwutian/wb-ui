<template>
    <van-transition
  show="{{ show }}"
  custom-class="van-overlay"
  custom-style="z-index: {{ zIndex }}; {{ customStyle }}"
  duration="{{ duration }}"
  bind:tap="onClick"
  catch:touchmove="noop"
/>

</template>

<script>
    
import { VantComponent } from '../common/component';

VantComponent({
  props: {
    show: Boolean,
    customStyle: String,
    duration: {
      type: null,
      value: 300
    },
    zIndex: {
      type: Number,
      value: 1
    }
  },

  methods: {
    onClick() {
      this.$emit('click');
    },

    // for prevent touchmove
    noop() {}
  }
});

</script>

<style lang="less">

</style>
