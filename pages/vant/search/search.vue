<template>
  <view class="pages-search">
    <demo-block title="基本用法">
      <van-search
        :value="value"
        placeholder="请输入搜索关键词"
        @change="onChange"
        @search="onSearch"
      />
    </demo-block>

    <demo-block title="监听对应事件">
      <van-search
        :value="value"
        show-action
        placeholder="请输入搜索关键词"
        @change="onChange"
        @search="onSearch"
        @cancel="onCancel"
        @clear="onClear"
      />
    </demo-block>

    <demo-block title="高级用法">
      <van-search
        :value="value"
        placeholder="请输入搜索关键词"
        use-action-slot
        @change="onChange"
        @search="onSearch"
        label="地址"
        shape="round"
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
    onSearch (e) {
      console.log("搜索")
    },
    onCancel () {
      console.log("取消")
    },
    onClear () {
      console.log("清空")
    }
  }
}
</script>

<style lang="less">
</style>
