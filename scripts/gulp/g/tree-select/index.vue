<template>
    <wxs src="../wxs/utils.wxs" module="utils" />
<wxs src="./index.wxs" module="wxs" />

<view
  class="van-tree-select"
  style="height: {{ mainHeight }}px"
>
  <scroll-view scroll-y class="van-tree-select__nav">
    <view
      v-for=" items "
      :key="index"
      class="van-ellipsis main-item-class {{ utils.bem('tree-select__nitem', { active: mainActiveIndex === index, disabled: item.disabled }) }} {{ mainActiveIndex === index ? 'main-active-class' : '' }} {{ item.disabled ? 'main-disabled-class' : '' }}"
      :data-index=" index "
      @tap="onClickNav"
    >
      {{ item.text }}
    </view>
  </scroll-view>
  <scroll-view
    scroll-y
    class="van-tree-select__content"
    style="height: {{ itemHeight }}px"
  >
    <slot name="content" />
    <view
      v-for=" subItems "
      :key="id"
      class="van-ellipsis van-hairline--bottom content-item-class {{ utils.bem('tree-select__item', { active: wxs.isActive(activeId, item.id), disabled: item.disabled }) }} {{ wxs.isActive(activeId, item.id) ? 'content-active-class' : '' }} {{ item.disabled ? 'content-disabled-class' : '' }}"
      :data-item=" item "
      @tap="onSelectItem"
    >
      {{ item.text }}
      <van-icon
        v-if=" wxs.isActive(activeId, item.id) "
        name="checked"
        size="16px"
        class="van-tree-select__selected"
      />
    </view>
  </scroll-view>
</view>

</template>

<script>
    import { VantComponent } from '../common/component';
import { Weapp } from 'definitions/weapp';

const ITEM_HEIGHT = 44;

VantComponent({
  classes: [
    'main-item-class',
    'content-item-class',
    'main-active-class',
    'content-active-class',
    'main-disabled-class',
    'content-disabled-class'
  ],

  props: {
    items: Array,
    activeId: null,
    mainActiveIndex: {
      type: Number,
      value: 0
    },
    maxHeight: {
      type: Number,
      value: 300
    },
    max: {
      type: Number,
      value: Infinity
    }
  },

  data: {
    subItems: [],
    mainHeight: 0,
    itemHeight: 0
  },

  watch: {
    items() {
      this.updateSubItems().then(() => {
        this.updateMainHeight();
      });
    },

    maxHeight() {
      this.updateItemHeight(this.data.subItems);
      this.updateMainHeight();
    },

    mainActiveIndex: 'updateSubItems'
  },

  methods: {
    // 当一个子项被选择时
    onSelectItem(event: Weapp.Event) {
      const { item } = event.currentTarget.dataset;
      const isArray = Array.isArray(this.data.activeId);
      // 判断有没有超出右侧选择的最大数
      const isOverMax = isArray && (this.data.activeId.length >= this.data.max);
      // 判断该项有没有被选中, 如果有被选中，则忽视是否超出的条件
      const isSelected = isArray ? this.data.activeId.indexOf(item.id) > -1 : this.data.activeId === item.id;

      if (!item.disabled && (!isOverMax || isSelected)) {
        this.$emit('click-item', item);
      }
    },

    // 当一个导航被点击时
    onClickNav(event: Weapp.Event) {
      const { index } = event.currentTarget.dataset;
      const item = this.data.items[index];
      if (!item.disabled) {
        this.$emit('click-nav', { index });
      }
    },

    // 更新子项列表
    updateSubItems() {
      const { items, mainActiveIndex } = this.data;
      const { children = [] } = items[mainActiveIndex] || {};

      this.updateItemHeight(children);
      return this.set({ subItems: children });
    },

    // 更新组件整体高度，根据最大高度和当前组件需要展示的高度来决定
    updateMainHeight() {
      const { items = [], subItems = [] } = this.data;
      const maxHeight = Math.max(
        items.length * ITEM_HEIGHT,
        subItems.length * ITEM_HEIGHT
      );

      this.setData({ mainHeight: Math.min(maxHeight, this.data.maxHeight) });
    },

    // 更新子项列表高度，根据可展示的最大高度和当前子项列表的高度决定
    updateItemHeight(subItems) {
      const itemHeight = Math.min(subItems.length * ITEM_HEIGHT, this.data.maxHeight);

      return this.setData({ itemHeight });
    }
  }
});

</script>

<style lang="less">

</style>
