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

export default {
  name: 'van-tag',
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
      value: 'default'
    }
  },
  computed: {
    classes(){
      return `custom-class ${utils.bem('tag', [this.type, this.size, {mark: this.mark, plain: this.plain, round: this.round }])} ${this.plain ? 'van-hairline--surround' : ''}`
    },
    styles(){
      return `${this.color && !this.plain ? 'background-color: ' + this.color + ';' : ''} ${this.textColor || (this.color && this.plain) ? 'color: ' + (this.textColor || this.color) : ''}`
    }
  },
}


</script>

<style lang="less">

</style>
