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
  @import "./colorui/main.css";
  @import "./colorui/icon.css";
  @import "./colorui/animation.css";
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
</style>
