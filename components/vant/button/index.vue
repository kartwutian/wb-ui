<template>
  <button
    :id="id"
    :class="classes"
    :hover-class="'van-button--active ' + hoverClass"
    :lang="lang"
    :style="style + customStyle"
    :open-type="openType"
    :business-id="businessId"
    :session-from="sessionFrom"
    :send-message-title="sendMessageTitle"
    :send-message-path="sendMessagePath"
    :send-message-img="sendMessageImg"
    :show-message-card="showMessageCard"
    :app-parameter="appParameter"
    :aria-label="ariaLabel"
    :hover-star-time="hoverStarTime"
    :hover-stay-time="hoverStayTime"
    @tap="onClick"
    @getuserinfo="bindGetUserInfo"
    @contact="bindContact"
    @getphonenumber="bindGetPhoneNumber"
    @error="bindError"
    @launchapp="bindLaunchApp"
    @opensetting="bindOpenSetting"
  >
    <block v-if="loading">
      <van-loading
        :custom-class="loadingClass"
        :size="loadingSize"
        :type="loadingType"
        :color="type === 'default' ? '#c9c9c9' : ''"
      />
      <view v-if="loadingText" class="van-button__loading-text">
        {{ loadingText }}
      </view>
    </block>
    <block v-else>
      <van-icon
        v-if="icon"
        size="1.2em"
        :name="icon"
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
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";
import { button } from "../mixins/button";
import { openType } from "../mixins/open-type";
import VanIcon from "../icon/index";
import VanLoading from "../loading/index";

export default {
  name: "van-button",
  components: { VanLoading, VanIcon },
  mixins: [basic, button, openType],

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
    hoverStarTime: {
      // 按住后多久出现点击态，单位毫秒
      type: Number,
      default: 20
    },
    hoverStayTime: {
      // 手指松开后点击态保留时间，单位毫秒
      type: Number,
      default: 70
    },
    customStyle: {
      type: String,
      default: ""
    },
    hoverClass: {
      type: String,
      default: ""
    },
    loadingClass: {
      type: String,
      default: ""
    },
    loadingType: {
      type: String,
      default: "circular"
    },
    type: {
      type: String,
      default: "default"
    },
    size: {
      type: String,
      default: "normal"
    },
    loadingSize: {
      type: String,
      default: "40rpx"
    },
    color: {
      type: String
    }
  },

  computed: {
    classes() {
      return `${this.customClass} ${utils.bem("button", [
        this.type,
        this.size,
        {
          block: this.block,
          round: this.round,
          plain: this.plain,
          square: this.square,
          loading: this.loading,
          disabled: this.disabled,
          hairline: this.hairline,
          unclickable: this.disabled || this.loading
        }
      ])} ${this.hairline ? "van-hairline--surround" : ""}`;
    },
    style() {
      let style = "";

      if (this.color) {
        style += `color: ${this.plain ? this.color : "white"};`;

        if (!this.plain) {
          // Use background instead of backgroundColor to make linear-gradient work
          style += `background: ${this.color};`;
        }

        // hide border when color is linear-gradient
        if (this.color.indexOf("gradient") !== -1) {
          style += "border: 0;";
        } else {
          style += `border-color: ${this.color};`;
        }
      }
      return style;
    }
  },

  methods: {
    onClick() {
      if (!this.disabled && !this.loading) {
        this.$emit("click"); // 事件名不能为tap，否则外面监听不到tap
      }
    }
  }
};
</script>

<style lang="less"></style>
