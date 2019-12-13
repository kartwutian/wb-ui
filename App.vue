<script>
  import {getToken} from './utils/helper'
  export default {
    onLaunch() {
      const systemInfo = uni.getSystemInfoSync();
      const language = systemInfo.language;
      switch (language) {
        case "en":
          this.$i18n.locale = "en-US";
          break;
        case "zh-CN":
        case "zh":
          this.$i18n.locale = "zh-CN";
          break;
        default:
          this.$i18n.locale = "zh-CN";
      }

      // 首次进入,没有TOKEN，去登录页
      // const TOKEN = getToken();
      // if(!TOKEN){
      //   uni.reLaunch({
      //     url: '/pages/saler/login/index'
      //   });
      // }

    },
    onShow() {

    },
    onHide() {

    }
  };
</script>

<style lang="less">
  /*每个页面公共css */
  @import "./components/wanbo/styles/index.less";
  @import "./components/vant/index.less";
  @import "./components/app/styles/iconfont.css";
  // 对应uni-page-body标签的样式，所有页面最外层的样式
  page{
    background-color: #f1f1f1;
    font-size: 28rpx;
    color: #333333;
    font-family: Helvetica Neue, Helvetica, sans-serif;
  }

  .test{
    .wb-icon{
      padding: 20rpx;
      font-size: 60rpx;
    }
  }
  .app-container{
    background-color: #F3F7FA;
    padding: 30rpx;
    min-height: 100vh;
  }
  page {
    padding-bottom: 0;
  }

  .demo-margin-left {
    margin-left: 10px;
  }

  .demo-margin-right {
    margin-right: 10px;
  }

  .demo-margin-bottom {
    display: block;
    margin-bottom: 15px;
  }

  .container {
    padding: 45px 20px 20px;
  }

  .title {
    padding-left: 15px;
    margin-bottom: 10px;
  }



  .logo,
  .title-text {
    display: inline-block;
    vertical-align: middle;
  }

  .title-text {
    font-size: 32px;
    font-weight: 500;
    margin-left: 15px;
  }

  .logo {
    width: 36px;
    height: 36px;
  }

  .desc {
    font-size: 14px;
    color: #7d7e80;
    margin: 0 0 45px;
    padding-left: 15px;
  }

  .mobile-nav {
    margin-bottom: 16px;
  }

  .mobile-nav__title {
    font-size: 16px;
    font-weight: 500;
    line-height: 40px;
    align-items: center;
    border-radius: 2px;
  }

  .mobile-nav__content {
    padding: 0 !important;
  }

  .mobile-nav__icon {
    font-size: 24px !important;
    margin-top: 8px;
  }

  .mobile-nav__icon image {
    width: 100%;
  }


  .demo-loading {
    margin: 4px 16px 4px 0;
  }
</style>
