<template>
  <view class="pages-dialog">
    <demo-block
        title="提示弹窗"
        padding
    >
      <van-button
          type="primary"
          class="demo-margin-right"
          @click="onClickAlert"
      >
        提示弹窗
      </van-button>
      <van-button
          type="primary"
          @click="onClickAlert2"
      >
        提示弹窗（无标题）
      </van-button>
    </demo-block>

    <demo-block
        title="确认弹窗"
        padding
    >
      <van-button
          type="primary"
          @click="onClickConfirm"
      >
        确认弹窗
      </van-button>
    </demo-block>

    <demo-block
        title="异步关闭"
        padding
    >
      <van-button
          type="primary"
          @click="onClickAsyncClose"
      >
        异步关闭
      </van-button>
    </demo-block>

    <van-dialog ref="van-dialog"/>
  </view>
</template>

<script>
  import DemoBlock from "../../../components/app/demo-block";
  import VanButton from "../../../components/vant/button/index"
  import VanDialog from "../../../components/vant/dialog/index.vue"
  import Dialog from "../../../components/vant/dialog/dialog"


  const message = '代码是写出来给人看的，附带能在机器上运行';
  export default {
    name: 'pages-dialog',
    components: {VanDialog, VanButton, DemoBlock},
    data() {
      return {
        show: false
      }
    },
    onLoad() {

    },
    onUnload() {

    },
    methods: {
      onClickAlert() {
        Dialog.alert({
          title: '标题',
          message,
        })

      },

      onClickAlert2() {
        Dialog.alert({
          message
        });
      },

      onClickConfirm() {
        Dialog.confirm({
          title: '标题',
          message
        })
          .catch((dialog) => {
            dialog.close();
          });
      },

      onClickAsyncClose() {
        Dialog.confirm({
          title: '标题',
          message,
          asyncClose: true
        })
          .then((dialog) => {
            dialog.loading.confirm = true;
            setTimeout(() => {
              Dialog.close();
              dialog.loading.confirm = false;
            }, 1000);
          })
          .catch(() => {
            Dialog.close();
          });
      },
    }
  }
</script>

<style lang="less">
  .demo-image {
    box-sizing: border-box;
    width: 100%;
    padding: 25px 20px 0;
  }
</style>
