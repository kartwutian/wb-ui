<template>
  <van-button
    square
    :id="id"
    size="large"
    :lang="lang"
    :loading="loading"
    :disabled="disabled"
    :open-type="openType"
    :business-id="businessId"
    custom-class="van-goods-action-icon"
    :session-from="sessionFrom"
    :app-parameter="appParameter"
    :send-message-img="sendMessageImg"
    :send-message-path="sendMessagePath"
    :show-message-card="showMessageCard"
    :send-message-title="sendMessageTitle"
    @click="onClick"
    @error="bindError"
    @contact="bindContact"
    @opensetting="bindOpenSetting"
    @getuserinfo="bindGetUserInfo"
    @getphonenumber="bindGetPhoneNumber"
    @launchapp="bindLaunchApp"
  >
    <view class="van-goods-action-icon__content">
      <van-icon
        v-if="icon"
        size="40rpx"
        :name="icon"
        :dot="dot"
        :info="info"
        class="van-goods-action-icon__icon"
        :custom-class="iconClass"
      />
      <slot name="icon" />
      <text :class="textClass">{{ text }}</text>
    </view>
  </van-button>
</template>

<script>
import { link } from "../mixins/link";
import { button } from "../mixins/button";
import { openType } from "../mixins/open-type";
// import { Weapp } from 'definitions/weapp';
import { type } from "os";
import VanIcon from "../icon/index";
import VanButton from "../button/index";

export default {
  name: "van-goods-action-icon",
  // classes: ['icon-class', 'text-class'],

  mixins: [link, button, openType],
  components: { VanIcon, VanButton },
  props: {
    text: String,
    dot: Boolean,
    info: String,
    icon: String,
    disabled: Boolean,
    loading: Boolean,
    iconClass: {
      type: String,
      default: ""
    },
    textClass: {
      type: String,
      default: ""
    }
  },

  methods: {
    onClick(event) {
      this.$emit("click");
      this.jumpLink();
    }
  }
};
</script>

<style lang="less"></style>
