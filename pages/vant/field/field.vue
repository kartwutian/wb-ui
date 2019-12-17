<template>
  <view class="pages-field">
    <demo-block title="基础用法">
      <van-cell-group>
        <van-field
          v-model="value"
          placeholder="请输入用户名"
          clearable
          @input="input"
        />
      </van-cell-group>
    </demo-block>
    <demo-block title="自定义类型">
      <van-cell-group>
        <van-field
          v-model="username"
          label="用户名"
          placeholder="请输入用户名"
          clearable
          right-icon="question-o"
          right-icon-class="custom-icon"
          required
          @click-icon="onClickIcon"
          @focus="focus"
          @blur="blur"
        />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
          :border="false"
        />
      </van-cell-group>
    </demo-block>

    <demo-block title="禁用输入框">
      <van-cell-group>
        <van-field
          placeholder="输入框已禁用"
          label="用户名"
          left-icon="contact"
          disabled
          :border="false"
        />
      </van-cell-group>
    </demo-block>

    <demo-block title="错误提示">
      <van-cell-group>
        <van-field
          v-model="username2"
          label="用户名"
          placeholder="请输入用户名"
          error
        />
        <van-field
          v-model="phone"
          label="手机号"
          placeholder="请输入手机号"
          error-message="手机号格式错误"
        />
      </van-cell-group>
    </demo-block>

    <demo-block title="高度自适应">
      <van-cell-group>
        <van-field
          v-model="message"
          label="留言"
          type="textarea"
          placeholder="请输入留言"
          rows="1"
          autosize
          :border="false"
        />
      </van-cell-group>
    </demo-block>

    <demo-block title="插入按钮">
      <van-cell-group>
        <van-field
          v-model="sms"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
          use-button-slot
          :border="false"
          @clear="clear"
        >
          <van-button
            slot="button"
            size="small"
            type="primary"
            custom-class="button"
          >发送验证码</van-button>
        </van-field>
      </van-cell-group>
    </demo-block>

    <demo-block title="显示数字统计">
      <van-cell-group>
        <van-field
          v-model="messagecount"
          rows="2"
          autosize
          label="留言"
          type="textarea"
          :maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
      </van-cell-group>
    </demo-block>
  </view>
</template>

<script>
import DemoBlock from "@/components/app/demo-block";
import VanField from "@/components/vant/field/index.vue"
import VanCellGroup from "@/components/vant/cell-group/index"
import VanButton from "@/components/vant/button/index"

export default {
  name: 'pages-field',
  components: { VanButton, VanCellGroup, VanField, DemoBlock },
  data () {
    return {
      sms: '',
      value: '123456',
      password: '',
      username: '',
      username2: '',
      message: '',
      phone: '136557789',
      messagecount: ""
    }
  },
  onLoad () {

  },
  onUnload () {

  },
  methods: {
    //输入框内容发生变化
    input (val) {
      console.log(val)
    },
    //聚焦
    focus (val) {
      console.log(val)
    },
    //失焦
    blur (val) {
      console.log(val)
    },
    //点击icon图标
    onClickIcon () {
      console.log("点击右边的icon图标")
    },
    //清除
    clear (val) {
      console.log("clear")
    },

    formSubmit(e){
      console.log(e)
    }
  }
}
</script>

<style lang="less">
.button {
  vertical-align: middle;
}

.custom-icon {
  color: #1989fa;
}
</style>
