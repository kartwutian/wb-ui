<template>
  <view>
    <van-popup
      :show="show"
      :z-index="zIndex"
      :overlay="overlay"
      :transition="transition"
      :custom-class="'van-dialog' + className"
      :custom-style="
        (widthWithUnit ? 'width: ' + widthWithUnit + ';' : '') + customStyle
      "
      :overlay-style="overlayStyle"
      :close-on-click-overlay="closeOnClickOverlay"
      @close="onClickOverlay"
    >
      <view
        v-if="title || useTitleSlot"
        :class="
          'van-dialog__header ' +
            (message || useSlot ? '' : 'van-dialog--isolated')
        "
      >
        <slot v-if="useTitleSlot" name="title" />
        <block v-else-if="title"> {{ title }}</block>
      </view>

      <slot v-if="useSlot" />
      <view
        v-else-if="message"
        :class="
          'van-dialog__message ' +
            (title ? 'van-dialog__message--has-title' : '') +
            (messageAlign ? 'van-dialog__message--' + messageAlign : '')
        "
      >
        <text class="van-dialog__message-text">{{ message }}</text>
      </view>

      <view class="van-hairline--top van-dialog__footer">
        <van-button
          v-if="showCancelButton"
          size="large"
          :loading="loading.cancel"
          class="van-dialog__button van-hairline--right"
          custom-class="van-dialog__cancel"
          :custom-style="'color:' + cancelButtonColor"
          @click="onCancel__fix"
        >
          {{ cancelButtonText }}
        </van-button>
        <van-button
          v-if="showConfirmButton"
          size="large"
          class="van-dialog__button"
          :loading="loading.confirm"
          custom-class="van-dialog__confirm"
          :custom-style="'color:' + confirmButtonColor"
          :open-type="confirmButtonOpenType"
          :lang="lang"
          :business-id="businessId"
          :session-from="sessionFrom"
          :send-message-title="sendMessageTitle"
          :send-message-path="sendMessagePath"
          :send-message-img="sendMessageImg"
          :show-message-card="showMessageCard"
          :app-parameter="appParameter"
          @click="onConfirm__fix"
          @getuserinfo="bindGetUserInfo"
          @contact="bindContact"
          @getphonenumber="bindGetPhoneNumber"
          @error="bindError"
          @launchapp="bindLaunchApp"
          @opensetting="bindOpenSetting"
        >
          {{ confirmButtonText }}
        </van-button>
      </view>
    </van-popup>
  </view>
</template>

<script>
import { basic } from "../mixins/basic";
import { set } from "../mixins/set";
import { button } from "../mixins/button";
import { openType } from "../mixins/open-type";
import { addUnit } from "../common/utils";
import { GRAY, BLUE } from "../common/color";
import VanButton from "../button/index";
import VanPopup from "../popup/index";

// type Action = 'confirm' | 'cancel' | 'overlay';

export default {
  name: "van-dialog",
  mixins: [basic, set, button, openType],
  components: { VanPopup, VanButton },

  data() {
    return {
      loading: {
        confirm: false,
        cancel: false
      },
      widthWithUnit: "",
      show: false,
      title: "",
      message: "",
      useSlot: false,
      className: "",
      customStyle: "",
      asyncClose: false,
      messageAlign: "",
      overlayStyle: "",
      useTitleSlot: false,
      showCancelButton: false,
      closeOnClickOverlay: false,
      confirmButtonOpenType: "",
      width: null,
      zIndex: 2000,
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      confirmButtonColor: BLUE,
      cancelButtonColor: GRAY,
      showConfirmButton: true,
      overlay: true,
      transition: "scale"
    };
  },

  watch: {
    show(show) {
      !show && this.stopLoading();
    },
    width() {
      this.setWidthWithUnit();
    }
  },

  methods: {
    onConfirm__fix() {
      console.log(1111111);
      this.handleAction("confirm");
    },

    onCancel__fix() {
      console.log(2222);
      this.handleAction("cancel");
    },

    onClickOverlay() {
      this.onClose("overlay");
    },

    handleAction(action) {
      if (this.asyncClose) {
        this.set({
          [`loading.${action}`]: true
        });
      }

      this.onClose(action);
    },

    close() {
      this.show = false;
    },

    stopLoading() {
      this.loading.confirm = false;
      this.loading.cancel = false;
    },

    onClose(action) {
      if (!this.asyncClose) {
        this.close();
      }
      this.$emit("close", action);
      // 把 dialog 实例传递出去，可以通过 stopLoading() 在外部关闭按钮的 loading
      this.$emit(action, { dialog: this });
      const callback = this[action === "confirm" ? "onConfirm" : "onCancel"];
      console.log(this);

      if (callback) {
        callback(this);
      }
    },

    setWidthWithUnit(val) {
      this.widthWithUnit = addUnit(val);
    }
  }
};
</script>

<style lang="less"></style>
