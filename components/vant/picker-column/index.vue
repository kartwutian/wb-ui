<template>
  <view
    :class="'van-picker-column ' + customClass"
    :style="'height:' + itemHeight * visibleItemCount + 'px'"
    @touchstart="onTouchStart"
    @touchmove.prevent="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
  >
    <view
      :style="
        'transition: transform ' +
          duration +
          ' ms; line-height:' +
          itemHeight +
          'px; transform: translate3d(0,' +
          (offset + (itemHeight * (visibleItemCount - 1)) / 2) +
          'px, 0)'
      "
    >
      <view
        v-for="(option, index) in options"
        :key="index"
        :style="'height:' + itemHeight + ' px'"
        :class="
          'van-ellipsis van-picker-column__item ' +
            (option && option.disabled
              ? 'van-picker-column__item--disabled'
              : '') +
            (index === currentIndex
              ? 'van-picker-column__item--selected ' + activeClass
              : '')
        "
        @tap="onClickItem(index)"
        >{{ getOptionText(option.text ? option.text : option, valueKey) }}</view
      >
    </view>
  </view>
</template>

<script>
import { isObj, range } from "../common/utils";
import { set } from "../mixins/set";
import { basic } from "../mixins/basic";
// import { Weapp } from 'definitions/weapp';

const DEFAULT_DURATION = 200;

export default {
  name: "van-picker-column",
  mixins: [set, basic],
  // classes: ['active-class'],

  props: {
    valueKey: String,
    className: String,
    itemHeight: Number,
    visibleItemCount: Number,
    initialOptions: {
      type: Array,
      default: []
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    activeClass: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      startY: 0,
      offset: 0,
      duration: 0,
      startOffset: 0,
      options: [],
      currentIndex: 0
    };
  },

  beforeCreate() {
    this.$nextTick(() => {
      const { defaultIndex, initialOptions } = this;
      this.currentIndex = defaultIndex;
      this.options = this.initialOptions;
      this.setIndex(defaultIndex);
    });
  },

  watch: {
    defaultIndex(value) {
      this.setIndex(value);
    }
  },

  methods: {
    getCount() {
      return this.options.length;
    },

    onTouchStart(event) {
      this.startY = event.touches[0].clientY;
      this.startOffset = this.offset;
      this.duration = 0;
    },

    onTouchMove(event) {
      const deltaY = event.touches[0].clientY - this.startY;
      this.offset = range(
        this.startOffset + deltaY,
        -(this.getCount() * this.itemHeight),
        this.itemHeight
      );
    },

    onTouchEnd() {
      if (this.offset !== this.startOffset) {
        this.duration = DEFAULT_DURATION;

        const index = range(
          Math.round(-this.offset / this.itemHeight),
          0,
          this.getCount() - 1
        );
        this.setIndex(index, true);
      }
    },

    onClickItem(index) {
      this.setIndex(index, true);
    },

    adjustIndex(index) {
      const count = this.getCount();

      index = range(index, 0, count);
      for (let i = index; i < count; i++) {
        if (!this.isDisabled(this.options[i])) return i;
      }
      for (let i = index - 1; i >= 0; i--) {
        if (!this.isDisabled(this.options[i])) return i;
      }
    },

    isDisabled(option) {
      return isObj(option) && option.disabled;
    },

    getOptionText(option) {
      return isObj(option) && this.valueKey in option
        ? option[this.valueKey]
        : option;
    },

    setIndex(index, userAction) {
      index = this.adjustIndex(index) || 0;
      const offset = -index * this.itemHeight;
      if (index !== this.currentIndex) {
        return this.set({ offset, currentIndex: index }).then(() => {
          userAction && this.$emit("change", index);
        });
      }

      return this.set({ offset });
    },

    setValue(value) {
      const { options } = this;
      for (let i = 0; i < options.length; i++) {
        if (this.getOptionText(options[i]) === value) {
          return this.setIndex(i);
        }
      }
      return Promise.resolve();
    },

    getValue() {
      return this.options[this.currentIndex];
    }
  }
};
</script>

<style lang="less"></style>
