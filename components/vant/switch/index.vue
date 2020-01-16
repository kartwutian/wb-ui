<template>
  <view :class="switchs" :style="styles" @tap="onClick">
    <view :class="'van-switch__node ' + nodeClass">
      <van-loading
        v-if="loading"
        :color="loadingColor"
        size="50%"
        custom-class="van-switch__loading"
      />
    </view>
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";

import { BLUE, GRAY_DARK } from "../common/color";
import VanLoading from "../../vant/loading/index";

export default {
  name: "van-switch",
  components: { VanLoading },
  field: true,

  // classes: ['node-class'],
  mixins: [basic],

  props: {
    checked: null,
    loading: Boolean,
    disabled: Boolean,
    activeColor: String,
    inactiveColor: String,
    size: {
      type: String,
      default: "60rpx"
    },
    activeValue: {
      type: null,
      default: true
    },
    inactiveValue: {
      type: null,
      default: false
    },
    nodeClass: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      value: false,
      loadingColor: ""
    };
  },

  watch: {
    checked(value) {
      const loadingColor = this.getLoadingColor(value);
      // this.setData({ value, loadingColor });
      this.value = value;
      this.loadingColor = loadingColor;
    }
  },

  computed: {
    switchs() {
      return `${this.customClass} ${utils.bem("switch", {
        on: this.value === this.activeValue,
        disabled: this.disabled
      })}`;
    },
    styles() {
      return `font-size: ${this.size}; ${
        (this.checked
        ? this.activeColor
        : this.inactiveColor)
          ? "background-color: " +
            (this.checked ? this.activeColor : this.inactiveColor)
          : ""
      }`;
    }
  },

  beforeCreate() {
    this.$nextTick(() => {
      const { checked } = this;
      const loadingColor = this.getLoadingColor(checked);
      this.value = checked;
      this.loadingColor = loadingColor;
    });
  },

  methods: {
    getLoadingColor(checked) {
      const { activeColor, inactiveColor } = this;
      return checked ? activeColor || BLUE : inactiveColor || GRAY_DARK;
    },

    onClick() {
      const { activeValue, inactiveValue } = this;
      if (!this.disabled && !this.loading) {
        const checked = this.checked === activeValue;
        const value = checked ? inactiveValue : activeValue;
        this.$emit("input", value);
        this.$emit("change", value);
      }
    }
  }
};
</script>

<style lang="less"></style>
