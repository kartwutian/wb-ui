<template>
  <view
    :class="tabbarItem"
    :style="'color:' + (active ? activeColor : inactiveColor)"
    @tap="onClick"
  >
    <view :class="tabbarItemIcon">
      <van-icon v-if="icon" :name="icon" custom-style="display: block" />
      <block v-else>
        <slot v-if="active" name="icon-active" />
        <slot v-else name="icon" />
      </block>
      <van-info
        v-if="info !== null"
        :info="info"
        custom-style="margin-top: 4rpx"
      />
    </view>
    <view class="van-tabbar-item__text">
      <slot />
    </view>
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";
import { set } from "../mixins/set";
import { queryParentComponent } from "../common/utils";
import VanIcon from "../icon/index";
import VanInfo from "../info/index";

export default {
  name: "van-tabbar-item",
  components: { VanIcon, VanInfo },
  mixins: [basic, set],
  props: {
    info: null,
    name: null,
    icon: String,
    dot: Boolean
  },

  relation: {
    name: "tabbar",
    type: "ancestor" //祖先
  },

  data() {
    return {
      active: false,
      inactiveColor: "",
      activeColor: "",
      hasParent: false // 标记是否有父元素
    };
  },

  mounted() {
    this.parent = queryParentComponent(this, "van-tabbar");
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

  computed: {
    tabbarItem() {
      return `${utils.bem("tabbar-item", { active: this.active })} ${
        this.customClass
      }`;
    },
    tabbarItemIcon() {
      return `${utils.bem("tabbar-item__icon", { dot: this.dot })}`;
    }
  },

  methods: {
    onClick() {
      if (this.parent) {
        this.parent.onChange(this);
      }
      this.$emit("click");
    },

    updateFromParent() {
      const { parent } = this;
      if (!parent) {
        return;
      }

      const index = parent.children.indexOf(this);
      const parentData = parent;
      const active = (this.name || index) === parentData.active;
      // const patch: { [key: string]: any } = {};
      const patch = {};

      if (active !== this.active) {
        patch.active = active;
      }
      if (parentData.activeColor !== this.activeColor) {
        patch.activeColor = parentData.activeColor;
      }
      if (parentData.inactiveColor !== this.inactiveColor) {
        patch.inactiveColor = parentData.inactiveColor;
      }

      return Object.keys(patch).length > 0
        ? this.set(patch)
        : Promise.resolve();
    }
  }
};
</script>

<style lang="less"></style>
