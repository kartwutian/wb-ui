<template>
  <view
    :class="classes"
    :style="styles"
    @tap="onClick"
  >
    <van-info
      v-if=" info !== null || dot "
      :dot=" dot "
      :info=" info "
      custom-class="van-icon__info"
    />
    <image
      v-if=" isImageName "
      :src=" name "
      mode="aspectFit"
      class="van-icon__image"
    />
  </view>
</template>

<script>
import { addUnit } from '../common/utils';
import VanInfo from "../info/index";

export default {
  name: 'van-icon',
  components: { VanInfo },
  props: {
    dot: {
      type: Boolean,
      default: false
    },
    info: null,
    size: {
      type: null,
    },
    color: String,
    customStyle: String,
    customClass: String,
    classPrefix: {
      type: String,
      default: 'van-icon'
    },
    name: {
      type: String,
    }
  },

  data () {
    return {
      sizeWithUnit: null,
    };
  },

  computed: {
    isImageName () {
      return this.name.indexOf('/') !== -1;
    },
    classes () {
      return `${this.customClass} ${this.classPrefix} ${this.isImageName ? 'van-icon--image' : this.classPrefix + '-' + this.name}`;
    },
    styles () {
      return `${this.color ? 'color: ' + this.color + ';' : ''}${this.size ? 'font-size: ' + this.sizeWithUnit + ';' : ''}${this.customStyle}`
    },
  },

  methods: {
    onClick () {
      this.$emit('click');
    },

    setSizeWithUnit (size) {
      this.sizeWithUnit = addUnit(size)
    }
  },
  watch: {
    size (val) {
      this.setSizeWithUnit(val)
    }
  }
};

</script>

<style lang="less">
</style>
