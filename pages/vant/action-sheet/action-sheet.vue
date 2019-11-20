<template>
  <view class="pages-action-sheet">
    <demo-block
      title="基础用法"
      padding
    >
      <van-button
        type="primary"
        @click="toggleActionSheet1"
      >弹出菜单</van-button>
      <van-action-sheet
        :show="show1"
        :actions="action1"
        @click-overlay="toggleActionSheet1"
        @select="toggleActionSheet1"
      />
    </demo-block>

    <demo-block
      title="选项状态"
      padding
    >
      <van-button
        type="primary"
        @click="toggleActionSheet2"
      >弹出菜单</van-button>
      <van-action-sheet
        :show="show2"
        :actions="action2"
        @close="toggleActionSheet2"
      >
      </van-action-sheet>
    </demo-block>

    <demo-block
      title="展示取消按钮"
      padding
    >
      <van-button
        type="primary"
        @click="toggleActionSheet3"
      >弹出菜单</van-button>
      <van-action-sheet
        :show="show3"
        :actions="action1"
        cancel-text="取消"
        @close="toggleActionSheet3"
        @cancel="toggleActionSheet3"
      >
      </van-action-sheet>
    </demo-block>

    <demo-block
      title="展示描述信息"
      padding
    >
      <van-button
        type="primary"
        @click="toggleActionSheet4"
      >弹出菜单</van-button>
      <van-action-sheet
        :show="show4"
        :actions="action1"
        description="这是一段描述信息"
        @close="toggleActionSheet4"
      >
      </van-action-sheet>
    </demo-block>

    <demo-block
      title="展示标题栏"
      padding
    >
      <van-button
        type="primary"
        @click="toggleActionSheet5"
      >弹出菜单</van-button>
      <van-action-sheet
        :show="show5"
        title="标题"
        @close="toggleActionSheet5"
      >
        <view class="content">内容</view>
      </van-action-sheet>
    </demo-block>
  </view>
</template>

<script>
import DemoBlock from "@/components/app/demo-block";
import VanButton from "@/components/vant/button/index"
import VanActionSheet from "@/components/vant/action-sheet/index.vue"

export default {
  name: 'pages-action-sheet',
  components: { VanActionSheet, VanButton, DemoBlock },
  data () {
    return {
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      action1: [
        { name: '选项' },
        { name: '选项' },
        { name: '选项', subname: '副文本' }
      ],
      action2: [
        { name: '选项', color: '#07c160' },
        { loading: true },
        { name: '禁用选项', disabled: true }
      ]
    }
  },
  onLoad () {

  },
  onUnload () {

  },
  methods: {
    toggle (type) {
      this[`${type}`] = !this[`${type}`]
    },

    toggleActionSheet1 () {
      this.toggle('show1');
    },

    toggleActionSheet2 () {
      this.toggle('show2');
    },

    toggleActionSheet3 () {
      this.toggle('show3');
    },

    toggleActionSheet4 () {
      this.toggle('show4');
    },

    toggleActionSheet5 () {
      this.toggle('show5');
    }
  }
}
</script>

<style lang="less">
.content {
  padding: 20px;
}
</style>
