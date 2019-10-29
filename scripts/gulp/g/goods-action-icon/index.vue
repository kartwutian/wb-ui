<template>
    <van-button
  square
  :id=" id "
  size="large"
  :lang=" lang "
  :loading=" loading "
  :disabled=" disabled "
  :open-type=" openType "
  :business-id=" businessId "
  custom-class="van-goods-action-icon"
  :session-from=" sessionFrom "
  :app-parameter=" appParameter "
  :send-message-img=" sendMessageImg "
  :send-message-path=" sendMessagePath "
  :show-message-card=" showMessageCard "
  :send-message-title=" sendMessageTitle "
  @click="onClick"
  binderror="bindError"
  bindcontact="bindContact"
  bindopensetting="bindOpenSetting"
  bindgetuserinfo="bindGetUserInfo"
  bindgetphonenumber="bindGetPhoneNumber"
  bindlaunchapp="bindLaunchApp"
>
  <view class="van-goods-action-icon__content">
    <van-icon
      v-if=" icon "
      size="20px"
      :name=" icon "
      :dot=" dot "
      :info=" info "
      class="van-goods-action-icon__icon"
      custom-class="icon-class"
    />
    <slot name="icon" />
    <text class="text-class">{{ text }}</text>
  </view>
</van-button>

</template>

<script>
    import { VantComponent } from '../common/component';
import { link } from '../mixins/link';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';
import { Weapp } from 'definitions/weapp';

VantComponent({
  classes: ['icon-class', 'text-class'],

  mixins: [link, button, openType],

  props: {
    text: String,
    dot: Boolean,
    info: String,
    icon: String,
    disabled: Boolean,
    loading: Boolean
  },

  methods: {
    onClick(event: Weapp.Event) {
      this.$emit('click', event.detail);
      this.jumpLink();
    }
  }
});

</script>

<style lang="less">

</style>
