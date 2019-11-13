<template>
  <view class="pages-circle">
    <demo-block title="基础用法">
<!--      <van-circle :value="value" :text="value + '%'" />-->
    </demo-block>

    <demo-block title="样式定制">
<!--      <van-circle :value="value" :stroke-width="6" text="宽度定制" />-->
<!--      <van-circle :value="value" layer-color="#eee" color="#ee0a24" text="颜色定制" />-->
<!--      <van-circle :value="value" :color="gradientColor" text="渐变色" />-->
<!--      <van-circle :value="value" color="#07c160" :clockwise="false" text="逆时针" />-->
      <van-circle :value="value" :size="120" text="大小定制" />
    </demo-block>

    <van-button type="primary" size="small" @tap="run(10)">增加</van-button>
    <van-button type="danger" size="small" @tap="run(-10)">减少</van-button>
  </view>
</template>

<script>
  import DemoBlock from "../../../components/app/demo-block";
  import VanButton from "../../../components/vant/button/index";
  import VanCircle from "../../../components/vant/circle/index";

  const format = rate => Math.min(Math.max(rate, 0), 100);

  export default {
    name: 'pages-circle',
    components: {VanCircle, VanButton, DemoBlock},
    data(){
      return {
        value: 25,
        gradientColor: {
          '0%': '#ffd01e',
          '100%': '#ee0a24'
        }
      }
    },
    onLoad(){

    },
    onUnload(){

    },
    methods: {
      run(val) {
        const step = parseFloat(val);
        this.value = format((this.value += step));
      }
    }
  }
</script>

<style lang="less">
  .van-circle {
    margin: 5px 10px 20px;
  }
  .van-button{
    margin-left: 10px;
  }
</style>
