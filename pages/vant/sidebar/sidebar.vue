<template>
  <view class="pages-sidebar">
    <demo-block title="基础用法">
      <van-sidebar custom-class="custom-sidebar" @change="onChange">
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
      </van-sidebar>
    </demo-block>

    <demo-block title="显示徽标">
      <van-sidebar custom-class="custom-sidebar" @change="onChange">
        <van-sidebar-item title="标签名称" dot />
        <van-sidebar-item title="标签名称" info="5" />
        <van-sidebar-item title="标签名称" info="99+" />
      </van-sidebar>
    </demo-block>
  </view>
</template>

<script>
  import DemoBlock from "../../../components/app/demo-block";
  import VanSidebar from "../../../components/vant/sidebar/index";
  import VanSidebarItem from "../../../components/vant/sidebar-item/index";

  export default {
    name: 'pages-sidebar',
    components: {VanSidebarItem, VanSidebar, DemoBlock},
    onLoad(){

    },
    onUnload(){

    },
    methods: {
      onChange(detail) {
        uni.showToast({
          icon: 'none',
          title: `切换至第${detail}项`
        });
      }
    }
  }
</script>

<style lang="less">
  .custom-sidebar {
    margin-left: 15px;
  }
</style>
