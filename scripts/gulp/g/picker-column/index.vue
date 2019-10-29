<template>
    <wxs src="./index.wxs" module="getOptionText" />

<view
  class="van-picker-column custom-class"
  style="height: {{ itemHeight * visibleItemCount }}px"
  @touchstart="onTouchStart"
  catch:touchmove="onTouchMove"
  @touchend="onTouchEnd"
  @touchcancel="onTouchEnd"
>
  <view style="transition: transform {{ duration }}ms; line-height: {{ itemHeight }}px; transform: translate3d(0, {{ offset + (itemHeight * (visibleItemCount - 1)) / 2 }}px, 0)">
    <view
      v-for=" options "
      wx:for-item="option"
      :key="index"
      :data-index=" index "
      style="height: {{ itemHeight }}px"
      class="van-ellipsis van-picker-column__item {{ option && option.disabled ? 'van-picker-column__item--disabled' : '' }} {{ index === currentIndex ? 'van-picker-column__item--selected active-class' : '' }}"
      bindtap="onClickItem"
    >{{ getOptionText(option, valueKey) }}</view>
  </view>
</view>

</template>

<script>
    import { VantComponent } from '../common/component';
import { isObj, range } from '../common/utils';
import { Weapp } from 'definitions/weapp';

const DEFAULT_DURATION = 200;

VantComponent({
  classes: ['active-class'],

  props: {
    valueKey: String,
    className: String,
    itemHeight: Number,
    visibleItemCount: Number,
    initialOptions: {
      type: Array,
      value: []
    },
    defaultIndex: {
      type: Number,
      value: 0
    }
  },

  data: {
    startY: 0,
    offset: 0,
    duration: 0,
    startOffset: 0,
    options: [],
    currentIndex: 0
  },

  created() {
    const { defaultIndex, initialOptions } = this.data;

    this.set({
      currentIndex: defaultIndex,
      options: initialOptions
    }).then(() => {
      this.setIndex(defaultIndex);
    });
  },

  watch: {
    defaultIndex(value: number) {
      this.setIndex(value);
    }
  },

  methods: {
    getCount() {
      return this.data.options.length;
    },

    onTouchStart(event: Weapp.TouchEvent) {
      this.setData({
        startY: event.touches[0].clientY,
        startOffset: this.data.offset,
        duration: 0
      });
    },

    onTouchMove(event: Weapp.TouchEvent) {
      const { data } = this;
      const deltaY = event.touches[0].clientY - data.startY;
      this.setData({
        offset: range(
          data.startOffset + deltaY,
          -(this.getCount() * data.itemHeight),
          data.itemHeight
        )
      });
    },

    onTouchEnd() {
      const { data } = this;
      if (data.offset !== data.startOffset) {
        this.setData({ duration: DEFAULT_DURATION });

        const index = range(
          Math.round(-data.offset / data.itemHeight),
          0,
          this.getCount() - 1
        );
        this.setIndex(index, true);
      }
    },

    onClickItem(event: Weapp.Event) {
      const { index } = event.currentTarget.dataset;
      this.setIndex(index, true);
    },

    adjustIndex(index: number) {
      const { data } = this;
      const count = this.getCount();

      index = range(index, 0, count);
      for (let i = index; i < count; i++) {
        if (!this.isDisabled(data.options[i])) return i;
      }
      for (let i = index - 1; i >= 0; i--) {
        if (!this.isDisabled(data.options[i])) return i;
      }
    },

    isDisabled(option: any) {
      return isObj(option) && option.disabled;
    },

    getOptionText(option: any) {
      const { data } = this;
      return isObj(option) && data.valueKey in option
        ? option[data.valueKey]
        : option;
    },

    setIndex(index: number, userAction: boolean) {
      const { data } = this;
      index = this.adjustIndex(index) || 0;
      const offset = -index * data.itemHeight;

      if (index !== data.currentIndex) {
        return this.set({ offset, currentIndex: index }).then(() => {
          userAction && this.$emit('change', index);
        });
      }

      return this.set({ offset });
    },

    setValue(value: string) {
      const { options } = this.data;
      for (let i = 0; i < options.length; i++) {
        if (this.getOptionText(options[i]) === value) {
          return this.setIndex(i);
        }
      }
      return Promise.resolve();
    },

    getValue() {
      const { data } = this;
      return data.options[data.currentIndex];
    }
  }
});

</script>

<style lang="less">

</style>
