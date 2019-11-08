<template>
  <view class="pages-search">
    <demo-block title="基本用法">
      <van-search
        placeholder="请输入搜索关键词"
        v-model="value"
      />
    </demo-block>

    <demo-block title="监听对应事件">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @cancel="onCancel"
      />
    </demo-block>

    <demo-block title="高级用法">

      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        use-action-slot
        shape="round"
        label="地址"
      >
        <view
          slot="action"
          @tap="onSearch"
        >搜索</view>
      </van-search>
    </demo-block>

  </view>
</template>

<script>
import DemoBlock from "../../../components/app/demo-block";
import VanSearch from "../../../components/vant/search/index.vue"
import { timeout } from 'q';

export default {
  name: 'pages-search',
  components: { VanSearch, DemoBlock },
  data () {
    return {
      value: ""
    }
  },
  onLoad () {

  },
  onUnload () {

  },
  methods: {
    onChange (e) {
      console.log(e)
    },
    onSearch (val) {
      uni.showToast({
        title: '搜索',
        icon: 'none'
      })
      // console.log(val)
      // console.log("搜索")
    },
    onCancel () {
      uni.showToast({
        title: '取消',
        icon: 'none'
      })
    },
    onClear () {
      console.log("清空")
    }
  }
}
</script>

<style lang="less">
</style>
