<template>
  <view :class="'van-radio ' + customClass">
    <view
      v-if="labelPosition === 'left'"
      :class="labelClasses"
      @tap="onClickLabel"
    >
      <slot />
    </view>
    <view
      class="van-radio__icon-wrap"
      :style="'font-size: ' + iconSizeWithUnit + ';'"
      @tap="onChange"
    >
      <slot v-if="useIconSlot" name="icon" />
      <van-icon
        v-else
        name="success"
        :class="radioIcon"
        :style="radioIconStyle"
        :custom-class="iconClass"
        :custom-style="'line-height: ' + iconSizeWithUnit + ';display: block;'"
      />
    </view>
    <view
      v-if="labelPosition === 'right'"
      :class="radioLabelClass"
      @tap="onClickLabel"
    >
      <slot />
    </view>
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";
import { addUnit, queryParentComponent } from "../common/utils";
import VanIcon from "../icon/index";

export default {
  name: "van-radio",
  components: { VanIcon },
  mixins: [basic],

  relation: {
    name: "radio-group",
    type: "ancestor"
  },

  // classes: ['icon-class', 'label-class'],

  props: {
    name: {
      type: String
    },
    value: {
      type: Boolean,
      default: false
    },
    disabled: Boolean,
    useIconSlot: Boolean,
    checkedColor: String,
    labelPosition: {
      type: String,
      default: "right"
    },
    labelDisabled: Boolean,
    shape: {
      type: String,
      default: "round"
    },
    iconClass: {
      type: String,
      default: ""
    },
    labelClass: {
      type: String,
      default: ""
    },
    iconSize: {
      type: null,
      default: "40rpx"
    }
  },

  computed: {
    iconSizeWithUnit() {
      return addUnit(this.iconSize);
    },
    labelClasses() {
      return `${this.labelClass} ${utils.bem("radio__label", [
        this.labelPosition,
        { disabled: this.isDisabled }
      ])}`;
    },
    radioIcon() {
      return `${utils.bem("radio__icon", [
        this.shape,
        { disabled: this.isDisabled, checked: this.checked === this.name }
      ])}`;
    },
    radioIconStyle() {
      return this.checkedColor && !this.isDisabled && this.checked === this.name
        ? "border-color:" +
            this.checkedColor +
            "; background-color:" +
            this.checkedColor +
            ";"
        : "";
    },
    radioLabelClass() {
      return `${this.labelClass} ${utils.bem("radio__label", [
        this.labelPosition,
        { disabled: this.isDisabled }
      ])}`;
    },
    checked: {
      get() {
        return this.hasParent ? this.proxyValue : this.value;
      }
    },
    isDisabled: {
      get() {
        return this.hasParent
          ? this.disabled || this.proxyDisabled
          : this.disabled;
      }
    }
  },

  data() {
    return {
      hasParent: false,
      proxyValue: false,
      proxyDisabled: false
    };
  },

  mounted() {
    this.parent = queryParentComponent(this, "van-radio-group");
    if (this.parent) {
      this.hasParent = true;
      this.parent.linked(this);
    }
  },

  destroyed() {
    if (this.parent) {
      this.parent.unlinked(this);
      this.parent = null;
      this.hasParent = false;
    }
  },

  methods: {
    emitChange(value) {
      const instance = this.parent || this;
      instance.$emit("input", value);
      instance.$emit("change", value);
    },

    onChange() {
      // console.log(this.name);
      this.emitChange(this.name);
    },

    onClickLabel() {
      const { disabled, labelDisabled, name } = this;
      if (!disabled && !labelDisabled) {
        this.emitChange(name);
      }
    }
  }
};
</script>

<style lang="less"></style>
