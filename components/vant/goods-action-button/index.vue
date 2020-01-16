<template>
  <van-button
    square
    :id="id"
    :lang="lang"
    :type="type"
    :color="color"
    :loading="loading"
    :disabled="disabled"
    :open-type="openType"
    :custom-class="goodactionButton"
    :business-id="businessId"
    :session-from="sessionFrom"
    :app-parameter="appParameter"
    :send-message-img="sendMessageImg"
    :send-message-path="sendMessagePath"
    :show-message-card="showMessageCard"
    :send-message-title="sendMessageTitle"
    @click="onClick"
    @error="bindError"
    @contact="bindContact"
    @opensetting="bindOpenSetting"
    @getuserinfo="bindGetUserInfo"
    @getphonenumber="bindGetPhoneNumber"
    @launchapp="bindLaunchApp"
  >
    {{ text }}
  </van-button>
</template>

<script>
import utils from "../wxs/utils";

import { link } from "../mixins/link";
import { button } from "../mixins/button";
import { openType } from "../mixins/open-type";
import { queryParentComponent } from "../common/utils";
// import { Weapp } from 'definitions/weapp';
import VanButton from "../button/index";

export default {
  name: "van-goods-action-button",
  components: { VanButton },
  mixins: [link, button, openType],
  relation: {
    type: "ancestor",
    name: "goods-action"
    // linked(parent) {
    //   this.parent = parent;
    // }
  },
  props: {
    text: String,
    color: String,
    loading: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      default: "danger"
    }
  },

  data() {
    return {
      hasParent: false,
      isFirst: false,
      isLast: false
    };
  },

  mounted() {
    this.parent = queryParentComponent(this, "van-goods-action");
    if (this.parent) {
      this.hasParent = true;
      this.parent.linked(this);
      this.updateStyle();
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
    goodactionButton() {
      // console.log(`${utils.bem('goods-action-button', [this.type, { first: this.isFirst, last: this.isLast }])}`)
      return `${utils.bem("goods-action-button", [
        this.type,
        { first: this.isFirst, last: this.isLast }
      ])}`;
    }
  },

  methods: {
    onClick(event) {
      this.$emit("click");
      this.jumpLink();
    },

    updateStyle() {
      const { children = [] } = this.parent;
      const index = children.indexOf(this);
      this.isFirst = index === 0;
      // this.isLast = index === children.length - 1
      // console.log(this.isFirst, this.isLast)
      if (index == 0) {
        console.log(index);
        this.isLast = false;
      } else {
        this.isLast = true;
      }
    }
  }
};
</script>

<style lang="less"></style>
