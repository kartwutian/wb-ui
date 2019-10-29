<template>
    <van-popup
  :show=" show "
  :z-index=" zIndex "
  :overlay=" overlay "
  :transition=" transition "
  custom-class="van-dialog {{ className }}"
  custom-style="{{ widthWithUnit ? 'width: ' + widthWithUnit + ';' : '' }}{{ customStyle }}"
  :overlay-style=" overlayStyle "
  :close-on-click-overlay=" closeOnClickOverlay "
  @close="onClickOverlay"
>
  <view
    v-if=" title || useTitleSlot  "
    class="van-dialog__header {{ message || useSlot ? '' : 'van-dialog--isolated' }}"
  >
    <slot v-if=" useTitleSlot " name="title" />
    <block v-else-if=" title "> {{ title }}</block>
  </view>

  <slot v-if=" useSlot " />
  <view
    v-else-if=" message "
    class="van-dialog__message {{ title ? 'van-dialog__message--has-title' : '' }} {{ messageAlign ? 'van-dialog__message--' + messageAlign : '' }}"
  >
    <text class="van-dialog__message-text">{{ message }}</text>
  </view>

  <view class="van-hairline--top van-dialog__footer">
    <van-button
      v-if=" showCancelButton "
      size="large"
      :loading=" loading.cancel "
      class="van-dialog__button van-hairline--right"
      custom-class="van-dialog__cancel"
      custom-style="color: {{ cancelButtonColor }}"
      @click="onCancel"
    >
      {{ cancelButtonText }}
    </van-button>
    <van-button
      v-if=" showConfirmButton "
      size="large"
      class="van-dialog__button"
      :loading=" loading.confirm "
      custom-class="van-dialog__confirm"
      custom-style="color: {{ confirmButtonColor }}"

      :open-type=" confirmButtonOpenType "
      :lang=" lang "
      :business-id=" businessId "
      :session-from=" sessionFrom "
      :send-message-title=" sendMessageTitle "
      :send-message-path=" sendMessagePath "
      :send-message-img=" sendMessageImg "
      :show-message-card=" showMessageCard "
      :app-parameter=" appParameter "

      @click="onConfirm"
      bindgetuserinfo="bindGetUserInfo"
      bindcontact="bindContact"
      bindgetphonenumber="bindGetPhoneNumber"
      binderror="bindError"
      bindlaunchapp="bindLaunchApp"
      bindopensetting="bindOpenSetting"
    >
      {{ confirmButtonText }}
    </van-button>
  </view>
</van-popup>

</template>

<script>
    import { VantComponent } from '../common/component';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';
import { addUnit } from '../common/utils';
import { GRAY, BLUE } from '../common/color';

type Action = 'confirm' | 'cancel' | 'overlay';

VantComponent({
  mixins: [button, openType],

  props: {
    show: Boolean,
    title: String,
    message: String,
    useSlot: Boolean,
    className: String,
    customStyle: String,
    asyncClose: Boolean,
    messageAlign: String,
    overlayStyle: String,
    useTitleSlot: Boolean,
    showCancelButton: Boolean,
    closeOnClickOverlay: Boolean,
    confirmButtonOpenType: String,
    width: {
      type: null,
      observer: 'setWidthWithUnit'
    },
    zIndex: {
      type: Number,
      value: 2000
    },
    confirmButtonText: {
      type: String,
      value: '确认'
    },
    cancelButtonText: {
      type: String,
      value: '取消'
    },
    confirmButtonColor: {
      type: String,
      value: BLUE
    },
    cancelButtonColor: {
      type: String,
      value: GRAY
    },
    showConfirmButton: {
      type: Boolean,
      value: true
    },
    overlay: {
      type: Boolean,
      value: true
    },
    transition: {
      type: String,
      value: 'scale'
    }
  },

  data: {
    loading: {
      confirm: false,
      cancel: false
    }
  },

  watch: {
    show(show: boolean) {
      !show && this.stopLoading();
    }
  },

  methods: {
    onConfirm() {
      this.handleAction('confirm');
    },

    onCancel() {
      this.handleAction('cancel');
    },

    onClickOverlay() {
      this.onClose('overlay');
    },

    handleAction(action: Action) {
      if (this.data.asyncClose) {
        this.setData({
          [`loading.${action}`]: true
        });
      }

      this.onClose(action);
    },

    close() {
      this.setData({
        show: false
      });
    },

    stopLoading() {
      this.setData({
        loading: {
          confirm: false,
          cancel: false
        }
      });
    },

    onClose(action: Action) {
      if (!this.data.asyncClose) {
        this.close();
      }
      this.$emit('close', action);

      // 把 dialog 实例传递出去，可以通过 stopLoading() 在外部关闭按钮的 loading
      this.$emit(action, { dialog: this });

      const callback = this.data[action === 'confirm' ? 'onConfirm' : 'onCancel'];
      if (callback) {
        callback(this);
      }
    },

    setWidthWithUnit(val) {
      this.setData({
        widthWithUnit: addUnit(val)
      });
    }
  }
});

</script>

<style lang="less">

</style>
