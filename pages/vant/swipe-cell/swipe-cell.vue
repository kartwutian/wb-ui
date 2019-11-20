<template>
  <view class="pages-swipe-cell">
    <demo-block title="基础用法">
      <van-swipe-cell
        :right-width="120"
        :left-width="65"
      >
        <view
          slot="left"
          class="van-swipe-cell__left"
        >选择</view>
        <van-cell-group>
          <van-cell
            title="单元格"
            value="内容"
          />
        </van-cell-group>
        <template slot="right">
          <van-button
            square
            type="danger"
          >删除</van-button>
          <van-button
            square
            type="primary"
          >收藏</van-button>
        </template>
      </van-swipe-cell>
    </demo-block>

    <demo-block title="异步关闭">
      <van-swipe-cell
        id="swipe-cell"
        :right-width="65"
        :left-width="65"
        async-close
        @close="onClose"
      >
        <view
          slot="left"
          class="van-swipe-cell__left"
        >选择</view>
        <van-cell-group>
          <van-cell
            title="单元格"
            value="内容"
          />
        </van-cell-group>
        <view
          slot="right"
          class="van-swipe-cell__right"
        >删除</view>
      </van-swipe-cell>
    </demo-block>
  </view>
</template>

<script>
import DemoBlock from "@/components/app/demo-block";
import VanButton from "@/components/vant/button/index"
import VanCellGroup from "@//components/vant/cell-group/index"
import VanCell from "@/components/vant/cell/index"
import VanSwipeCell from "@/components/vant/swipe-cell/index.vue"
import { EEXIST } from 'constants';

export default {
  name: 'pages-swipe-cell',
  components: { VanSwipeCell, VanCell, VanCellGroup, VanButton, DemoBlock },
  onLoad () {

  },
  onUnload () {

  },
  methods: {
    onClose (val) {
      switch (val.position) {
        case 'left':
        case 'cell':
        case 'outside':
          val.instance.close();
          break;
        case "right":
          uni.showModal({
            title: '提示',
            content: '这是一个模态弹窗',
            success: function (res) {
              if (res.confirm) {
                val.instance.close()
              } else if (res.cancel) {
                val.instance.close()
              }
            }
          });
      }

    }
  }
}
</script>

<style lang="less">
.demo-swipe-cell {
  user-select: none;
}

.van-swipe-cell__left,
.van-swipe-cell__right {
  display: inline-block;
  width: 65px;
  height: 44px;
  font-size: 15px;
  line-height: 44px;
  color: #fff;
  text-align: center;
  background-color: #ee0a24;
}
</style>
