<template>
  <view class="pages-area">
    <demo-block title="基础用法">
      <van-area :area-list="areaList" />
    </demo-block>

    <!-- <demo-block title="选中省市县">
      <van-area
        :value="value"
        :area-list="areaList"
        @change="onChange"
        @confirm="onConfirm"
      />
    </demo-block>

    <demo-block title="配置显示列">
      <van-area
        title="标题"
        :columns-num="2"
        :area-list="areaList"
        @change="onChange"
        @confirm="onConfirm"
      />
    </demo-block>

    <demo-block title="配置列占位提示文字">
      <van-area
        title="标题"
        :columns-num="2"
        :area-list="areaList"
        :columns-placeholder=" ['请选择', '请选择', '请选择'] "
        @change="onChange"
        @confirm="onConfirm"
      />
    </demo-block> -->
  </view>
</template>

<script>
import areaList from "./area"
import DemoBlock from "../../../components/app/demo-block";
import VanArea from "../../../components/vant/area/index"

export default {
  name: 'pages-area',
  components: { VanArea, DemoBlock },
  data () {
    return {
      areaList: areaList,
      loading: true,
      value: '330302'
    }
  },
  onLoad () {

  },
  onUnload () {

  },
  methods: {
    onShow () {
    },

    onChange (event) {
      console.log(event)

    },

    onConfirm (event) {
      console.log(event);
    },

    onCancel (event) {
      console.log(event);
    }
  }
}
</script>

<style lang="less">
</style>
