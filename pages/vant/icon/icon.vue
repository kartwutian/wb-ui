<template>
  <view class="pages-icon">
    <van-tabs
      :active="active"
      color="#1989fa"
      @change="onSwitch"
    >
      <van-tab
        title="基础图标"
        custom-class="demo-tab-pane"
      >
        <van-col
          v-for="(item, index) in icons.basic"
          :key="index"
          custom-class="col"
          span="6"
        >
          <van-icon
            :name="item"
            size="32px"
            custom-class="icon"
          />
          <view class="text">{{ item }}</view>
        </van-col>
      </van-tab>
      <van-tab
        title="线框风格"
        custom-class="demo-tab-pane"
      >
        <van-col
          v-for="(item, index) in icons.outline"
          :key="index"
          custom-class="col"
          span="6"
        >
          <van-icon
            :name="item"
            size="32px"
            custom-class="icon"
          />
          <view class="text">{{ item }}</view>
        </van-col>
      </van-tab>
      <van-tab
        title="实底风格"
        custom-class="demo-tab-pane"
      >
        <van-col
          v-for="(item, index) in icons.filled"
          :key="index"
          custom-class="col"
          span="6"
        >
          <van-icon
            :name="item"
            size="32px"
            custom-class="icon"
          />
          <view class="text">{{ item }}</view>
        </van-col>
      </van-tab>
    </van-tabs>
  </view>
</template>

<script>
import DemoBlock from "@/components/app/demo-block";
import VanIcon from "@/components/vant/icon/index.vue"
import VanTab from "@/components/vant/tab/index";
import VanTabs from "@/components/vant/tabs/index";

import icons from './config';
import VanCol from "@/components/vant/col/index";

export default {
  name: 'pages-icon',
  components: { VanCol, VanTabs, VanTab, VanIcon, DemoBlock },
  data () {
    return {
      icons,
      active: 0
    };
  },
  onLoad () {

  },
  onUnload () {

  },
  methods: {
    onSwitch (val) {
      this.active = val.name;
    }
  }
}
</script>

<style lang="less">
.col {
  text-align: center;
  height: 100px;
  float: none;
  display: inline-block;
  vertical-align: middle;
}

.icon {
  display: block;
  color: #323233;
  margin: 20px 0 10px;
}

.text {
  font-size: 12px;
  padding: 0 5px;
  line-height: 14px;
  color: #7d7e80;
}

.demo-tab-pane {
  margin: 20px;
  background-color: #fff;
}
</style>
