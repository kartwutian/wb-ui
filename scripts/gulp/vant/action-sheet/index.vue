<template>
    <wxs src="../wxs/utils.wxs" module="utils" />

<van-popup
  show="{{ show }}"
  position="bottom"
  round="{{ round }}"
  z-index="{{ zIndex }}"
  overlay="{{ overlay }}"
  custom-class="van-action-sheet"
  safe-area-inset-bottom="{{ safeAreaInsetBottom }}"
  close-on-click-overlay="{{ closeOnClickOverlay }}"
  bind:close="onClickOverlay"
>
  <view wx:if="{{ title }}" class="van-hairline--bottom van-action-sheet__header">
    {{ title }}
    <van-icon
      name="close"
      custom-class="van-action-sheet__close"
      bind:click="onClose"
    />
  </view>
  <view wx:if="{{ description }}" class="van-action-sheet__description">
    {{ description }}
  </view>
  <view wx:if="{{ actions && actions.length }}">
    <!-- button外包一层view，防止actions动态变化，导致渲染时button被打散 -->
    <button
      wx:for="{{ actions }}"
      wx:key="index"
      open-type="{{ item.openType }}"
      style="{{ item.color ? 'color: ' + item.color : '' }}"
      class="{{ utils.bem('action-sheet__item', { disabled: item.disabled || item.loading }) }} van-hairline--top {{ item.className || '' }}"
      hover-class="van-action-sheet__item--hover"
      data-index="{{ index }}"
      bind:tap="onSelect"
    >
      <block wx:if="{{ !item.loading }}">
        {{ item.name }}
        <text wx:if="{{ item.subname }}" class="van-action-sheet__subname" >{{ item.subname }}</text>
      </block>
      <van-loading wx:else size="20px" />
    </button>
  </view>
  <slot />
  <view
    wx:if="{{ cancelText }}"
    class="van-action-sheet__cancel"
    hover-class="van-action-sheet__cancel--hover"
    hover-stay-time="70"
    bind:tap="onCancel"
  >
    {{ cancelText }}
  </view>
</van-popup>

</template>

<script>
    import { VantComponent } from '../common/component';
import { Weapp } from 'definitions/weapp';

VantComponent({
  props: {
    show: Boolean,
    title: String,
    cancelText: String,
    description: String,
    round: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 100
    },
    actions: {
      type: Array,
      value: []
    },
    overlay: {
      type: Boolean,
      value: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true
    },
    closeOnClickAction: {
      type: Boolean,
      value: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    onSelect(event: Weapp.Event) {
      const { index } = event.currentTarget.dataset;
      const item = this.data.actions[index];
      if (item && !item.disabled && !item.loading) {
        this.$emit('select', item);

        if (this.data.closeOnClickAction) {
          this.onClose();
        }
      }
    },

    onCancel() {
      this.$emit('cancel');
    },

    onClose() {
      this.$emit('close');
    },

    onClickOverlay() {
      this.$emit('click-overlay');
      this.onClose();
    }
  }
});

</script>

<style lang="less">

</style>
