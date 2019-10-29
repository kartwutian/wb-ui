<template>
    <wxs src="../wxs/utils.wxs" module="utils" />

<view
  class="{{ utils.bem('tabbar-item', { active }) }} custom-class"
  style="color: {{ active ? activeColor : inactiveColor }}"
  bind:tap="onClick"
>
  <view class="{{ utils.bem('tabbar-item__icon', { dot }) }}">
    <van-icon
      wx:if="{{ icon }}"
      name="{{ icon }}"
      customStyle="display: block"
    />
    <block wx:else>
      <slot
        wx:if="{{ active }}"
        name="icon-active"
      />
      <slot wx:else name="icon" />
    </block>
    <van-info
      wx:if="{{ info !== null }}"
      info="{{ info }}"
      custom-style="margin-top: 2px"
    />
  </view>
  <view class="van-tabbar-item__text">
    <slot />
  </view>
</view>

</template>

<script>
    import { VantComponent } from '../common/component';

VantComponent({
  props: {
    info: null,
    name: null,
    icon: String,
    dot: Boolean
  },

  relation: {
    name: 'tabbar',
    type: 'ancestor'
  },

  data: {
    active: false
  },

  methods: {
    onClick() {
      if (this.parent) {
        this.parent.onChange(this);
      }
      this.$emit('click');
    },

    updateFromParent() {
      const { parent } = this;
      if (!parent) {
        return;
      }

      const index = parent.children.indexOf(this);
      const parentData = parent.data;
      const { data } = this;
      const active = (data.name || index) === parentData.active;
      const patch: { [key: string]: any } = {};

      if (active !== data.active) {
        patch.active = active;
      }
      if (parentData.activeColor !== data.activeColor) {
        patch.activeColor = parentData.activeColor;
      }
      if (parentData.inactiveColor !== data.inactiveColor) {
        patch.inactiveColor = parentData.inactiveColor;
      }

      return Object.keys(patch).length > 0
        ? this.set(patch)
        : Promise.resolve();
    }
  }
});

</script>

<style lang="less">

</style>
