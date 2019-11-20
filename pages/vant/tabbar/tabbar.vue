<template>
  <view class="pages-tabbar">
    <demo-block title="基础用法">
      <van-tabbar
        :active="active.active1"
        custom-class="tabbar"
        :safe-area-inset-bottom="false"
        @change="onChange1"
      >
        <van-tabbar-item icon="home-o">标签</van-tabbar-item>
        <van-tabbar-item icon="search">标签</van-tabbar-item>
        <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
        <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
      </van-tabbar>
    </demo-block>

    <demo-block title="通过名称匹配">
      <van-tabbar
        :active="active.active2"
        custom-class="tabbar"
        :safe-area-inset-bottom="false"
        @change="onChange2"
      >
        <van-tabbar-item
          name="home"
          icon="home-o"
        >标签</van-tabbar-item>
        <van-tabbar-item
          name="search"
          icon="search"
        >标签</van-tabbar-item>
        <van-tabbar-item
          name="friends"
          icon="friends-o"
        >标签</van-tabbar-item>
        <van-tabbar-item
          name="setting"
          icon="setting-o"
        >标签</van-tabbar-item>
      </van-tabbar>
    </demo-block>

    <demo-block title="显示徽标">
      <van-tabbar
        :active="active.active3"
        custom-class="tabbar"
        :safe-area-inset-bottom="false"
        @change="onChange3"
      >
        <van-tabbar-item icon="home-o">标签</van-tabbar-item>
        <van-tabbar-item
          icon="search"
          dot
        >标签</van-tabbar-item>
        <van-tabbar-item
          icon="friends-o"
          info="5"
        >标签</van-tabbar-item>
        <van-tabbar-item
          icon="setting-o"
          info="20"
        >标签</van-tabbar-item>
      </van-tabbar>
    </demo-block>

    <demo-block title="自定义图标">
      <van-tabbar
        :active="active.active4"
        custom-class="tabbar"
        :safe-area-inset-bottom="false"
        @change="onChange4"
      >
        <van-tabbar-item info="3">
          <image
            slot="icon"
            :src="icon.normal"
            mode="aspectFit"
            style="width: 30px; height: 18px;"
          />
          <image
            slot="icon-active"
            :src="icon.active"
            mode="aspectFit"
            style="width: 30px; height: 18px;"
          />
          自定义
        </van-tabbar-item>
        <van-tabbar-item icon="search">标签</van-tabbar-item>
        <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
      </van-tabbar>
    </demo-block>

    <demo-block title="自定义颜色">
      <van-tabbar
        :active="active.active5"
        custom-class="tabbar"
        active-color="#07c160"
        inactive-color="#000"
        :safe-area-inset-bottom="false"
        @change="onChange5"
      >
        <van-tabbar-item icon="home-o">标签</van-tabbar-item>
        <van-tabbar-item icon="search">标签</van-tabbar-item>
        <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
        <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
      </van-tabbar>
    </demo-block>
  </view>
</template>

<script>
import DemoBlock from "@/components/app/demo-block";
import VanTabbar from "@/components/vant/tabbar/index"
import VanTabbarItem from "../../../components/vant/tabbar-item/index"

export default {
  name: 'pages-tabbar',
  components: { VanTabbarItem, VanTabbar, DemoBlock },
  data () {
    return {
      active: {
        active1: 0,
        active2: 'home',
        active3: 0,
        active4: 0,
        active5: 0,
      },
      icon: {
        normal: 'https://img.yzcdn.cn/vant/user-inactive.png',
        active: 'https://img.yzcdn.cn/vant/user-active.png'
      }
    }
  },
  onLoad () {

  },
  onUnload () {

  },
  methods: {
    onChange1 (event) {
      this.changeActive(event, 1)
    },
    onChange2 (event) {
      this.changeActive(event, 2)
    },
    onChange3 (event) {
      this.changeActive(event, 3)
    },
    onChange4 (event) {
      this.changeActive(event, 4)
    },
    onChange5 (event) {
      this.changeActive(event, 5)
    },
    changeActive (event, val) {
      this.active[`active${val}`] = event
    }
  }
}
</script>

<style lang="less">
.tabbar {
  position: relative !important;
}
</style>
