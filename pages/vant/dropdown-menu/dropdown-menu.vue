<template>
  <view class="pages-dropdown-menu">
    <demo-block
        custom-class="white"
        title="基础用法"
        padding
    >
      <van-dropdown-menu>
        <van-dropdown-item
            :value="value1"
            :options="option1"
            @change="onChange1"
        />
        <van-dropdown-item
            :value="value2"
            :options="option2"
            @change="onChange2"
        />
      </van-dropdown-menu>
    </demo-block>
    <demo-block
        custom-class="white"
        title="自定义菜单内容"
        padding
    >
      <van-dropdown-menu ref="custom-drop-down">
        <van-dropdown-item
            :value="value1"
            :options="option1"
        />
        <van-dropdown-item
            :title="itemTitle"
        >
          <van-cell :title="switchTitle1">
            <van-switch
                slot="right-icon"
                size="24px"
                style="height: 26px"
                :checked="switch1"
                @change="onSwitch1Change"
            />
          </van-cell>
          <van-cell :title="switchTitle2">
            <van-switch
                slot="right-icon"
                size="24px"
                style="height: 26px"
                :checked="switch2"
                @change="onSwitch2Change"
            />
          </van-cell>
          <van-button
              type="info"
              block
              @click="onConfirm"
          >
            确定
          </van-button>
        </van-dropdown-item>
      </van-dropdown-menu>
    </demo-block>

    <demo-block
        custom-class="white"
        title="自定义选中状态颜色"
        padding
    >
      <van-dropdown-menu active-color="#ee0a24">
        <van-dropdown-item
            :value="value1"
            :options="option1"
            @change="onChange1"
        />
        <van-dropdown-item
            :value="value2"
            :options="option2"
            @change="onChange2"
        />
      </van-dropdown-menu>
    </demo-block>

    <demo-block
        custom-class="white"
        title="向上展开"
        padding
    >
      <van-dropdown-menu direction="up">
        <van-dropdown-item
            :value="value1"
            :options="option1"
            @change="onChange1"
        />
        <van-dropdown-item
            :value="value2"
            :options="option2"
            @change="onChange2"
        />
      </van-dropdown-menu>
    </demo-block>

    <demo-block
        custom-class="white"
        title="禁用菜单"
        padding
    >
      <van-dropdown-menu>
        <van-dropdown-item
            :value="value1"
            disabled
            :options="option1"
        />
        <van-dropdown-item
            :value="value2"
            disabled
            :options="option2"
        />
      </van-dropdown-menu>
    </demo-block>
  </view>
</template>

<script>
  import DemoBlock from "../../../components/app/demo-block";
  import VanDropdownItem from "../../../components/vant/dropdown-item/index.vue"
  import VanDropdownMenu from "../../../components/vant/dropdown-menu/index.vue"
  import VanCell from "../../../components/vant/cell/index";
  import VanSwitch from "../../../components/vant/switch/index";
  import VanButton from "../../../components/vant/button/index";

  export default {
    name: 'pages-dropdown-menu',
    components: {VanButton, VanSwitch, VanCell, VanDropdownMenu, VanDropdownItem, DemoBlock},
    data() {
      return {
        switchTitle1: '包邮',
        switchTitle2: '团购',
        itemTitle: '筛选',
        option1: [
          {text: '全部商品', value: 0},
          {text: '新款商品', value: 1},
          {text: '活动商品', value: 2}
        ],
        option2: [
          {text: '默认排序', value: 'a'},
          {text: '好评排序', value: 'b'},
          {text: '销量排序', value: 'c'}
        ],
        switch1: true,
        switch2: false,
        value1: 0,
        value2: 'a'
      }
    },
    onLoad() {

    },
    onUnload() {

    },
    methods: {
      onChange1(val) {
        this.value1 = val;
      },
      onChange2(val) {
        this.value2 = val;
      },

      onConfirm() {
        console.log(this.$refs['custom-drop-down'])
        this.$refs['custom-drop-down'].itemListData[1].showPopup = false;
        this.$refs['custom-drop-down'].close();
      },

      onSwitch1Change(val) {
        this.switch1 = val;
      },

      onSwitch2Change(val) {
        this.switch2 = val;
      }
    }
  }
</script>

<style lang="less">
  page {
    background-color: white;
  }
</style>
