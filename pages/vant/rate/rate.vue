<template>
  <view class="pages-rate">
    <demo-block title="基础用法">
      <van-rate
        custom-class="van-rate"
        :value="value.value1"
      />
    </demo-block>

    <demo-block title="自定义图标">
      <van-rate
        custom-class="van-rate"
        icon="like"
        void-icon="like-o"
        :value="value.value2"
      />
    </demo-block>

    <demo-block title="自定义样式">
      <van-rate
        custom-class="van-rate"
        :value="value.value3"
        size="25"
        color="#ee0a24"
        void-color="#eee"
        void-icon="star"
        @change="onChange"
      />
    </demo-block>

    <demo-block title="半星">
      <van-rate
        custom-class="van-rate"
        :value="value.value4"
        size="25"
        allow-half
        color="#ee0a24"
        void-color="#eee"
        void-icon="star"
        @change="onChange"
      />
    </demo-block>

    <demo-block title="自定义数量">
      <van-rate
        custom-class="van-rate"
        :value="value.value5"
        :count="6"
        @change="onChange"
      />
    </demo-block>

    <demo-block title="禁用状态">
      <van-rate
        custom-class="van-rate"
        :value="value.value6"
        disabled
      />
    </demo-block>

    <demo-block title="只读状态">
      <van-rate
        custom-class="van-rate"
        :value="value.value6"
        readonly
      />
    </demo-block>
  </view>
</template>

<script>
import DemoBlock from "@/components/app/demo-block";
import VanRate from "@/components/vant/rate/index.vue"

export default {
  name: 'pages-rate',
  components: { VanRate, DemoBlock },
  data () {
    return {
      value: {
        value1: 3,
        value2: 3,
        value3: 3,
        value4: 2.5,
        value5: 4,
        value6: 3
      }
    }
  },
  onLoad () {

  },
  onUnload () {

  },
  methods: {
    onChange (event) {
      console.log(event)
    }
  }
}
</script>

<style lang="less">
page {
  background-color: #fff;
}

.van-rate {
  margin-left: 15px;
}
</style>
