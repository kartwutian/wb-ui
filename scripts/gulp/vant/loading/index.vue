<template>
    <view class="van-loading {{vertical ? 'van-loading--vertical' : ''}}">
  <view
    class="van-loading__wrapper custom-class"
    style="width: {{ sizeWithUnit }}; height: {{ sizeWithUnit }}"
  >
    <view
      class="van-loading__spinner van-loading__spinner--{{ type }}"
      style="color: {{ color }};"
    >
      <view
        wx:if="{{ type === 'spinner' }}"
        wx:for="item in 12"
        wx:key="index"
        class="van-loading__dot"
      />
    </view>
  </view>
  <view 
    style="font-size: {{textSizeWithUnit}};" 
    class="van-loading__text {{vertical ? 'van-loading__text--vertical' : ''}}"
  >
    <slot />
  </view>
</view>
</template>

<script>
    import { VantComponent } from '../common/component';
import { addUnit } from '../common/utils';

VantComponent({
  props: {
    size: {
      type: String,
      observer: 'setSizeWithUnit'
    },
    type: {
      type: String,
      value: 'circular'
    },
    color: {
      type: String,
      value: '#c9c9c9'
    },
    textSize: {
      type: String,
      observer: 'setTextSizeWithUnit'
    },
    vertical: Boolean
  },

  data: {
    sizeWithUnit: '30px',
    textSizeWithUnit: '14px'
  },

  methods: {
    setSizeWithUnit(size: string | number): void {
      this.setData({
        sizeWithUnit: addUnit(size)
      });
    },

    setTextSizeWithUnit(size: string | number): void {
      this.set({
        textSizeWithUnit: addUnit(size)
      });
    }
  }
});

</script>

<style lang="less">

</style>
