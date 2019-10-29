<template>
    <wxs src="../wxs/utils.wxs" module="utils" />

<view class="custom-class van-card">
  <view class="{{ utils.bem('card__header', { center: centered }) }}">
    <view class="van-card__thumb" @tap="onClickThumb">
      <image
        v-if=" thumb "
        :src=" thumb "
        :mode=" thumbMode "
        :lazy-load=" lazyLoad "
        class="van-card__img thumb-class"
      />
      <slot name="thumb" />
      <van-tag
        v-if=" tag "
        mark
        type="danger"
        custom-class="van-card__tag"
      >
        {{ tag }}
      </van-tag>
    </view>

    <view class="van-card__content">
      <view v-if=" title " class="van-card__title title-class">{{ title }}</view>
      <slot wx:else name="title" />

      <view v-if=" desc " class="van-card__desc desc-class">{{ desc }}</view>
      <slot wx:else name="desc" />

      <slot name="tags" />

      <view class="van-card__bottom">
        <view v-if=" price || price === 0 " class="van-card__price price-class">{{ currency }} {{ price }}</view>
        <view v-if=" originPrice || originPrice === 0 " class="van-card__origin-price origin-price-class">{{ currency }} {{ originPrice }}</view>
        <view v-if=" num " class="van-card__num num-class">x {{ num }}</view>
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
    import { link } from '../mixins/link';
import { VantComponent } from '../common/component';

VantComponent({
  classes: [
    'num-class',
    'desc-class',
    'thumb-class',
    'title-class',
    'price-class',
    'origin-price-class',
  ],

  mixins: [link],

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
      value: 'aspectFit'
    },
    currency: {
      type: String,
      value: '¥'
    }
  },

  methods: {
    onClickThumb() {
      this.jumpLink('thumbLink');
    }
  }
});

</script>

<style lang="less">

</style>
