<template>
  <view :class="type==='bottom' ? 'weui-tabbar weui-tabbar_bottom' : 'weui-tabbar'">
    <view
        v-for="(tab, index) in tabs"
        :key="index"
        :class="index === current ? 'weui-tabbar__item weui-bar__item_on' : 'weui-tabbar__item'"
        @tap="onTap(index)"
    >
      <view v-if="iconType === 'img'" style="position: relative;display:inline-block;">
        <image src="../images/pic_160.png" class="weui-tabbar__img"></image>
      </view>
      <view v-if="iconType === 'icon'" :class="'weui-tabbar__icon wb-icon icon-' + tab.icon"></view>
      <view class="weui-tabbar__label">{{tab.name}}</view>
    </view>
  </view>
</template>

<script>
  import WbIcon from "../wb-icon/wb-icon";
  export default {
    name: 'wb-tabbar',
    components: {WbIcon},
    props: {
      type: {
        type: String,
        default: 'normal', // normal, bottom
      },
      iconType: {
        type: String,
        default: 'icon' // icon , img
      },
      tabs: {
        type: Array,
        default(){
          return [
            {
              name: 'title',
              icon: 'good',
            },
            {
              name: 'title',
              icon: 'good',
            },
            {
              name: 'title',
              icon: 'good',
            },
            {
              name: 'title',
              icon: 'good',
            },
          ]
        },
      },
      current: {
        type: Number,
        default: 0,
      }
    },
    methods: {
      onTap(index){
        this.$emit('change', index)
      },
    }
  }
</script>

<style lang="less">

</style>
