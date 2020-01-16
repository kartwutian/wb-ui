<template>
  <view class="van-tree-select" :style="'height: ' + mainHeight + 'px;'">
    <scroll-view
      scroll-y
      class="van-tree-select__nav"
      :style="'height: ' + mainHeight + 'px;'"
    >
      <view
        v-for="(item, index) in items"
        :key="index"
        :class="
          'van-ellipsis ' +
            mainItemClass +
            ' ' +
            $utils.bem('tree-select__nitem', {
              active: mainActiveIndex === index,
              disabled: item.disabled
            }) +
            ' ' +
            (mainActiveIndex === index ? mainActiveClass : '') +
            ' ' +
            (item.disabled ? mainDisabledClass : '')
        "
        @tap="onClickNav(index)"
      >
        {{ item.text }}
      </view>
    </scroll-view>
    <scroll-view
      scroll-y
      class="van-tree-select__content"
      :style="'height: ' + itemHeight + 'px;'"
    >
      <slot name="content" />
      <view
        v-for="it in subItems"
        :key="it.id"
        :class="
          'van-ellipsis van-hairline--bottom ' +
            contentItemClass +
            ' ' +
            $utils.bem('tree-select__item', {
              active: Array.isArray(activeId)
                ? activeId.indexOf(it.id) > -1
                : activeId === it.id,
              disabled: it.disabled
            }) +
            ' ' +
            ((Array.isArray(activeId)
            ? activeId.indexOf(it.id) > -1
            : activeId === it.id)
              ? contentActiveClass
              : '') +
            ' ' +
            (it.disabled ? contentDisabledClass : '')
        "
        @tap="onSelectItem(it)"
      >
        {{ it.text }}
        <van-icon
          v-if="
            Array.isArray(activeId)
              ? activeId.indexOf(it.id) > -1
              : activeId === it.id
          "
          name="checked"
          size="32rpx"
          class="van-tree-select__selected"
        />
      </view>
    </scroll-view>
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";
import { set } from "../mixins/set";
import VanIcon from "../icon/index";

// import { Weapp } from 'definitions/weapp';

const ITEM_HEIGHT = 44;

export default {
  name: "van-tree-select",
  components: { VanIcon },
  mixins: [basic, set],
  // classes: [
  //   'main-item-class',
  //   'content-item-class',
  //   'main-active-class',
  //   'content-active-class',
  //   'main-disabled-class',
  //   'content-disabled-class'
  // ],

  props: {
    items: Array,
    activeId: null,
    mainItemClass: {
      type: String,
      default: ""
    },
    contentItemClass: {
      type: String,
      default: ""
    },
    mainActiveClass: {
      type: String,
      default: ""
    },
    contentActiveClass: {
      type: String,
      default: ""
    },
    mainDisabledClass: {
      type: String,
      default: ""
    },
    contentDisabledClass: {
      type: String,
      default: ""
    },
    mainActiveIndex: {
      type: Number,
      default: 0
    },
    maxHeight: {
      type: Number,
      default: 300
    },
    max: {
      type: Number,
      default: Infinity
    }
  },

  data() {
    return {
      subItems: [],
      mainHeight: 0,
      itemHeight: 0
    };
  },

  mounted() {
    this.updateSubItems();
    this.updateMainHeight();
  },

  watch: {
    items() {
      this.updateSubItems();
      this.updateMainHeight();
    },

    maxHeight() {
      this.updateItemHeight(this.subItems);
      this.updateMainHeight();
    },

    mainActiveIndex: "updateSubItems"
  },

  methods: {
    // 当一个子项被选择时
    onSelectItem(item) {
      const isArray = Array.isArray(this.activeId);
      // 判断有没有超出右侧选择的最大数
      const isOverMax = isArray && this.activeId.length >= this.max;
      // 判断该项有没有被选中, 如果有被选中，则忽视是否超出的条件
      const isSelected = isArray
        ? this.activeId.indexOf(item.id) > -1
        : this.activeId === item.id;
      if (!item.disabled && (!isOverMax || isSelected)) {
        this.$emit("click-item", item);
      }
    },

    // 当一个导航被点击时
    onClickNav(index) {
      const item = this.items[index];
      if (!item.disabled) {
        this.$emit("click-nav", { index });
      }
    },

    // 更新子项列表
    updateSubItems() {
      const { items, mainActiveIndex } = this;
      const { children = [] } = items[mainActiveIndex] || {};
      this.$set(this, "subItems", children);
      this.updateItemHeight(children);
    },

    // 更新组件整体高度，根据最大高度和当前组件需要展示的高度来决定
    updateMainHeight() {
      setTimeout(() => {
        const { items = [], subItems = [] } = this;
        const maxHeight = Math.max(
          items.length * ITEM_HEIGHT,
          subItems.length * ITEM_HEIGHT
        );
        this.mainHeight = Math.min(maxHeight, this.maxHeight);
      });
    },

    // 更新子项列表高度，根据可展示的最大高度和当前子项列表的高度决定
    updateItemHeight(subItems) {
      const itemHeight = Math.min(
        subItems.length * ITEM_HEIGHT,
        this.maxHeight
      );

      return (this.itemHeight = itemHeight);
    }
  }
};
</script>

<style lang="less"></style>
