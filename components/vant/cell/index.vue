<template>
  <view
    :class="classes"
    :hover-class="'van-cell--hover ' + hoverClass"
    :hover-stay-time="70"
    :style="customStyle"
    @tap="onClick"
  >
    <van-icon
      v-if="icon"
      :name="icon"
      class="van-cell__left-icon-wrap"
      custom-class="van-cell__left-icon"
    />
    <slot v-else name="icon" />

    <view
      :style="
        titleWidth ? 'max-width:' + titleWidth + ';min-width:' + titleWidth : ''
      "
      :class="'van-cell__title ' + titleClass"
    >
      <block v-if="title">{{ title }}</block>
      <slot v-else name="title" />

      <view
        v-if="label || useLabelSlot"
        :class="'van-cell__label ' + labelClass"
      >
        <slot v-if="useLabelSlot" name="label" />
        <block v-else-if="label">{{ label }}</block>
      </view>
    </view>

    <view :class="'van-cell__value ' + valueClass">
      <block v-if="value || value === 0">{{ value }}</block>
      <slot v-else />
    </view>

    <van-icon
      v-if="isLink"
      :name="arrowDirection ? 'arrow' + '-' + arrowDirection : 'arrow'"
      :class="'van-cell__right-icon-wrap ' + rightIconClass"
      custom-class="van-cell__right-icon"
    />
    <slot v-else name="right-icon" />
    <slot name="extra" />
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";
import { link } from "../mixins/link";
import VanIcon from "../icon/index";

export default {
  // classes: [
  //   'title-class',
  //   'label-class',
  //   'value-class',
  //   'right-icon-class',
  //   'hover-class'
  // ],

  name: "van-cell",
  components: { VanIcon },
  mixins: [basic, link],

  props: {
    title: null,
    value: null,
    icon: String,
    size: String,
    label: String,
    center: Boolean,
    isLink: Boolean,
    required: Boolean,
    clickable: Boolean,
    titleWidth: String,
    customStyle: String,
    titleClass: {
      type: String,
      default: ""
    },
    labelClass: {
      type: String,
      default: ""
    },
    valueClass: {
      type: String,
      default: ""
    },
    rightIconClass: {
      type: String,
      default: ""
    },
    hoverClass: {
      type: String,
      default: ""
    },
    arrowDirection: String,
    useLabelSlot: Boolean,
    border: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    classes() {
      return `${this.customClass} ${utils.bem("cell", [
        this.size,
        {
          center: this.center,
          required: this.required,
          borderless: !this.border,
          clickable: this.isLink || this.clickable
        }
      ])}`;
    }
  },

  methods: {
    onClick(event) {
      // console.log(event)
      this.$emit("click", event.detail);
      this.jumpLink();
    }
  }
};
</script>

<style lang="less"></style>
