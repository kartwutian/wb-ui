<template>
    <view
  class="custom-class {{ classPrefix }} {{ isImageName ? 'van-icon--image' : classPrefix + '-' + name }}"
  style="{{ color ? 'color: ' + color + ';' : '' }}{{ size ? 'font-size: ' + sizeWithUnit + ';' : '' }}{{ customStyle }}"
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
    import { VantComponent } from '../common/component';
import { addUnit } from '../common/utils';

VantComponent({
  props: {
    dot: Boolean,
    info: null,
    size: {
      type: null,
      observer: 'setSizeWithUnit'
    },
    color: String,
    customStyle: String,
    classPrefix: {
      type: String,
      value: 'van-icon'
    },
    name: {
      type: String,
      observer(val) {
        this.setData({
          isImageName: val.indexOf('/') !== -1
        });
      }
    }
  },

  data: {
    sizeWithUnit: null,
  },

  methods: {
    onClick() {
      this.$emit('click');
    },

    setSizeWithUnit(size: string | number): void {
      this.setData({
        sizeWithUnit: addUnit(size)
      });
    }
  }
});

</script>

<style lang="less">

</style>
