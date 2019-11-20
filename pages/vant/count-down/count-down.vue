<template>
  <view class="pages-count-down">
    <demo-block title="基础用法">
      <van-count-down :time="time" />
    </demo-block>

    <demo-block title="自定义格式">
      <van-count-down
        :time="time"
        format="DD 天 HH 时 mm 分 ss 秒"
      />
    </demo-block>

    <demo-block title="毫秒级渲染">
      <van-count-down
        millisecond
        :time="time"
        format="HH:mm:ss:SSS"
      />
    </demo-block>

    <demo-block title="自定义样式">
      <van-count-down
        use-slot
        :time="time"
        @change="onChange"
      >
        <text class="item">{{ timeData.hours }}</text>
        <text class="item">{{ timeData.minutes }}</text>
        <text class="item">{{ timeData.seconds }}</text>
      </van-count-down>
    </demo-block>

    <demo-block title="手动控制">
      <van-count-down
        ref="control-count-down"
        millisecond
        :time="3000"
        :auto-start="false"
        format="ss:SSS"
        @finish="finished"
      />

      <van-grid
        clickable
        column-num="3"
      >
        <van-grid-item
          text="开始"
          icon="play-circle-o"
          @click="start"
        />
        <van-grid-item
          text="暂停"
          icon="pause-circle-o"
          @click="pause"
        />
        <van-grid-item
          text="重置"
          icon="replay"
          @click="reset"
        />
      </van-grid>
    </demo-block>
  </view>
</template>

<script>
import DemoBlock from "@/components/app/demo-block";
import VanGrid from "@/components/vant/grid/index";
import VanGridItem from "@/components/vant/grid-item/index";
import VanCountDown from "@/components/vant/count-down/index";

export default {
  name: 'pages-count-down',
  components: { VanCountDown, VanGridItem, VanGrid, DemoBlock },
  data () {
    return {
      time: 30 * 60 * 60 * 1000,
      timeData: {}
    };
  },
  onLoad () {

  },
  onUnload () {

  },
  methods: {
    onChange (timeData) {
      this.timeData = timeData;
    },

    start () {
      const countDown = this.$refs['control-count-down'];
      countDown.start();
    },

    pause () {
      const countDown = this.$refs['control-count-down'];
      countDown.pause();
    },

    reset () {
      const countDown = this.$refs['control-count-down'];
      countDown.reset();
    },

    finished () {
      console.log('倒计时结束')
    }
  }
}
</script>

<style lang="less">
.pages-count-down {
  .van-count-down {
    margin: 0 16px 10px;
  }

  .item {
    display: inline-block;
    width: 22px;
    margin-right: 5px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background-color: #1989fa;
    border-radius: 2px;
  }
}
</style>
