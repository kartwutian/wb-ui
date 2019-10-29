<template>
    <wxs src="../wxs/utils.wxs" module="utils" />

<button
  id="{{ id }}"
  class="custom-class {{ utils.bem('button', [type, size, { block, round, plain, square, loading, disabled, hairline, unclickable: disabled || loading }]) }} {{ hairline ? 'van-hairline--surround' : '' }}"
  hover-class="van-button--active hover-class"
  lang="{{ lang }}"
  style="{{ style }} {{ customStyle }}"
  open-type="{{ openType }}"
  business-id="{{ businessId }}"
  session-from="{{ sessionFrom }}"
  send-message-title="{{ sendMessageTitle }}"
  send-message-path="{{ sendMessagePath }}"
  send-message-img="{{ sendMessageImg }}"
  show-message-card="{{ showMessageCard }}"
  app-parameter="{{ appParameter }}"
  aria-label="{{ ariaLabel }}"
  bindtap="onClick"
  bindgetuserinfo="bindGetUserInfo"
  bindcontact="bindContact"
  bindgetphonenumber="bindGetPhoneNumber"
  binderror="bindError"
  bindlaunchapp="bindLaunchApp"
  bindopensetting="bindOpenSetting"
>
  <block wx:if="{{ loading }}">
    <van-loading
      custom-class="loading-class"
      size="{{ loadingSize }}"
      type="{{ loadingType }}"
      color="{{ type === 'default' ? '#c9c9c9' : '' }}"
    />
    <view
      wx:if="{{ loadingText }}"
      class="van-button__loading-text"
    >
      {{ loadingText }}
    </view>
  </block>
  <block wx:else>
    <van-icon
      wx:if="{{ icon }}"
      size="1.2em"
      name="{{ icon }}"
      class="van-button__icon"
      custom-style="line-height: inherit;"
    />
    <view class="van-button__text">
      <slot />
    </view>
  </block>
</button>

</template>

<script>
    import { VantComponent } from '../common/component';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';

VantComponent({
  mixins: [button, openType],

  classes: ['hover-class', 'loading-class'],

  data: {
    style: ''
  },

  props: {
    icon: String,
    plain: Boolean,
    block: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    hairline: Boolean,
    disabled: Boolean,
    loadingText: String,
    customStyle: String,
    loadingType: {
      type: String,
      value: 'circular'
    },
    type: {
      type: String,
      value: 'default'
    },
    size: {
      type: String,
      value: 'normal'
    },
    loadingSize: {
      type: String,
      value: '20px'
    },
    color: {
      type: String,
      observer(color: string) {
        let style = '';

        if (color) {
          style += `color: ${this.data.plain ? color : 'white'};`;

          if (!this.data.plain) {
            // Use background instead of backgroundColor to make linear-gradient work
            style += `background: ${color};`;
          }

          // hide border when color is linear-gradient
          if (color.indexOf('gradient') !== -1) {
            style += 'border: 0;';
          } else {
            style += `border-color: ${color};`;
          }
        }

        if (style !== this.data.style) {
          this.setData({ style });
        }
      }
    }
  },

  methods: {
    onClick() {
      if (!this.data.disabled && !this.data.loading) {
        this.$emit('click');
      }
    }
  }
});

</script>

<style lang="less">

</style>
