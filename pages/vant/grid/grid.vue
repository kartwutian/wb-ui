<template>
  <view class="pages-grid">

    <demo-block title="基本用法">
      <van-grid>
        <van-grid-item
          icon="photo-o"
          text="文字"
          v-for="value in 4"
          :key="value"
        />
      </van-grid>
    </demo-block>

    <demo-block title="自定义列数">
      <van-grid :column-num="3">
        <van-grid-item
          icon="photo-o"
          text="文字"
          v-for="value in 6"
          :key="value"
        />
      </van-grid>
    </demo-block>

    <demo-block title="自定义内容">
      <van-grid
        :column-num="3"
        :border="false"
      >
        <van-grid-item
          use-slot
          v-for="(value,index) in 3"
          :key="index"
        >
          <image
            style="width: 100%; height: 90px;"
            :src="'https://img.yzcdn.cn/vant/apple-' +(index + 1) + '.jpg'"
          />
        </van-grid-item>
      </van-grid>
    </demo-block>

    <demo-block title="正方形格子">
      <van-grid square>
        <van-grid-item
          icon="photo-o"
          text="文字"
          v-for="value in 8"
          :key="value"
        />
      </van-grid>
    </demo-block>

    <demo-block title="格子间距">
      <van-grid :gutter="10">
        <van-grid-item
          icon="photo-o"
          text="文字"
          v-for="value in 8"
          :key="value"
        />
      </van-grid>
    </demo-block>

    <demo-block title="页面跳转">
      <van-grid
        clickable
        :column-num="2"
      >
        <van-grid-item
          icon="home-o"
          link-type="navigateTo"
          url="/pages/vant/tabbar/tabbar"
          text="Navigate 跳转"
        />
        <van-grid-item
          icon="search"
          link-type="reLaunch"
          url="/pages/vant/tabbar/tabbar"
          text="ReLaunch 跳转"
        />
      </van-grid>
    </demo-block>

    <demo-block title="提示信息">
      <van-grid :column-num="2">
        <van-grid-item
          icon="home-o"
          text="文字"
          dot
        />
        <van-grid-item
          icon="search"
          text="文字"
          info="99+"
        />
      </van-grid>
    </demo-block>
  </view>
</template>

<script>
import DemoBlock from "@/components/app/demo-block";
import VanGrid from "@/components/vant/grid/index.vue"
import VanGridItem from "@/components/vant/grid-item/index.vue"
export default {
  name: 'pages-grid',
  components: { VanGridItem, VanGrid, DemoBlock },
  onLoad () {

  },
  onUnload () {

  },
  methods: {
  }
}
</script>

<style lang="less">
</style>
