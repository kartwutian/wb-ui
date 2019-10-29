<template>
    <wxs src="../wxs/utils.wxs" module="utils" />

<van-cell
  :size=" size "
  :icon=" leftIcon "
  :title=" label "
  :center=" center "
  :border=" border "
  :is-link=" isLink "
  :required=" required "
  :clickable=" clickable "
  :title-width=" titleWidth "
  :custom-style=" customStyle "
  :arrow-direction=" arrowDirection "
  custom-class="van-field"
>
  <slot name="left-icon" slot="icon" />
  <slot name="label" slot="title" />
  <view :class=" utils.bem('field__body', [type, system]) ">
    <textarea
      v-if=" type === 'textarea' "
      class="input-class {{ utils.bem('field__input', [inputAlign, type, { disabled, error }]) }}"
      :fixed=" fixed "
      :focus=" focus "
      :value=" value "
      :disabled=" disabled || readonly "
      :maxlength=" maxlength "
      :placeholder=" placeholder "
      :placeholder-style=" placeholderStyle "
      placeholder-class="{{ utils.bem('field__placeholder', { error }) }}"
      :auto-height=" autosize "
      :cursor-spacing=" cursorSpacing "
      :adjust-position=" adjustPosition "
      :show-confirm-bar=" showConfirmBar "
      :selection-end=" selectionEnd "
      :selection-start=" selectionStart "
      bindinput="onInput"
      @blur="onBlur"
      @focus="onFocus"
      @confirm="onConfirm"
    >
    </textarea>
    <input
      wx:else
      class="input-class {{ utils.bem('field__input', [inputAlign, { disabled, error }]) }}"
      :type=" type "
      :focus=" focus "
      :value=" value "
      :disabled=" disabled || readonly "
      :maxlength=" maxlength "
      :placeholder=" placeholder "
      :placeholder-style=" placeholderStyle "
      placeholder-class="{{ utils.bem('field__placeholder', { error }) }}"
      :confirm-type=" confirmType "
      :confirm-hold=" confirmHold "
      :cursor-spacing=" cursorSpacing "
      :adjust-position=" adjustPosition "
      :selection-end=" selectionEnd "
      :selection-start=" selectionStart "
      :password=" password || type === 'password' "
      bindinput="onInput"
      @blur="onBlur"
      @focus="onFocus"
      @confirm="onConfirm"
    />
    <van-icon
      v-if=" clearable && focused && value && !readonly "
      size="16px"
      name="clear"
      class="van-field__clear-root van-field__icon-root"
      bindtouchstart="onClear"
    />
    <view class="van-field__icon-container" @tap="onClickIcon">
      <van-icon
        v-if=" rightIcon || icon "
        size="16px"
        :name=" rightIcon || icon "
        class="van-field__icon-root {{ iconClass }}"
        custom-class="right-icon-class"
      />
      <slot name="right-icon" />
      <slot name="icon" />
    </view>
    <view class="van-field__button">
      <slot name="button" />
    </view>
  </view>
  <view v-if=" errorMessage " class="van-field__error-message {{ utils.bem('field__error', [errorMessageAlign, { disabled, error }]) }}">
    {{ errorMessage }}
  </view>
</van-cell>

</template>

<script>
    import { VantComponent } from '../common/component';
import { Weapp } from 'definitions/weapp';
import { getSystemInfoSync } from '../common/utils';

VantComponent({
  field: true,

  classes: ['input-class', 'right-icon-class'],

  props: {
    size: String,
    icon: String,
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
    selectionEnd: {
      type: Number,
      value: -1
    },
    selectionStart: {
      type: Number,
      value: -1
    },
    showConfirmBar: {
      type: Boolean,
      value: true
    },
    adjustPosition: {
      type: Boolean,
      value: true
    },
    cursorSpacing: {
      type: Number,
      value: 50
    },
    maxlength: {
      type: Number,
      value: -1
    },
    type: {
      type: String,
      value: 'text'
    },
    border: {
      type: Boolean,
      value: true
    },
    titleWidth: {
      type: String,
      value: '90px'
    }
  },

  data: {
    focused: false,
    system: getSystemInfoSync().system.split(' ').shift().toLowerCase()
  },

  methods: {
    onInput(event) {
      const { value = '' } = event.detail || {};

      this.setData({ value }, () => {
        this.emitChange(value);
      });
    },

    onFocus(event) {
      this.setData({ focused: true });
      this.$emit('focus', event.detail);
    },

    onBlur(event) {
      this.setData({ focused: false });
      this.$emit('blur', event.detail);
    },

    onClickIcon() {
      this.$emit('click-icon');
    },

    onClear() {
      this.setData({ value: '' }, () => {
        this.emitChange('');
        this.$emit('clear', '');
      });
    },

    onConfirm() {
      this.$emit('confirm', this.data.value);
    },

    emitChange(value) {
      this.$emit('input', value);
      this.$emit('change', value);
    }
  }
});

</script>

<style lang="less">

</style>
