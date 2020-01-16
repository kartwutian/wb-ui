<template>
  <view :class="gridItem" :style="style" @tap="onClick">
    <view :class="gridItemContent">
      <block v-if="useSlot">
        <slot />
      </block>
      <block v-else>
        <view class="van-grid-item__icon">
          <van-icon v-if="icon" :name="icon" :dot="dot" :info="info" />
          <slot v-else name="icon"></slot>
        </view>
        <view class="van-grid-item__text">
          <text v-if="text">{{ text }}</text>
          <slot v-else name="text"></slot>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";
import { link } from "../mixins/link";
import { queryParentComponent } from "../common/utils";
import VanIcon from "../icon/index";

export default {
  name: "van-grid-item",
  components: { VanIcon },
  relation: {
    name: "grid",
    type: "ancestor"
  },

  mixins: [link, basic],

  props: {
    icon: String,
    dot: Boolean,
    info: null,
    text: String,
    useSlot: Boolean
  },

  data() {
    return {
      hasParent: false, // 标记是否有父元素
      style: "",
      center: "",
      border: "",
      square: "",
      gutter: "",
      clickable: ""
    };
  },

  computed: {
    gridItem() {
      return `${utils.bem("grid-item", { square: this.square })}`;
    },
    gridItemContent() {
      return `${utils.bem("grid-item__content", {
        center: this.center,
        square: this.square,
        clickable: this.clickable,
        surround: this.border && this.gutter
      })} ${this.border ? "van-hairline--surround" : ""}`;
    }
  },

  mounted() {
    this.parent = queryParentComponent(this, "van-grid");
    if (this.parent) {
      this.updateStyle();
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
    updateStyle() {
      setTimeout(() => {
        if (!this.parent) {
          return;
        }
        const { children, columnNum } = this.parent;
        const { border, square, gutter, clickable, center } = this.parent;
        const width = `${100 / columnNum}%`;

        const styleWrapper = [];
        styleWrapper.push(`width: ${width}`);

        if (square) {
          styleWrapper.push(`padding-top: ${width}`);
        }

        if (gutter) {
          styleWrapper.push(`padding-right: ${gutter}px`);

          const index = children.indexOf(this);
          if (index >= columnNum) {
            styleWrapper.push(`margin-top: ${gutter}px`);
          }
        }

        this.style = styleWrapper.join("; ");
        this.center = center;
        this.border = border;
        this.square = square;
        this.gutter = gutter;
        this.clickable = clickable;
      }, 16.7);
    },

    onClick() {
      this.$emit("click");
      this.jumpLink();
    }
  }
};
</script>

<style lang="less"></style>
