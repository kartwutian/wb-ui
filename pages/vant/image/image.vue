<template>
  <view class="pages-image">
    <demo-block title="基础用法" padding>
      <van-row>
        <van-image
            width="100"
            height="100"
            :src="src"
        />
      </van-row>
    </demo-block>

    <demo-block title="填充模式" padding>
      <van-row gutter="20">
        <van-col
            v-for="fit in fits"
            :key="fit"
            span="8"
            gutter="20"
        >
          <van-image
              :fit="fit"
              width="100%"
              height="27vw"
              :src="src"
          />
          <view class="text">{{ fit }}</view>
        </van-col>
      </van-row>
    </demo-block>

    <demo-block title="圆形图片" padding>
      <van-row gutter="20">
        <van-col
           v-for="fit in fits"
            :key="fit"
            span="8"
        >
          <van-image
              round
              :fit="fit"
              width="100%"
              height="27vw"
              :src="src"
          />
          <view class="text">{{ fit }}</view>
        </van-col>
      </van-row>
    </demo-block>

    <demo-block title="加载中提示" padding>
      <van-row gutter="20">
        <van-col span="8">
          <van-image
              width="100%"
              height="27vw"
          />
          <view class="text">默认提示</view>
        </van-col>

        <van-col span="8">
          <van-image
              width="100%"
              height="27vw"
              use-loading-slot
          >
            <van-loading
                slot="loading"
                type="spinner"
                size="20"
                vertical
            />
          </van-image>
          <view class="text">自定义提示</view>
        </van-col>
      </van-row>
    </demo-block>

    <demo-block title="加载失败提示" padding>
      <van-row gutter="20">
        <van-col span="8">
          <van-image
              width="100%"
              height="27vw"
              src="x"
          />
          <view class="text">默认提示</view>
        </van-col>

        <van-col span="8">
          <van-image
              width="100%"
              height="27vw"
              src="x"
              use-error-slot
          >
            <text slot="error">加载失败</text>
          </van-image>
          <view class="text">自定义提示</view>
        </van-col>
      </van-row>
    </demo-block>
  </view>
</template>

<script>
  import DemoBlock from "../../../components/app/demo-block";
  import VanRow from "../../../components/vant/row/index";
  import VanCol from "../../../components/vant/col/index";
  import VanLoading from "../../../components/vant/loading/index";

  export default {
    name: 'pages-image',
    components: {VanLoading, VanCol, VanRow, DemoBlock},
    data(){
      return {
        fits: ['contain', 'cover', 'fill', 'none', 'scale-down'],
        src: 'https://img.yzcdn.cn/vant/cat.jpeg',
      };
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

</style>
