<template>
  <view class="pages-panel">

    <demo-block title="基础用法">
      <van-panel
        title="标题"
        desc="描述信息"
        status="状态"
      >
        <view class="content">内容</view>
      </van-panel>
    </demo-block>

    <demo-block title="高级用法">
      <van-panel
        title="标题"
        desc="描述信息"
        status="状态"
        use-footer-slot
      >
        <view class="content">内容</view>
        <view
          slot="footer"
          class="footer"
        >
          <van-button
            size="small"
            class="demo-margin-right"
          >按钮</van-button>
          <van-button
            size="small"
            type="danger"
          >按钮</van-button>
        </view>
      </van-panel>
    </demo-block>
  </view>
</template>

<script>
import DemoBlock from "@/components/app/demo-block";
import VanButton from "@/components/vant/button/index";
import VanPanel from '@/components/vant/panel/index';

export default {
  name: 'pages-panel',
  components: { VanPanel, VanButton, DemoBlock },
  onLoad () {

  },
  onUnload () {

  },
  methods: {

  }
}
</script>

<style lang="less">
.content {
  padding: 20px;
  font-size: 16px;
}

.footer {
  text-align: right;
}
</style>
