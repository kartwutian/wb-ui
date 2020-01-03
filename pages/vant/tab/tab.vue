<template>
  <view class="pages-tab">
    <demo-block title="基础用法">
      <van-tabs
        :active="1"
        @change="onChange"
      >
        <van-tab
          v-for="(item, index) in [1,2,3,4,]"
          :key="index"
          :title="'标签 ' + item"
        >
          <view class="content">
            {{ '内容' + item }}
          </view>
        </van-tab>
      </van-tabs>
    </demo-block>
    <demo-block title="通过名称匹配">
      <van-tabs
        active="a"
        @change="onChange"
      >
        <van-tab
          v-for="(item, index) in tabsWithName"
          :key="index"
          :name="item.name"
          :title="'标签 ' + item.index"
        >
          <view class="content">
            {{ '内容' + item.index}}
          </view>
        </van-tab>
      </van-tabs>
    </demo-block>

    <demo-block title="横向滚动">
      <van-tabs>
        <van-tab
          v-for="(item, index) in [1,2,3,4,5,6]"
          :key="index"
          :title="'标签 ' + item"
        >
          <view class="content">
            {{ '内容' + item }}
          </view>
        </van-tab>
      </van-tabs>
    </demo-block>
    <demo-block title="禁用标签">
      <van-tabs @disabled="onClickDisabled">
        <van-tab
          v-for="(item, index) in [1,2,3]"
          :key="index"
          :disabled="index === 1"
          :title="'标签 ' + item"
        >
          <view class="content">
            {{ '内容' + item }}
          </view>
        </van-tab>
      </van-tabs>
    </demo-block>

    <demo-block title="样式风格">
      <van-tabs
        type="card"
        tab-class="tab-class"
      >
        <van-tab
          v-for="(item, index) in [1,2,3]"
          :key="index"
          :title="'标签 ' + item"
        >
          <view class="content-2">
            {{ '内容' + item }}
          </view>
        </van-tab>
      </van-tabs>
    </demo-block>

    <demo-block title="点击事件">
      <van-tabs @click="onClick">
        <van-tab
          v-for="(item, index) in [1,2]"
          :key="index"
          :title="'标签 ' + item"
        >
          <view class="content">
            {{ '内容' + item }}
          </view>
        </van-tab>
      </van-tabs>
    </demo-block>

    <demo-block title="粘性布局">
      <view id="my-sticky">
        <van-tabs
            sticky
            wrap-id="my-sticky"
            :z-index="10000"
            @scroll="onScroll"
        >
          <van-tab
              v-for="(item, index) in [1,2,3,4]"
              :key="index"
              :title="'标签 ' + item"
          >
            <view class="content">
              {{ '内容' + item }}
            </view>
          </van-tab>
        </van-tabs>
      </view>

    </demo-block>

    <demo-block title="切换动画">
      <van-tabs animated>
        <van-tab
          v-for="(item, index) in [1,2,3,4]"
          :key="index"
          :title="'标签 ' + item"
        >
          <view class="content">
            {{ '内容' + item }}
          </view>
        </van-tab>
      </van-tabs>
    </demo-block>

    <demo-block title="滑动切换">
      <van-tabs swipeable>
        <van-tab
          v-for="(item, index) in [1,2,3,4]"
          :key="index"
          :title="'标签 ' + item"
        >
          <view class="content">
            {{ '内容' + item }}
          </view>
        </van-tab>
      </van-tabs>
    </demo-block>

    <demo-block title="自定义标题">
      <van-tabs
        :active="1"
        @change="onChange"
        tab-class="tab-class"
        tab-active-class="tab-active-class"
      >
        <van-icon
          slot="nav-right"
          name="search"
          custom-class="right-nav"
          @click="onClickNavRight"
        />
        <van-tab
          v-for="(item, index) in [1,2,3,4]"
          :key="index"
          :title="'标签 ' + item"
          :dot="index === 1"
          :info="index === 2 ? num : null"
        >
          <view class="content">
            {{ '内容' + item }}
          </view>
        </van-tab>
      </van-tabs>
    </demo-block>
    <view style="height: 2000px;"></view>
  </view>
</template>

<script>
import DemoBlock from "@/components/app/demo-block";
import VanTab from "@/components/vant/tab/index";
import VanTabs from "@/components/vant/tabs/index";
import VanIcon from "@/components/vant/icon/index";

export default {
  name: 'pages-tab',
  components: { VanIcon, VanTabs, VanTab, DemoBlock },
  data () {
    return {
      tabs: [1, 2, 3, 4],
      tabsMore: [1, 2, 3, 4, 5, 6, 7, 8],
      tabsWithName: [
        { name: 'a', index: 1 },
        { name: 'b', index: 2 },
        { name: 'c', index: 3 }
      ],
      num: 100,
    };
  },


  onLoad () {
    setInterval(()=>{
      if(this.num < 0){
        this.num = 100
      }
      this.num -= 1
    }, 1000)
  },
  onUnload () {

  },
  methods: {
    onClickDisabled (val) {
      console.log(val)
      uni.showToast({
        title: `标签 ${val.name} 已被禁用`,
        icon: 'none'
      });
    },

    onChange (val) {
      console.log(val)
      uni.showToast({
        title: `切换到${val.title}`,
        icon: 'none'
      });
    },

    onClickNavRight () {
      uni.showToast({
        title: '点击 right nav',
        icon: 'none'
      });
    },

    onClick (val) {
      uni.showToast({
        title: `点击标签${val.title}`,
        icon: 'none'
      });
    },
    onScroll (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="less">
.pages-tab {
  height: 200vh;
}
.content {
  padding: 20px;
  background-color: #fff;
}

.content-2 {
  padding: 20px;
}

.right-nav {
  padding: 0 10px;
  line-height: 44px !important;
  background-color: #fff;
}

.tab-class {
  transition: all 0.25s ease-in-out;
}

.tab-active-class {
  font-size: 1.05em !important;
}
</style>
