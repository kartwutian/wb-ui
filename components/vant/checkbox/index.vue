<template>
  <view :class="'van-checkbox ' + customClass">
    <view class="van-checkbox__icon-wrap" @tap="toggle">
      <slot v-if="useIconSlot" name="icon" />
      <van-icon
        v-else
        name="success"
        size="0.8em"
        :class="iconClasses"
        :style="iconStyle"
        :custom-class="iconClass"
        custom-style="line-height: 1.25em;"
      />
    </view>
    <view :class="labelClasses" @tap="onClickLabel">
      <slot />
    </view>
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";
import { addUnit, queryParentComponent } from "../common/utils";
import VanIcon from "../icon/index";

function emit(target, value) {
  target.$emit("input", value);
  target.$emit("change", value);
}

export default {
  name: "van-checkbox",
  components: { VanIcon },
  mixins: [basic],
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
    checkedColor: {
      type: String
    },
    labelPosition: String,
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
      type: null
    }
  },

  computed: {
    iconClasses() {
      return `${utils.bem("checkbox__icon", [
        this.shape,
        { disabled: this.isDisabled, checked: this.checked }
      ])}`;
    },
    iconStyle() {
      return `font-size: ${this.sizeWithUnit};${
        this.checkedColor && this.checked && !this.isDisabled
          ? "border-color:" +
            this.checkedColor +
            "; background-color:" +
            this.checkedColor
          : ""
      }`;
    },
    labelClasses() {
      return `${this.labelClass} ${utils.bem("checkbox__label", [
        this.labelPosition,
        { disabled: this.isDisabled }
      ])}`;
    },
    sizeWithUnit() {
      return addUnit(this.iconSize);
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
    this.parent = queryParentComponent(this, "van-checkbox-group");
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
      if (this.parent) {
        this.setParentValue(this.parent, value);
      }
      emit(this, value);
    },

    toggle() {
      const { disabled, value, proxyValue, proxyDisabled, hasParent } = this;
      if (!proxyDisabled && !disabled) {
        this.emitChange(hasParent ? !proxyValue : !value);

        // When toggle method is called multiple times at the same time,
        // only the last call is valid.
        // This is a hack for usage inside Cell.
        // clearTimeout(this.toggleTask);
        // this.toggleTask = setTimeout(() => {
        //   this.checked = !value;
        // });
      }
    },

    onClickLabel() {
      const {
        labelDisabled,
        disabled,
        value,
        proxyValue,
        proxyDisabled,
        hasParent
      } = this;
      if (!proxyDisabled && !disabled && !labelDisabled) {
        this.emitChange(hasParent ? !proxyValue : !value);
      }
    },
    setParentValue(parent, value) {
      const parentValue = parent.value.slice();
      const { name } = this;
      const { max } = parent;
      if (value) {
        if (max && parentValue.length >= max) {
          return;
        }

        if (parentValue.indexOf(name) === -1) {
          parentValue.push(name);
          emit(parent, parentValue);
        }
      } else {
        const index = parentValue.indexOf(name);
        if (index !== -1) {
          parentValue.splice(index, 1);
          emit(parent, parentValue);
        }
      }
    }
  }
};
</script>

<style lang="less"></style>
