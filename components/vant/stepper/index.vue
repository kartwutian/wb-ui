<template>
  <view class="van-stepper custom-class">
    <view
      v-if="showMinus"
      data-type="minus"
      :style="buttonStyle"
      :class="stepperMinus"
      hover-class="van-stepper__minus--hover"
      :hover-stay-time="70"
      @tap="onTap"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    />
    <input
      :type="integer ? 'number' : 'digit'"
      :class="stepperInput"
      :style="inputStyle"
      :value="values"
      :focus="focus"
      :disabled="disabled || disableInput"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <view
      v-if="showPlus"
      data-type="plus"
      :style="buttonStyle"
      :class="stepperplus"
      hover-class="van-stepper__plus--hover"
      :hover-stay-time="70"
      @tap="onTap"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    />
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";

// import { Weapp } from 'definitions/weapp';
import { addUnit, isDef } from "../common/utils";

const LONG_PRESS_START_TIME = 600;
const LONG_PRESS_INTERVAL = 200;

// add num and avoid float number
function add(num1, num2) {
  const cardinal = 10 ** 10;
  return Math.round((num1 + num2) * cardinal) / cardinal;
}

export default {
  field: true,
  name: "van-stepper",

  // classes: ['input-class', 'plus-class', 'minus-class'],
  mixins: [basic],

  props: {
    value: null,
    integer: Boolean,
    disabled: Boolean,
    inputWidth: null,
    buttonSize: null,
    asyncChange: Boolean,
    disableInput: Boolean,
    decimalLength: {
      type: Number,
      default: null
    },
    min: {
      type: null,
      default: 1
    },
    max: {
      type: null,
      default: Number.MAX_SAFE_INTEGER
    },
    step: {
      type: null,
      default: 1
    },
    showPlus: {
      type: Boolean,
      default: true
    },
    showMinus: {
      type: Boolean,
      default: true
    },
    inputClass: {
      type: String,
      default: ""
    },
    plusClass: {
      type: String,
      default: ""
    },
    minusClass: {
      type: String,
      default: ""
    }
  },

  watch: {
    value(value) {
      if (value === "") {
        return;
      }

      const newValue = this.range(value);

      if (typeof newValue === "number" && +this.value !== newValue) {
        // this.setData({ value: newValue });
        this.values = newValue;
      }
    },

    inputWidth() {
      // this.set({
      //   inputStyle: this.computeInputStyle()
      // });
      this.inputStyle = this.computeInputStyle();
    },

    buttonSize() {
      // this.set({
      //   inputStyle: this.computeInputStyle(),
      //   buttonStyle: this.computeButtonStyle()
      // });
      this.inputStyle = this.computeInputStyle();
      this.buttonStyle = this.computeButtonStyle();
    }
  },

  data() {
    return {
      focus: false,
      inputStyle: "",
      buttonStyle: "",
      values: 1
    };
  },

  // created () {
  //   this.setData({
  //     value: this.range(this.data.value)
  //   });
  // },

  beforeCreate() {
    this.$nextTick(() => {
      this.values = this.range(this.value);
      console.log(this.values);
    });
  },

  computed: {
    stepperMinus() {
      // minus-class {{ utils.bem('stepper__minus', { disabled: disabled || value <= min }) }}
      return `${this.minusClass}  ${utils.bem("stepper__minus", {
        disabled: this.disabled || this.values <= this.min
      })}`;
    },
    stepperInput() {
      // input-class {{ utils.bem('stepper__input', { disabled: disabled || disableInput }) }}
      return `${this.inputClass} ${utils.bem("stepper__input", {
        disabled: this.disabled || this.disableInput
      })}`;
    },
    stepperplus() {
      // plus-class {{ utils.bem('stepper__plus', { disabled: disabled || value >= max }) }}
      return `${this.plusClass} ${utils.bem("stepper__plus", {
        disabled: this.disabled || this.values >= this.max
      })}`;
    }
  },

  methods: {
    isDisabled(type) {
      if (type === "plus") {
        return this.disabled || this.values >= this.max;
      }

      return this.disabled || this.values <= this.min;
    },

    onFocus(event) {
      this.$emit("focus", event.detail);
    },

    onBlur(event) {
      const value = this.range(this.values);
      this.triggerInput(value);
      this.$emit("blur", event.detail);
    },

    // limit value range
    range(value) {
      value = String(value).replace(/[^0-9.-]/g, "");

      // format range
      value = value === "" ? 0 : +value;
      value = Math.max(Math.min(this.max, value), this.min);

      // format decimal
      if (isDef(this.decimalLength)) {
        value = value.toFixed(this.decimalLength);
      }

      return value;
    },

    onInput(event) {
      const { value = "" } = event.detail || {};
      this.triggerInput(value);
    },

    onChange() {
      const { type } = this;

      if (this.isDisabled(type)) {
        this.$emit("overlimit", type);
        return;
      }
      const diff = type === "minus" ? -this.step : +this.step;
      const value = add(+this.values, diff);

      this.triggerInput(this.range(value));
      this.$emit(type);
    },

    longPressStep() {
      this.longPressTimer = setTimeout(() => {
        this.onChange();
        this.longPressStep();
      }, LONG_PRESS_INTERVAL);
    },

    onTap(event) {
      const { type } = event.currentTarget.dataset;
      this.type = type;
      this.onChange();
    },

    onTouchStart(event) {
      clearTimeout(this.longPressTimer);

      const { type } = event.currentTarget.dataset;
      this.type = type;
      this.isLongPress = false;

      this.longPressTimer = setTimeout(() => {
        this.isLongPress = true;
        this.onChange();
        this.longPressStep();
      }, LONG_PRESS_START_TIME);
    },

    onTouchEnd() {
      clearTimeout(this.longPressTimer);
    },

    triggerInput(value) {
      // this.setData({
      //   value: this.data.asyncChange ? this.data.value : value
      // });
      this.values = value;
      this.$emit("change", this.values);
    },

    computeInputStyle() {
      let style = "";

      if (this.inputWidth) {
        style = `width: ${addUnit(this.inputWidth)};`;
      }

      if (this.buttonSize) {
        style += `height: ${addUnit(this.buttonSize)};`;
      }

      return style;
    },

    computeButtonStyle() {
      let style = "";
      const size = addUnit(this.buttonSize);

      if (this.buttonSize) {
        style = `width: ${size};height: ${size};`;
      }

      return style;
    }
  }
};
</script>

<style lang="less"></style>
