<template>
  <view class="pages-progress">
    <demo-block title="基础用法">
      <van-progress :percentage = percentage />
    </demo-block>
    <demo-block title="线条粗细">
      <van-progress :percentage= percentage :stroke-width="8" />
    </demo-block>
    <demo-block title="置灰">
      <van-progress inactive :percentage = percentage />
    </demo-block>
    <demo-block title="样式定制">
      <view class="pages-progress__linesPadding">
        <van-progress
          pivot-text="橙色"
          color="#f2826a"
          :percentage="25"
        />
      </view>
      <view class="pages-progress__linesPadding">
        <van-progress
          pivot-text="红色"
          color="#ee0a24"
          :percentage="50"
        />
      </view>
      <view class="pages-progress__linesPadding">
        <van-progress
          :percentage="75"
          pivot-text="紫色"
          pivot-color="#7232dd"
          color="linear-gradient(to right, #be99ff, #7232dd)"
        />
      </view>
    </demo-block>
    
  </view>
</template>

<script>
  import DemoBlock from "../../../components/app/demo-block";
  import VanProgress from "../../../components/vant/progress/index.vue"

  export default {
    name: 'pages-progress',
    components: { DemoBlock, VanProgress },
    data() {
      return {
        percentage: 50,
      }
    },
    onLoad(){

    },
    onUnload(){

    },
    methods: {

    }
  }
</script>

<style lang="less">
.pages-progress__linesPadding{
  padding: 24px 0;
}
</style>
