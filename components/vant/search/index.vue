<template>
  <view :class="searchAction" :style="{ background: background }">
    <view :class="searchContent">
      <view class="van-search__label" v-if="label">{{ label }}</view>
      <slot v-else name="label" />

      <van-field
        type="search"
        :left-icon="!useLeftIconSlot ? leftIcon : ''"
        :right-icon="!useRightIconSlot ? rightIcon : ''"
        :focus="focus"
        :error="error"
        :border="false"
        confirm-type="search"
        :class="'van-search__field' + fieldClass"
        :value="values"
        :titleWidth="titleWidth"
        :disabled="disabled"
        :readonly="readonly"
        :clearable="clearable"
        :maxlength="maxlength"
        :input-align="inputAlign"
        :input-class="inputClass"
        :placeholder="placeholder"
        :placeholder-style="placeholderStyle"
        custom-style="padding: 10rpx 20rpx 10rpx 0; background-color: transparent;"
        @blur="onBlur"
        @focus="onFocus"
        @change="onChange"
        @confirm="onSearch"
        @clear="onClear"
      >
        <slot v-if="useLeftIconSlot" name="left-icon" slot="left-icon" />
        <slot v-if="useRightIconSlot" name="right-icon" slot="right-icon" />
      </van-field>
    </view>

    <view
      v-if="showAction || useActionSlot"
      class="van-search__action"
      hover-class="van-search__action--hover"
      :hover-stay-time="70"
    >
      <slot v-if="useActionSlot" name="action" />
      <view v-else @tap="onCancel" :class="cancelClass">{{ actionText }}</view>
    </view>
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";
import VanField from "../field/index";

// import { Weapp } from 'definitions/weapp';

export default {
  name: "van-search",
  field: true,
  components: { VanField },
  // classes: ['field-class', 'input-class', 'cancel-class'],
  mixins: [basic],

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
    titleWidth: {
      type: String,
      default: "0"
    },
    leftIcon: {
      type: String,
      default: "search"
    },
    rightIcon: String,
    placeholder: String,
    placeholderStyle: String,
    actionText: {
      type: String,
      default: "取消"
    },
    background: {
      type: String,
      default: "#ffffff"
    },
    maxlength: {
      type: Number,
      default: -1
    },
    shape: {
      type: String,
      default: "square"
    },
    clearable: {
      type: Boolean,
      default: true
    },
    fieldClass: {
      type: String,
      default: ""
    },
    inputClass: {
      type: String,
      default: ""
    },
    cancelClass: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    }
  },

  computed: {
    searchAction() {
      // {{ utils.bem('search', { withaction: showAction || useActionSlot }) }} custom-class
      return `${utils.bem("search", {
        withaction: this.showAction || this.useActionSlot
      })} ${this.customClass}`;
    },
    searchContent() {
      // utils.bem('search__content', [shape])
      return `${utils.bem("search__content", [this.shape])}`;
    }
  },

  data() {
    return {
      values: ""
    };
  },
  mounted() {
    setTimeout(() => {
      this.values = this.value;
    });
  },

  watch: {
    value(val) {
      this.values = val;
    }
  },

  methods: {
    onChange(event) {
      this.values = event;
      // this.setData({ value: event.detail });
      this.$emit("change", event);
    },

    onCancel() {
      /**
       * 修复修改输入框值时，输入框失焦和赋值同时触发，赋值失效
       * https://github.com/youzan/vant-weapp/issues/1768
       */
      setTimeout(() => {
        // this.setData({ value: '' });
        this.$emit("cancel");
        // this.$emit('change', '');
        this.onChange("");
      }, 200);
    },

    onSearch(val) {
      this.$emit("search", val);
    },

    onFocus(val) {
      this.$emit("focus", val);
    },

    onBlur(val) {
      this.$emit("blur", val);
    },

    onClear() {
      this.$emit("clear");
    }
  }
};
</script>

<style lang="less"></style>
