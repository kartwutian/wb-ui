<template>
  <view class="pages-stepper">

    <van-cell
      center
      title="基础用法"
    >
      <van-stepper :value="1" />
    </van-cell>

    <van-cell
      center
      title="步长设置"
    >
      <van-stepper
        v-model="value"
        step="2"
      />
    </van-cell>

    <van-cell
      center
      title="限制输入范围"
    >
      <van-stepper
        v-model="value"
        min="5"
        max="8"
      />
    </van-cell>

    <van-cell
      center
      title="限制输入整数"
    >
      <van-stepper
        v-model="value"
        integer
      />
    </van-cell>

    <van-cell
      center
      title="禁用状态"
    >
      <van-stepper
        v-model="value"
        disabled
      />
    </van-cell>

    <van-cell
      center
      title="固定小数位数"
    >
      <van-stepper
        v-model="value"
        step="0.2"
        :decimal-length="1"
      />
    </van-cell>

    <van-cell
      center
      title="自定义大小"
    >
      <van-stepper
        v-model="value"
        input-width="40px"
        button-size="32px"
      />
    </van-cell>

    <van-cell
      center
      title="异步变更"
    >
      <van-stepper
        v-model="value"
        async-change
        @change="onChange"
      />
    </van-cell>

  </view>
</template>

<script>
import DemoBlock from "@/components/app/demo-block";
import VanCell from "@/components/vant/cell/index.vue"
import VanStepper from "@/components/vant/stepper/index"

export default {
  name: 'pages-stepper',
  components: { VanStepper, VanCell, DemoBlock },
  data () {
    return {
      value: 1
    }
  },
  onLoad () {

  },
  onUnload () {

  },
  methods: {
    onChange (value) {
      uni.showLoading({
        title: "加载中..."
      })

      setTimeout(() => {
        this.value = value
        uni.hideLoading()
      }, 1000)
    }
  }
}
</script>

<style lang="less">
page {
  background-color: #fff;
}
</style>
