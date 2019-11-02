<template>
  <view
    :class="classes"
    :style="styles"
  >
    <slot />
  </view>

</template>

<script>
import utils from '../wxs/utils'
import {basic} from "../mixins/basic";

export default {
  name: 'van-tag',
  mixins: [basic],
  props: {
    size: {
      type: String,
    },
    mark: {
      type: Boolean,
    },
    color: {
      type: String,
    },
    plain: {
      type: Boolean,
    },
    round: {
      type: Boolean,
    },
    textColor: {
      type: String,
    },
    type: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    classes(){
      return `${this.customClass} ${utils.bem('tag', [this.type, this.size, {mark: this.mark, plain: this.plain, round: this.round }])} ${this.plain ? 'van-hairline--surround' : ''}`
    },
    styles(){
      return `${this.color && !this.plain ? 'background-color: ' + this.color + ';' : ''} ${this.textColor || (this.color && this.plain) ? 'color: ' + (this.textColor || this.color) : ''}`
    }
  },
}


</script>

<style lang="less">

</style>
