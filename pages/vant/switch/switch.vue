<template>
  <view class="pages-switch">
    <demo-block
      title="基础用法"
      padding
    >
      <van-switch
        :checked="checked"
        @change="onChange"
      />
    </demo-block>

    <demo-block
      title="禁用状态"
      padding
    >
      <van-switch
        :checked="checked"
        disabled
        @change="onChange"
      />
    </demo-block>

    <demo-block
      title="加载状态"
      padding
    >
      <van-switch
        :checked="checked"
        loading
        @change="onChange"
      />
    </demo-block>

    <demo-block
      title="自定义大小"
      padding
    >
      <van-switch
        :checked="checked"
        size="24px"
        @change="onChange"
      />
    </demo-block>

    <demo-block
      title="自定义颜色"
      padding
    >
      <van-switch
        :checked="checked"
        active-color="#07c160"
        inactive-color="#ee0a24"
        @change="onChange"
      />
    </demo-block>

    <demo-block
      title="异步控制"
      padding
    >
      <van-switch
        :checked="checked2"
        size="36px"
        @change="onChange2"
      />
    </demo-block>
  </view>
</template>

<script>
import DemoBlock from "@/components/app/demo-block";
import VanSwitch from "@/components/vant/switch/index.vue"

export default {
  name: 'pages-switch',
  components: { VanSwitch, DemoBlock },
  data () {
    return {
      checked: true,
      checked2: true
    }
  },
  onLoad () {

  },
  onUnload () {

  },
  methods: {
    onChange (detail) {
      this.checked = detail
    },
    onChange2 (detail) {
      uni.showModal({
        title: '提醒',
        content: '是否切换开关？',
        success: (res) => {
          if (res.confirm) {
            this.checked2 = detail
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    }
  }
}
</script>

<style lang="less">
</style>
