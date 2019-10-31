<template>

<view
  class="{{ utils.bem('search', { withaction: showAction || useActionSlot }) }} custom-class"
  style="background: {{ background }}"
>
  <view :class=" utils.bem('search__content', [shape]) ">
    <view class="van-search__label" v-if=" label ">{{ label }}</view>
    <slot v-else name="label" />

    <van-field
      type="search"
      :left-icon=" !useLeftIconSlot ? leftIcon : '' "
      :right-icon=" !useRightIconSlot ? rightIcon : '' "
      :focus=" focus "
      :error=" error "
      :border=" false "
      confirm-type="search"
      class="van-search__field field-class"
      :value=" value "
      :disabled=" disabled "
      :readonly=" readonly "
      :clearable=" clearable "
      :maxlength=" maxlength "
      :input-align=" inputAlign "
      input-class="input-class"
      :placeholder=" placeholder "
      :placeholder-style=" placeholderStyle "
      custom-style="padding: 5px 10px 5px 0; background-color: transparent;"
      @blur="onBlur"
      @focus="onFocus"
      @change="onChange"
      @confirm="onSearch"
      @clear="onClear"
    >
      <slot v-if=" useLeftIconSlot " name="left-icon" slot="left-icon" />
      <slot v-if=" useRightIconSlot " name="right-icon" slot="right-icon" />
    </van-field>
  </view>

  <view
    v-if=" showAction || useActionSlot "
    class="van-search__action"
    hover-class="van-search__action--hover"
    hover-stay-time="70"
  >
    <slot v-if=" useActionSlot " name="action" />
    <view v-else @tap="onCancel" class="cancel-class">{{ actionText }}</view>
  </view>
</view>

</template>

<script>
  import utils from '../wxs/utils';

import { Weapp } from 'definitions/weapp';

export default {
  field: true,

  classes: ['field-class', 'input-class', 'cancel-class'],

  props: {
    label: String,
    focus: Boolean,
    error: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    inputAlign: String,
    showAction: Boolean,
    useActionSlot: Boolean,
    useLeftIconSlot: Boolean,
    useRightIconSlot: Boolean,
    leftIcon: {
      type: String,
      value: 'search'
    },
    rightIcon: String,
    placeholder: String,
    placeholderStyle: String,
    actionText: {
      type: String,
      value: '取消'
    },
    background: {
      type: String,
      value: '#ffffff'
    },
    maxlength: {
      type: Number,
      value: -1
    },
    shape: {
      type: String,
      value: 'square'
    },
    clearable: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    onChange(event) {
      this.setData({ value: event.detail });
      this.$emit('change', event.detail);
    },

    onCancel() {
      /**
       * 修复修改输入框值时，输入框失焦和赋值同时触发，赋值失效
       * https://github.com/youzan/vant-weapp/issues/1768
       */
      setTimeout(() => {
        this.setData({ value: '' });
        this.$emit('cancel');
        this.$emit('change', '');
      }, 200);
    },

    onSearch() {
      this.$emit('search', this.data.value);
    },

    onFocus() {
      this.$emit('focus');
    },

    onBlur() {
      this.$emit('blur');
    },

    onClear() {
      this.$emit('clear');
    },
  }
};

</script>

<style lang="less">

</style>
