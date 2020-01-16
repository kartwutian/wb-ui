<template>
  <view
    :class="classes"
    hover-class="van-sidebar-item--hover"
    :hover-stay-time="70"
    @tap="onClick"
  >
    <view class="van-sidebar-item__text">
      <van-info
        v-if="info !== null || dot"
        :dot="dot"
        :info="info"
        custom-style="right: 8rpx"
      />
      {{ title }}
    </view>
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";
import { set } from "../mixins/set";
import { queryParentComponent } from "../common/utils";
import VanInfo from "../info/index";

export default {
  name: "van-sidebar-item",
  components: { VanInfo },
  mixins: [basic, set],
  relation: {
    type: "ancestor",
    name: "sidebar",
    linked(target) {
      this.parent = target;
    }
  },

  props: {
    dot: Boolean,
    info: null,
    title: String,
    disabled: {
      type: Boolean,
      default: false
    },
    activeClass: {
      type: String,
      default: ""
    },
    disabledClass: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      selected: 0,
      hasParent: false
    };
  },

  computed: {
    classes() {
      return `${utils.bem("sidebar-item", {
        selected: this.selected,
        disabled: this.disabled
      })} ${this.selected ? this.activeClass : ""} ${
        this.disabled ? this.disabledClass : ""
      } ${this.customClass}`;
    }
  },

  mounted() {
    this.parent = queryParentComponent(this, "van-sidebar");
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

  methods: {
    onClick() {
      const { parent } = this;

      if (!parent || this.disabled) {
        return;
      }

      const index = parent.children.indexOf(this);

      parent.setActive(index).then(() => {
        this.$emit("click", index);
        parent.$emit("change", index);
      });
    },

    setActive(selected) {
      return this.set({ selected });
    }
  }
};
</script>

<style lang="less"></style>
