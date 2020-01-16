<template>
  <van-cell
    :size="size"
    :icon="leftIcon"
    :title="label"
    :center="center"
    :border="border"
    :is-link="isLink"
    :required="required"
    :clickable="clickable"
    :title-width="titleWidth"
    :custom-style="customStyle"
    :arrow-direction="arrowDirection"
    custom-class="van-field"
  >
    <slot name="left-icon" slot="icon" />
    <slot name="label" slot="title" />
    <view :class="fieldBody">
      <textarea
        v-if="type === 'textarea'"
        :class="fieldInputType"
        :fixed="fixed"
        :focus="focus"
        :value="value"
        :disabled="disabled || readonly"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :placeholder-style="placeholderStyle"
        :placeholder-class="fieldPlaceholder"
        :auto-height="autosize"
        :cursor-spacing="cursorSpacing"
        :adjust-position="adjustPosition"
        :show-confirm-bar="showConfirmBar"
        :selection-end="selectionEnd"
        :selection-start="selectionStart"
        @input="onInput"
        @blur="onBlur"
        @focus="onFocus"
        @confirm="onConfirm"
      >
      </textarea>
      <input
        v-else
        :class="fieldInput"
        :type="type"
        :focus="focus"
        :value="value"
        :disabled="disabled || readonly"
        :maxlength="maxlength"
        :placeholder="placeholder"
        :placeholder-style="placeholderStyle"
        :placeholder-class="fieldPlaceholder"
        :confirm-type="confirmType"
        :confirm-hold="confirmHold"
        :cursor-spacing="cursorSpacing"
        :adjust-position="adjustPosition"
        :selection-end="selectionEnd"
        :selection-start="selectionStart"
        :password="password || type === 'password'"
        @input="onInput"
        @blur="onBlur"
        @focus="onFocus"
        @confirm="onConfirm"
      />
      <van-icon
        v-if="clearable && focused && value && !readonly"
        size="32rpx"
        name="clear"
        class="van-field__clear-root van-field__icon-root"
        @click="onClear"
      />
      <view class="van-field__icon-container" @tap="onClickIcon">
        <van-icon
          v-if="rightIcon || icon"
          size="32rpx"
          :name="rightIcon || icon"
          :class="'van-field__icon-root ' + iconClass"
          :custom-class="rightIconClass"
        />
        <slot name="right-icon" />
        <slot name="icon" />
      </view>
      <view class="van-field__button">
        <slot name="button" />
      </view>
    </view>
    <view v-if="errorMessage" :class="fieldError">
      {{ errorMessage }}
    </view>
    <view v-if="showWordLimit" class="van-field__word-limit">
      {{ value.length }}/{{ maxlength }}
    </view>
  </van-cell>
</template>

<script>
import utils from "../wxs/utils";
import VanCell from "../cell/index.vue";
import VanIcon from "../icon/index";

// import { Weapp } from 'definitions/weapp';
import { getSystemInfoSync } from "../common/utils";

export default {
  name: "van-filed",
  field: true,
  components: { VanCell, VanIcon },
  // classes: ['input-class', 'right-icon-class'],

  props: {
    size: String,
    icon: String, //
    label: String,
    error: Boolean,
    fixed: Boolean,
    focus: Boolean,
    center: Boolean,
    isLink: Boolean,
    leftIcon: String,
    rightIcon: String,
    disabled: Boolean,
    autosize: Boolean,
    readonly: Boolean,
    required: Boolean,
    password: Boolean,
    iconClass: String,
    clearable: Boolean,
    clickable: Boolean,
    inputAlign: String,
    placeholder: String,
    customStyle: String,
    confirmType: String,
    confirmHold: Boolean,
    errorMessage: String,
    arrowDirection: String,
    placeholderStyle: String,
    errorMessageAlign: String,
    showWordLimit: Boolean,
    selectionEnd: {
      type: Number,
      default: -1
    },
    selectionStart: {
      type: Number,
      default: -1
    },
    showConfirmBar: {
      type: Boolean,
      default: true
    },
    adjustPosition: {
      type: Boolean,
      default: true
    },
    cursorSpacing: {
      type: Number,
      default: 50
    },
    maxlength: {
      type: Number,
      default: -1
    },
    type: {
      type: String,
      default: "text"
    },
    border: {
      type: Boolean,
      default: true
    },
    titleWidth: {
      type: String,
      default: "180rpx"
    },
    inputClass: {
      type: String,
      default: ""
    },
    rightIconClass: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    }
  },

  // data: {
  //   focused: false,
  //   system: getSystemInfoSync().system.split(' ').shift().toLowerCase()
  // },

  data() {
    return {
      focused: false,
      system: getSystemInfoSync()
        .system.split(" ")
        .shift()
        .toLowerCase()
    };
  },

  computed: {
    fieldError() {
      // van-field__error-message {{ utils.bem('field__error', [errorMessageAlign, { disabled, error }]) }}
      return `van-field__error-message ${utils.bem("field__error", [
        this.errorMessageAlign,
        { disabled: this.disabled, error: this.error }
      ])}`;
    },
    fieldPlaceholder() {
      // {{ utils.bem('field__placeholder', { error }) }}
      return `${utils.bem("field__placeholder", { error: this.error })}`;
    },
    fieldInput() {
      // input-class {{ utils.bem('field__input', [inputAlign, { disabled, error }]) }}
      return `${this.inputClass} ${utils.bem("field__input", [
        this.inputAlign,
        { disabled: this.disabled, error: this.error }
      ])}`;
    },
    fieldInputType() {
      // input-class {{ utils.bem('field__input', [inputAlign, type, { disabled, error }]) }}
      return `${this.inputClass} ${utils.bem("field__input", [
        this.inputAlign,
        this.type,
        { disabled: this.disabled, error: this.error }
      ])}`;
    },
    fieldBody() {
      // utils.bem('field__body', [type, system])
      return `${utils.bem("field__body", [this.type, this.system])}`;
    }
  },

  methods: {
    onInput(event) {
      const { value = "" } = event.detail || {};
      this.emitChange(value);
    },

    onFocus(event) {
      this.focused = true;
      this.$emit("focus", event.detail);
    },

    onBlur(event) {
      // bug fix click clear icon can't trigger click event
      setTimeout(() => {
        this.focused = false;
      }, 16.7);

      this.$emit("blur", event.detail);
    },

    onClickIcon() {
      this.$emit("click-icon");
    },

    onClear() {
      this.emitChange("");
      this.$emit("clear", "");
      // this.setData({ value: '' }, () => {
      //   this.emitChange('');
      //   this.$emit('clear', '');
      // });
    },

    onConfirm() {
      this.$emit("confirm", this.value);
    },

    emitChange(value) {
      this.$emit("input", value);
      this.$emit("change", value);
    }
  }
};
</script>

<style lang="less"></style>
