<template>
  <view class="van-panel van-hairline--top-bottom custom-class">
    <van-cell
      v-if="title || desc || status"
      :title="title"
      :label="desc"
      :value="status"
      :custom-class="headerClass"
      value-class="van-panel__header-value"
    />
    <slot v-else name="header" />

    <view class="van-panel__content">
      <slot />
    </view>

    <view
      v-if="useFooterSlot"
      :class="'van-panel__footer van-hairline--top ' + footerClass"
    >
      <slot name="footer" />
    </view>
  </view>
</template>

<script>
import VanCell from "../cell/index";

export default {
  name: "van-panel",
  components: { VanCell },
  // classes: ['header-class', 'footer-class'],

  props: {
    desc: String,
    title: String,
    status: String,
    useFooterSlot: Boolean,
    headerClass: {
      type: String,
      default: ""
    },
    footerClass: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less"></style>
