<template>
  <view v-if="showWrapper" :class="wrapperClass" :style="wrapperStyle">
    <van-popup
      :show="showPopup"
      custom-style="position: absolute;"
      overlay-style="position: absolute;"
      :overlay="overlay"
      :name="direction === 'down' ? 'slide-down' : 'slide-up'"
      :position="direction === 'down' ? 'top' : 'bottom'"
      :duration="transition ? duration : 0"
      :close-on-click-overlay="closeOnClickOverlay"
      @close="onClickOverlay"
    >
      <van-cell
        v-for="item in options"
        :key="item.value"
        :class="
          'van-dropdown-item__option ' +
            (item.value === value ? 'van-dropdown-item__option--active' : '')
        "
        clickable
        :icon="item.icon"
        @tap="onOptionTap(item)"
      >
        <view
          slot="title"
          class="van-dropdown-item__title"
          :style="item.value === value ? 'color:' + activeColor : ''"
        >
          {{ item.text }}
        </view>
        <van-icon
          v-if="item.value === value"
          name="success"
          class="van-dropdown-item__icon"
          :color="activeColor"
        />
      </van-cell>

      <slot />
    </van-popup>
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";
import { set } from "../mixins/set";
import { queryParentComponent } from "../common/utils";
import VanPopup from "../popup/index";
import VanCell from "../cell/index";
import VanIcon from "../icon/index";

// import { Weapp } from 'definitions/weapp';

export default {
  name: "van-dropdown-item",
  field: true,
  mixins: [basic, set],
  components: { VanIcon, VanCell, VanPopup },

  relation: {
    name: "dropdown-menu",
    type: "ancestor"
  },

  props: {
    value: {
      type: null,
      default: ""
    },
    title: String,
    disabled: Boolean,
    titleClass: String,
    options: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },

  computed: {
    wrapperClass() {
      return `${utils.bem("dropdown-item", this.direction)}`;
    }
  },

  data() {
    return {
      closeOnClickOverlay: true,
      overlay: true,
      duration: 200,
      activeColor: "",
      direction: "down",
      childIndex: 0,

      transition: true,
      showPopup: false,
      showWrapper: false,
      wrapperStyle: "",
      displayTitle: "",
      hasParent: false, // 标记是否有父元素
      newData: {}
    };
  },

  mounted() {
    this.parent = queryParentComponent(this, "van-dropdown");
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

  beforeCreate() {
    this.$nextTick(() => {
      this.displayTitle = this.computedDisplayTitle(this.value);
    });
  },

  methods: {
    computedDisplayTitle(curValue) {
      const { title, options } = this;

      if (title) {
        return title;
      }

      const match = options.filter(option => option.value === curValue);
      const displayTitle = match.length ? match[0].text : "";
      console.log(displayTitle);
      return displayTitle;
    },

    onClickOverlay() {
      this.toggle();
      this.$emit("close");
    },

    onOptionTap(option) {
      let { value, displayTitle } = this;
      const { value: optionValue } = option;

      if (optionValue !== value) {
        displayTitle = this.computedDisplayTitle(optionValue);
        this.$emit("change", optionValue);
      }
      this.showPopup = false;
      this.displayTitle = displayTitle;

      // parent 中的 itemListData 是 children 上的数据的集合
      // 数据的更新由 children 各自维护，但是模板的更新需要额外触发 parent 的 数据更新
      if (this.parent) {
        const index = this.parent.children.indexOf(this);
        // 修改父级的显示文字
        this.parent.itemListData[index].displayTitle = displayTitle;
        // 还原父级样式
        this.parent.itemListData[index].showPopup = false;
      }

      const time = this.duration || 0;
      setTimeout(() => {
        this.showWrapper = false;
      }, time);
    },

    toggle() {
      const { childIndex } = this;
      this.parent.toggleItem(childIndex);
    }
  }
};
</script>

<style lang="less"></style>
