<template>
  <view class="pages-steps">

    <demo-block title="基础用法">
      <van-steps
        :steps="steps"
        :active="active"
        custom-class="demo-margin-bottom"
      />

      <van-button
        custom-class="demo-margin-left"
        @click="nextStep"
      >下一步</van-button>
    </demo-block>

    <demo-block title="自定义样式">
      <van-steps
        :steps="steps"
        :active="active"
        active-icon="success"
        active-color="#38f"
        inactive-icon="arrow"
      />
    </demo-block>

    <demo-block title="竖向步骤条">
      <van-steps
        :steps="steps"
        :active="active"
        direction="vertical"
        active-color="#ee0a24"
      />
    </demo-block>

  </view>
</template>

<script>
import DemoBlock from "@/components/app/demo-block";
import VanButton from "@/components/vant/button/index"
import VanSteps from "@/components/vant/steps/index.vue"

export default {
  name: 'pages-steps',
  components: { VanSteps, VanButton, DemoBlock },
  data () {
    return {
      active: 1,
      steps: [
        {
          text: '步骤一',
          desc: '描述信息'
        },
        {
          text: '步骤二',
          desc: '描述信息'
        },
        {
          text: '步骤三',
          desc: '描述信息'
        },
        {
          text: '步骤四',
          desc: '描述信息'
        }
      ]
    }
  },
  onLoad () {

  },
  onUnload () {

  },
  methods: {
    nextStep () {
      this.active = ++this.active % 4
    }
  }
}
</script>

<style lang="less">
</style>
