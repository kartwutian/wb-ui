<template>
    <template name="toolbar">
  <view
    v-if=" showToolbar "
    class="van-picker__toolbar van-hairline--top-bottom toolbar-class"
  >
    <view
      class="van-picker__cancel"
      hover-class="van-picker__cancel--hover"
      hover-stay-time="70"
      data-type="cancel"
      bindtap="emit"
    >
      {{ cancelButtonText }}
    </view>
    <view v-if=" title " class="van-picker__title van-ellipsis">{{ title }}</view>
    <view
      class="van-picker__confirm"
      hover-class="van-picker__confirm--hover"
      hover-stay-time="70"
      data-type="confirm"
      bindtap="emit"
    >
      {{ confirmButtonText }}
    </view>
  </view>
</template>

<view class="van-picker custom-class">
  <template is="toolbar" v-if=" toolbarPosition === 'top' " :data=" showToolbar, cancelButtonText, title, confirmButtonText "></template>
  <view v-if=" loading " class="van-picker__loading">
    <loading color="#1989fa"/>
  </view>
  <view
    class="van-picker__columns"
    style="height: {{ itemHeight * visibleItemCount }}px"
    catch:touchmove="noop"
  >
    <picker-column
      class="van-picker__column"
      v-for=" isSimple(columns) ? [columns] : columns "
      ::key=" index "
      :data-index=" index "
      custom-class="column-class"
      :value-key=" valueKey "
      :initial-options=" isSimple(columns) ? item : item.values "
      :default-index=" item.defaultIndex || defaultIndex "
      :item-height=" itemHeight "
      :visible-item-count=" visibleItemCount "
      active-class="active-class"
      @change="onChange"
    />
    <view
      class="van-picker__frame van-hairline--top-bottom"
      style="height: {{ itemHeight }}px"
    />
  </view>
  <template is="toolbar" v-if=" toolbarPosition === 'bottom' " :data=" showToolbar, cancelButtonText, title, confirmButtonText "></template>
</view>

<wxs module="isSimple">
  function isSimple(columns) {
    return columns.length && !columns[0].values;
  }
  module.exports = isSimple;
</wxs>

</template>

<script>
    export const pickerProps = {
  title: String,
  loading: Boolean,
  showToolbar: Boolean,
  cancelButtonText: {
    type: String,
    value: '取消'
  },
  confirmButtonText: {
    type: String,
    value: '确认'
  },
  visibleItemCount: {
    type: Number,
    value: 5
  },
  itemHeight: {
    type: Number,
    value: 44
  }
};

</script>

<style lang="less">

</style>
