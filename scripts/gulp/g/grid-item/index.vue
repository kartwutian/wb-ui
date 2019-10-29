<template>
    <wxs src="../wxs/utils.wxs" module="utils" />

<view class="{{ utils.bem('grid-item', { square }) }}" :style=" style " bindtap="onClick">
  <view class="{{ utils.bem('grid-item__content', { center, square, clickable, surround: border && gutter }) }} {{ border ? 'van-hairline--surround' : '' }}">
    <block v-if=" useSlot ">
      <slot />
    </block>
    <block wx:else>
      <view class="van-grid-item__icon">
        <van-icon v-if=" icon " :name=" icon " :dot=" dot " :info=" info " />
        <slot wx:else name="icon"></slot>
      </view>
      <view class="van-grid-item__text">
        <text v-if=" text ">{{ text }}</text>
        <slot wx:else name="text"></slot>
      </view>
    </block>
  </view>
</view>

</template>

<script>
    import { link } from '../mixins/link';
import { VantComponent } from '../common/component';

VantComponent({
  relation: {
    name: 'grid',
    type: 'ancestor',
    linked(parent) {
      this.parent = parent;
    }
  },

  mixins: [link],

  props: {
    icon: String,
    dot: Boolean,
    info: null,
    text: String,
    useSlot: Boolean
  },

  mounted() {
    this.updateStyle();
  },

  methods: {
    updateStyle() {
      if (!this.parent) {
        return;
      }

      const { data, children } = this.parent;
      const { columnNum, border, square, gutter, clickable, center } = data;
      const width = `${100 / columnNum}%`;

      const styleWrapper: Array<string> = [];
      styleWrapper.push(`width: ${width}`);

      if (square) {
        styleWrapper.push(`padding-top: ${width}`);
      }

      if (gutter) {
        styleWrapper.push(`padding-right: ${gutter}px`);

        const index = children.indexOf(this);
        if (index >= columnNum) {
          styleWrapper.push(`margin-top: ${gutter}px`);
        }
      }

      this.setData({
        style: styleWrapper.join('; '),
        center,
        border,
        square,
        gutter,
        clickable
      });
    },

    onClick() {
      this.$emit('click');
      this.jumpLink();
    }
  }
});

</script>

<style lang="less">

</style>
