<template>
  <view :class="customClass + ' van-card'">
    <view :class="cardHealper">
      <view class="van-card__thumb" @tap="onClickThumb">
        <image
          v-if="thumb"
          :src="thumb"
          :mode="thumbMode"
          :lazy-load="lazyLoad"
          :class="'van-card__img ' + thumbClass"
        />
        <slot name="thumb" />
        <van-tag v-if="tag" mark type="danger" custom-class="van-card__tag">
          {{ tag }}
        </van-tag>
      </view>

      <view class="van-card__content">
        <view v-if="title" :class="'van-card__title ' + titleClass">{{
          title
        }}</view>
        <slot v-else name="title" />

        <view v-if="desc" :class="'van-card__desc ' + descClass">{{
          desc
        }}</view>
        <slot v-else name="desc" />

        <slot name="tags" />

        <view class="van-card__bottom">
          <view
            v-if="price || price === 0"
            :class="'van-card__price ' + priceClass"
            >{{ currency }} {{ price }}</view
          >
          <view
            v-if="originPrice || originPrice === 0"
            :class="'van-card__origin-price ' + originpriceClass"
            >{{ currency }} {{ originPrice }}</view
          >
          <view v-if="num" :class="'van-card__num ' + numClass"
            >x {{ num }}</view
          >
          <slot name="bottom" />
        </view>
      </view>
    </view>

    <view class="van-card__footer">
      <slot name="footer" />
    </view>
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { link } from "../mixins/link";
import { basic } from "../mixins/basic";
import VanTag from "../tag/index";

export default {
  name: "van-card",
  components: { VanTag },
  // classes: [
  //   'num-class',
  //   'desc-class',
  //   'thumb-class',
  //   'title-class',
  //   'price-class',
  //   'origin-price-class',
  // ],

  mixins: [link, basic],

  props: {
    tag: String,
    num: String,
    desc: String,
    thumb: String,
    title: String,
    price: String,
    centered: Boolean,
    lazyLoad: Boolean,
    thumbLink: String,
    originPrice: String,
    thumbMode: {
      type: String,
      default: "aspectFit"
    },
    currency: {
      type: String,
      default: "¥"
    },
    numClass: {
      type: String,
      default: ""
    },
    descClass: {
      type: String,
      default: ""
    },
    thumbClass: {
      type: String,
      default: ""
    },
    titleClass: {
      type: String,
      default: ""
    },
    priceClass: {
      type: String,
      default: ""
    },
    originpriceClass: {
      type: String,
      default: ""
    }
  },

  computed: {
    cardHealper() {
      // {{ utils.bem('card__header', { center: centered }) }}
      return `${utils.bem("card__header", { center: this.centered })}`;
    }
  },

  methods: {
    onClickThumb() {
      this.$emit("click-thumb");
      this.jumpLink("thumbLink");
    }
  }
};
</script>

<style lang="less"></style>
