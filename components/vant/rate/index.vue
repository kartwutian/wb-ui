<template>
  <view :class="'van-rate ' + customClass" @touchmove="onTouchMove">
    <view
      class="van-rate__item"
      v-for="(item, index) in count"
      :key="index"
      :style="
        'font-size:' +
          sizeWithUnit +
          ';padding-right:' +
          (index !== count - 1 ? gutterWithUnit : '')
      "
    >
      <van-icon
        :name="index + 1 <= innerValue ? icon : voidIcon"
        class="van-rate__icon"
        :custom-class="iconClass"
        :data-score="index"
        :color="
          disabled ? disabledColor : index + 1 <= innerValue ? color : voidColor
        "
        @click="onSelect(index)"
      />

      <van-icon
        v-if="allowHalf"
        :name="index + 0.5 <= innerValue ? icon : voidIcon"
        :class="rateIcon"
        :custom-class="iconClass"
        :data-score="index - 0.5"
        :color="
          disabled
            ? disabledColor
            : index + 0.5 <= innerValue
            ? color
            : voidColor
        "
        @click="onSelect(index - 0.5)"
      />
    </view>
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";

// import { Weapp } from 'definitions/weapp';
import { addUnit } from "../common/utils";
import VanIcon from "../icon/index";

export default {
  name: "van-rate",
  field: true,
  components: { VanIcon },
  mixins: [basic],

  props: {
    value: Number,
    readonly: Boolean,
    disabled: Boolean,
    allowHalf: Boolean,
    size: {
      type: null
    },
    icon: {
      type: String,
      default: "star"
    },
    voidIcon: {
      type: String,
      default: "star-o"
    },
    color: {
      type: String,
      default: "#ffd21e"
    },
    voidColor: {
      type: String,
      default: "#c7c7c7"
    },
    disabledColor: {
      type: String,
      default: "#bdbdbd"
    },
    count: {
      type: Number,
      default: 5
    },
    gutter: {
      type: null
    },
    touchable: {
      type: Boolean,
      default: true
    },
    iconClass: {
      type: String,
      default: ""
    }
  },

  computed: {
    rateIcon() {
      return `${utils.bem("rate__icon", ["half"])}`;
    }
  },

  data() {
    return {
      innerValue: 0,
      gutterWithUnit: undefined,
      sizeWithUnit: "40rpx"
    };
  },

  beforeCreate() {
    this.$nextTick(() => {
      this.innerValue = this.value;
    });
  },

  watch: {
    value(value) {
      if (value !== this.innerValue) {
        this.innerValue = value;
      }
    },
    size() {
      this.setSizeWithUnit();
    },
    gutter() {
      this.setGutterWithUnit();
    }
  },

  methods: {
    setSizeWithUnit(val) {
      this.sizeWithUnit = addUnit(val);
    },

    setGutterWithUnit(val) {
      this.gutterWithUnit = addUnit(val);
    },

    onSelect(score) {
      const scores = parseFloat(score);
      if (!this.disabled && !this.readonly) {
        this.innerValue = scores + 1;
        this.$emit("input", scores + 1);
        this.$emit("change", scores + 1);
      }
    },

    onTouchMove(event) {
      const { touchable } = this;
      if (!touchable) return;

      const { clientX } = event.touches[0];
      this.getRect(".van-rate__icon", true).then(list => {
        const target = list
          .sort(item => item.right - item.left)
          .find(item => clientX >= item.left && clientX <= item.right);
        if (target != null) {
          this.onSelect(target.dataset.score);
        }
      });
    }
  }
};
</script>

<style lang="less"></style>
