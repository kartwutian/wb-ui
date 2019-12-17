<template>
  <view class="pages-radio">
    <demo-block
      title="基本用法"
      padding
    >
      <van-radio-group v-model="radio1">
        <van-radio
          name="1"
          custom-class="demo-radio"
        >单选框 1</van-radio>
        <van-radio name="2">单选框 2</van-radio>
      </van-radio-group>
    </demo-block>
    <demo-block
      title="禁用状态"
      padding
    >
      <van-radio-group
        disabled
        v-model="radio2"
      >
        <van-radio
          name="1"
          custom-class="demo-radio"
        >单选框 1</van-radio>
        <van-radio name="2">单选框 2</van-radio>
      </van-radio-group>
    </demo-block>

    <demo-block
      title="自定义颜色"
      padding
    >
      <van-radio-group v-model="radio3">
        <van-radio
          name="1"
          custom-class="demo-radio"
          checked-color="#07c160"
        >单选框</van-radio>
        <van-radio
          name="2"
          checked-color="#07c160"
        >单选框</van-radio>
      </van-radio-group>
    </demo-block>

    <demo-block
      title="自定义图标"
      padding
    >
      <van-radio-group v-model="radio4">
        <van-radio
          use-icon-slot
          name="1"
        >
          自定义图标
          <image
            slot="icon"
            :src="radio4 === '1' ? icon.active : icon.normal"
            class="icon"
            mode="widthFix"
          />
        </van-radio>
        <van-radio
          use-icon-slot
          name="2"
        >
          自定义图标
          <image
            slot="icon"
            :src="radio4 === '2' ? icon.active : icon.normal"
            class="icon"
            mode="widthFix"
          />
        </van-radio>
      </van-radio-group>
    </demo-block>

    <demo-block title="与 Cell 组件一起使用">
      <van-radio-group v-model="radio5">
        <van-cell-group>
          <van-cell
            title="单选框 1"
            clickable
            @tap="toggle('radio-1')"
          >
            <van-radio
              slot="right-icon"
              name="1"
              ref="radio-1"
            />
          </van-cell>
          <van-cell
            title="单选框 2"
            clickable
            @tap="toggle('radio-2')"
          >
            <van-radio
              slot="right-icon"
              name="2"
              ref="radio-2"
            />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </demo-block>
  </view>
</template>

<script>
import DemoBlock from "@/components/app/demo-block";
import VanRadioGroup from "@/components/vant/radio-group/index";
import VanRadio from "@/components/vant/radio/index";
import VanCellGroup from "@/components/vant/cell-group/index";
import VanCell from "@/components/vant/cell/index";

export default {
  name: 'pages-radio',
  components: { VanCell, VanCellGroup, VanRadio, VanRadioGroup, DemoBlock },
  data () {
    return {
      radio1: '1',
      radio2: '2',
      radio3: '1',
      radio4: '1',
      radio5: '1',
      icon: {
        normal:
          'https://img.yzcdn.cn/public_files/2017/10/13/c547715be149dd3faa817e4a948b40c4.png',
        active:
          'https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png'
      }
    };
  },
  onLoad () {

  },
  onUnload () {

  },
  methods: {
    onClick (name) {
      this.radio5 = name;
    },
    toggle (refName) {
      this.$refs[refName].onChange();
    }
  }
}
</script>

<style lang="less">
.demo-radio {
  margin-bottom: 10px;
}

.icon {
  width: 20px;
}
</style>
