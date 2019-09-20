<template>
  <view class="weui-grids">
    <block v-for="(grid,index) in grids" :key="index">
      <navigator :url="grid.url" class="weui-grid" hover-class="weui-grid_active">
        <view class="weui-grid__label">
          <wb-icon :type="grid.icon"></wb-icon>
        </view>
        <view class="weui-grid__label">{{grid.name}}</view>
      </navigator>
    </block>
  </view>
</template>

<script>
  import WbIcon from "../wb-icon/wb-icon";
  export default {
    name: 'wb-grid',
    components: {WbIcon},
    props: {
      type: {
        type: String,
        default: ''
      },
      color: {
        type: String,
      },
      size: {
        type: [Number, String],
      },
      grids: {
        type: Array,
        default(){
          return [
            {
              icon: 'good',
              name: 'tabbar',
              url: '/pages/tabbar/tabbar',
            },
            {
              icon: 'good',
              name: 'grid'
            },
            {
              icon: 'good',
              name: 'grid'
            },
            {
              icon: 'good',
              name: 'grid'
            },
          ]
        }
      }
    },
    computed: {
      styles() {
        return {
          color: this.color ? this.color : 'inherit',
          'font-size': this.size ? this.size + 'rpx' : 'inherit'
        }
      }
    },
    methods: {
      onClick() {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="less">

</style>
