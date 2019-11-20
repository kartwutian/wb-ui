<template>
  <view class="pages-collapse">
    <demo-block title="基础用法">
      <van-collapse v-model="active1">
        <van-collapse-item :title="title1">{{ content1 }}</van-collapse-item>
        <van-collapse-item :title="title2">{{ content2 }}</van-collapse-item>
        <van-collapse-item
          :title="title3"
          disabled
        >{{ content3 }}</van-collapse-item>
      </van-collapse>
    </demo-block>
    <demo-block title="手风琴">
      <van-collapse
        v-model="active2"
        accordion
      >
        <van-collapse-item :title="title1">{{ content1 }}</van-collapse-item>
        <van-collapse-item :title="title2">{{ content2 }}</van-collapse-item>
        <van-collapse-item :title="title3">{{ content3 }}</van-collapse-item>
      </van-collapse>
    </demo-block>
    <demo-block title="自定义标题内容">
      <van-collapse v-model="active3">
        <van-collapse-item>
          <view slot="title">
            {{ title1 }}
            <van-icon
              name="question-o"
              custom-class="van-icon-question"
            />
          </view>
          {{ content1 }}
        </van-collapse-item>
        <van-collapse-item
          :title="title2"
          value="内容"
          icon="shop-o"
        >
          {{ content2 }}
        </van-collapse-item>
      </van-collapse>
    </demo-block>
  </view>
</template>

<script>
import DemoBlock from "@/components/app/demo-block";
import VanCollapse from "@/components/vant/collapse/index";
import VanCollapseItem from "@/components/vant/collapse-item/index";
import VanIcon from "@/components/vant/icon/index";

export default {
  name: 'pages-collapse',
  components: { VanIcon, VanCollapseItem, VanCollapse, DemoBlock },
  data () {
    return {
      active1: [0],
      active2: 0,
      active3: [],
      title1: '有赞微商城',
      title2: '有赞零售',
      title3: '有赞美业',
      content1: '提供多样店铺模板，快速搭建网上商城',
      content2: '网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失',
      content3: '线上拓客，随时预约，贴心顺手的开单收银'
    };
  },
  onLoad () {

  },
  onUnload () {

  },
  methods: {

  }
}
</script>

<style lang="less">
.van-icon-question {
  margin-left: 5px;
  font-size: 15px !important;
  color: #1989fa;
  vertical-align: -3px;
}
</style>
