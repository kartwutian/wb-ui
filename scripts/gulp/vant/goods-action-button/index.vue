<template>
    <wxs src="../wxs/utils.wxs" module="utils" />
<van-button
  square
  id="{{ id }}"
  lang="{{ lang }}"
  type="{{ type }}"
  color="{{ color }}"
  loading="{{ loading }}"
  disabled="{{ disabled }}"
  open-type="{{ openType }}"
  custom-class="{{ utils.bem('goods-action-button', [type, { first: isFirst, last: isLast }]) }}"
  business-id="{{ businessId }}"
  session-from="{{ sessionFrom }}"
  app-parameter="{{ appParameter }}"
  send-message-img="{{ sendMessageImg }}"
  send-message-path="{{ sendMessagePath }}"
  show-message-card="{{ showMessageCard }}"
  send-message-title="{{ sendMessageTitle }}"
  bind:click="onClick"
  binderror="bindError"
  bindcontact="bindContact"
  bindopensetting="bindOpenSetting"
  bindgetuserinfo="bindGetUserInfo"
  bindgetphonenumber="bindGetPhoneNumber"
  bindlaunchapp="bindLaunchApp"
>
  {{ text }}
</van-button>

</template>

<script>
    import { VantComponent } from '../common/component';
import { link } from '../mixins/link';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';
import { Weapp } from 'definitions/weapp';

VantComponent({
  mixins: [link, button, openType],
  relation: {
    type: 'ancestor',
    name: 'goods-action',
    linked(parent) {
      this.parent = parent;
    }
  },
  props: {
    text: String,
    color: String,
    loading: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      value: 'danger'
    }
  },

  mounted() {
    this.updateStyle();
  },

  methods: {
    onClick(event: Weapp.Event) {
      this.$emit('click', event.detail);
      this.jumpLink();
    },

    updateStyle() {
      const { children = [] } = this.parent;
      const index = children.indexOf(this);

      this.setData({
        isFirst: index === 0,
        isLast: index === children.length - 1
      });
    }
  }
});

</script>

<style lang="less">

</style>
