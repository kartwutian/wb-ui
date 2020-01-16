<template>
  <view class="van-dropdown-menu van-dropdown-menu--top-bottom">
    <view
      v-for="(item, index) in itemListData"
      :key="index"
      :class="
        'van-dropdown-menu__item ' +
          (item.disabled ? 'van-dropdown-menu__item--disabled' : '')
      "
      @tap="onTitleTap({ item, index })"
    >
      <view
        :class="
          item.titleClass +
            ' ' +
            $utils.bem('dropdown-menu__title', {
              active: item.showPopup,
              down: item.showPopup === (direction === 'down')
            })
        "
        :style="item.showPopup ? 'color:' + activeColor : ''"
      >
        <view class="van-ellipsis">
          {{ item.displayTitle }}
        </view>
      </view>
    </view>

    <slot />
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";

import { addUnit } from "../common/utils";

let ARRAY = [];

export default {
  name: "van-dropdown",
  // field: true,
  mixins: [basic],

  relation: {
    name: "dropdown-item",
    type: "descendant"
  },

  data() {
    return {
      itemListData: []
    };
  },

  props: {
    activeColor: String,
    overlay: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 10
    },
    duration: {
      type: Number,
      default: 200
    },
    direction: {
      type: String,
      default: "down"
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOutside: {
      type: Boolean,
      default: true
    }
  },

  beforeCreate() {
    this.$nextTick(() => {
      ARRAY.push(this);
      console.log(ARRAY);
    });
  },

  destroyed() {
    ARRAY = ARRAY.filter(item => item !== this);
  },

  methods: {
    linked(target) {
      this.children = this.children || [];
      // 透传 props 给 dropdown-item
      const {
        overlay,
        duration,
        activeColor,
        closeOnClickOverlay,
        direction
      } = this;
      this.updateChildData(target, {
        overlay,
        duration,
        activeColor,
        closeOnClickOverlay,
        direction,
        childIndex: this.children.length
      });

      this.children.push(target);
      // 收集 dorpdown-item 的数据

      if (target) {
        this.$nextTick(() => {
          this.itemListData = this.itemListData.concat([
            { ...target.$data, ...target.$props }
          ]);
          // console.log(this.itemListData)
        });
      }
    },
    unlinked(target) {
      this.children = this.children.filter(child => child !== target);
    },

    updateChildData(childItem, newData) {
      childItem.set(newData);
    },

    toggleItem(active) {
      console.log(this.children);
      this.children.forEach((item, index) => {
        const { showPopup } = item;
        if (index === active) {
          // 展示当前选中的drop-down-item组件
          // 控制dropdown-menu 样式变化
          this.itemListData[active].showPopup = true;
          this.toggleChildItem(item);
        } else if (showPopup) {
          // 隐藏其他未选中的drop-down-item组件
          this.toggleChildItem(item, false, { immediate: true });
        }
      });
    },

    toggleChildItem(childItem, show = true, options = {}) {
      const { showPopup, duration } = childItem;

      if (show === showPopup) {
        return;
      }
      // debugger
      const newChildData = { transition: !options.immediate, showPopup: show };

      if (!show) {
        const time = options.immediate ? 0 : duration;
        this.updateChildData(childItem, { ...newChildData });

        setTimeout(() => {
          this.updateChildData(childItem, { showWrapper: false });
        }, time);
        return;
      }

      this.getChildWrapperStyle().then((wrapperStyle = "") => {
        console.log(wrapperStyle);
        this.updateChildData(childItem, {
          ...newChildData,
          wrapperStyle,
          showWrapper: true
        });
      });
    },

    close() {
      this.children.forEach(item => {
        this.toggleChildItem(item, false, { immediate: true });
      });
    },

    getChildWrapperStyle() {
      const { windowHeight } = uni.getSystemInfoSync();
      const { zIndex, direction } = this;
      let offset = 0;

      return this.getRect(".van-dropdown-menu").then(rect => {
        const { top = 0, bottom = 0 } = rect;
        if (direction === "down") {
          offset = bottom;
        } else {
          offset = windowHeight - top;
        }

        let wrapperStyle = `z-index: ${zIndex};`;

        if (direction === "down") {
          wrapperStyle += `top: ${addUnit(offset)};`;
        } else {
          wrapperStyle += `bottom: ${addUnit(offset)};`;
        }

        return Promise.resolve(wrapperStyle);
      });
    },

    onTitleTap(detail) {
      // item ---> dropdown-item
      const { item, index } = detail;
      if (!item.disabled) {
        // menuItem ---> dropdown-menu
        ARRAY.forEach(menuItem => {
          if (menuItem && menuItem.closeOnClickOutside && menuItem !== this) {
            menuItem.close();
          }
        });
        this.toggleItem(index);
      }
    }
  }
};
</script>

<style lang="less"></style>
