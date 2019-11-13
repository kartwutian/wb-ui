<template>
  <view class="pages-slider">
    <demo-block title="基础用法">
      <van-slider
        :value="currentValue"
        custom-class="slider"
        @change="onChange"
        @drag-start="dragStart"
        @drag-end="dragEnd"
      />
    </demo-block>

    <demo-block title="指定选择范围">
      <van-slider
        custom-class="slider"
        :min="-50"
        :max="50"
        @change="onChange"
      />
    </demo-block>

    <demo-block title="禁用">
      <van-slider
        custom-class="slider"
        v-model="currentValue"
        disabled
      />
    </demo-block>

    <demo-block title="指定步长">
      <van-slider
        custom-class="slider"
        v-model="currentValue"
        :step="10"
        @change="onChange"
      />
    </demo-block>

    <demo-block title="自定义样式">
      <van-slider
        v-model="currentValue"
        custom-class="slider"
        bar-height="4px"
        active-color="#ee0a24"
        @change="onChange"
      />
    </demo-block>

    <demo-block title="自定义按钮">
      <van-slider
        v-model="currentValue"
        custom-class="slider"
        use-button-slot
        active-color="#ee0a24"
        @drag="onDrag"
      >
        <view
          class="custom-button"
          slot="button"
        >
          {{ currentValue }}
        </view>
      </van-slider>
    </demo-block>

  </view>
</template>

<script>
import DemoBlock from "@/components/app/demo-block";
import VanSlider from "@/components/vant/slider/index.vue"

export default {
  name: 'pages-slider',
  components: { VanSlider, DemoBlock },
  data () {
    return {
      currentValue: 50
    }
  },
  onLoad () {

  },
  onUnload () {

  },
  methods: {
    onChange (event) {
      console.log(event)
      uni.showToast({
        title: `当前值：${event}`,
        icon: "none"
      });
    },
    onDrag (event) {
      this.currentValue = event
      uni.showToast({
        title: `当前值：${event}`,
        icon: "none"
      });
    },
    dragStart () {
      uni.showToast({
        title: "开始滑动",
        icon: "none"
      });
    },
    dragEnd () {
      setTimeout(() => {
        uni.showToast({
          title: "结束滑动",
          icon: "none"
        });
      }, 1000);
    }
  }
}
</script>

<style lang="less">
.slider {
  margin: 0 15px 30px;
}

.custom-button {
  width: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  border-radius: 100px;
  background-color: #ee0a24;
}
</style>
