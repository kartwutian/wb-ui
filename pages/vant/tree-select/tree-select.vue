<template>
 <view class="pages-tree-select">
   <demo-block title="单选模式">
     <van-tree-select
         :items="items"
         :main-active-index="mainActiveIndex"
         :active-id="activeId"
         @click-item="onClickItem"
         @click-nav="onClickNav"
     ></van-tree-select>
   </demo-block>

    <demo-block title="多选模式">
      <van-tree-select
          max="2"
          :items="items"
          :main-active-index="mainActiveIndexMulti"
          :active-id="activeIdMulti"
          @click-item="onClickItemMulti"
          @click-nav="onClickNavMulti"
      ></van-tree-select>
    </demo-block>

    <demo-block title="自定义内容">
      <van-tree-select
          :items="[{ text: '分组 1' }, { text: '分组 2' }]"
          height="55vw"
          :main-active-index="mainActiveIndex"
          :active-id="activeId"
          @click-item="onClickItem"
          @click-nav="onClickNav"
      >
        <van-image
            v-if="mainActiveIndex === 0"
            src="https://img.yzcdn.cn/vant/apple-1.jpg"
            width="100%"
            height="100%"
            slot="content"
        />
        <van-image
            v-else-if="mainActiveIndex === 1"
            src="https://img.yzcdn.cn/vant/apple-2.jpg"
            width="100%"
            height="100%"
            slot="content"
        />
      </van-tree-select>
    </demo-block>
  </view>
</template>

<script>
  import config from './config';
  import DemoBlock from "../../../components/app/demo-block";
  import VanTreeSelect from "../../../components/vant/tree-select/index";
  import VanImage from "../../../components/vant/image/index";

  export default {
    name: 'pages-tree-select',
    components: {VanImage, VanTreeSelect, DemoBlock},
    data() {
      return {
        items: [{
          text: '所有城市',
          children: [...config.pro1, ...config.pro2]
        }, {
          text: config.pro1Name,
          children: config.pro1
        }, {
          text: config.pro2Name,
          children: config.pro2
        }, {
          text: config.pro3Name,
          disabled: true,
          children: config.pro3
        }
        ],
        mainActiveIndex: 0,
        activeId: 0,
        mainActiveIndexMulti: 0,
        activeIdMulti: []
      }
    },
    onLoad() {

    },
    onUnload() {

    },
    methods: {
      onClickNav({index}) {
        this.mainActiveIndex = index || 0;
      },

      onClickItem(detail) {
        let activeId = this.activeId === detail.id ? null : detail.id;

        this.activeId = activeId;
      },

      onClickNavMulti({index}) {
        this.mainActiveIndexMulti = index || 0;
      },

      onClickItemMulti(detail) {
        const {activeIdMulti} = this;
        const idx = activeIdMulti.indexOf(detail.id);
        if (idx > -1) {
          activeIdMulti.splice(idx, 1);
        } else {
          activeIdMulti.push(detail.id);
        }

        this.activeIdMulti = activeIdMulti;
      }
    }
  }
</script>

<style lang="less">

</style>
