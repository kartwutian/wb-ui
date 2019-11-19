<template>
  <view class="pages-checkbox">
    <demo-block title="基本用法">
      <van-checkbox
        v-model="checkbox1"
        custom-class="demo-checkbox"
      >
        复选框
      </van-checkbox>
    </demo-block>

    <demo-block
      title="禁用状态"
      disabled
    >
      <van-checkbox
        disabled
        :value="false"
        custom-class="demo-checkbox"
      >
        复选框
      </van-checkbox>
      <van-checkbox
        disabled
        :value="true"
        custom-class="demo-checkbox"
      >
        复选框
      </van-checkbox>
    </demo-block>

    <demo-block title="自定义形状">
      <van-checkbox
        v-model="checkboxShape"
        shape="square"
        custom-class="demo-checkbox"
      >
        复选框
      </van-checkbox>
    </demo-block>

    <demo-block title="自定义颜色">
      <van-checkbox
        v-model="checkbox2"
        checked-color="#07c160"
        custom-class="demo-checkbox"
      >
        复选框
      </van-checkbox>
    </demo-block>

    <demo-block title="自定义图标">
      <van-checkbox
        use-icon-slot
        v-model="checkbox3"
        custom-class="demo-checkbox"
      >
        自定义图标
        <image
          slot="icon"
          class="icon"
          mode="widthFix"
          :src="checkbox3 ? activeIcon : inactiveIcon"
        />
      </van-checkbox>
    </demo-block>

    <demo-block title="复选框组">
      <van-checkbox-group v-model="result">
        <van-checkbox
          v-for="(item, index) in list"
          :key="index"
          :name="item"
          custom-class="demo-checkbox"
        >
          复选框 {{ item }}
        </van-checkbox>
      </van-checkbox-group>
    </demo-block>

    <demo-block title="禁用复选框组">
      <van-checkbox-group
        v-model="result4"
        disabled
      >
        <van-checkbox
          v-for="(item, index) in list"
          :key="index"
          :name="item"
          custom-class="demo-checkbox"
        >
          复选框 {{ item }}
        </van-checkbox>
      </van-checkbox-group>
    </demo-block>

    <demo-block title="设置最大可选数">
      <van-checkbox-group
        :max="2"
        v-model="result2"
      >
        <van-checkbox
          v-for="(item, index) in list"
          :key="index"
          :name="item"
          custom-class="demo-checkbox"
        >
          复选框 {{ item }}
        </van-checkbox>
      </van-checkbox-group>
    </demo-block>

    <demo-block title="搭配单元格组件使用">
      <van-checkbox-group v-model="result3">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in list"
            :key="index"
            :title="'复选框 ' + item"
            value-class="value-class"
            clickable
            @tap="toggle(index)"
          >
            <van-checkbox
              @tap="noop"
              :ref="'page-checkbox-'+ index"
              :name="item"
              slot="right-icon"
            />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </demo-block>
  </view>
</template>

<script>
import DemoBlock from "@/components/app/demo-block";
import VanCheckboxGroup from "@/components/vant/checkbox-group/index";
import VanCheckbox from "@/components/vant/checkbox/index";
import VanCellGroup from "@/components/vant/cell-group/index";
import VanCell from "@/components/vant/cell/index";

export default {
  name: 'pages-checkbox',
  components: { VanCell, VanCellGroup, VanCheckbox, VanCheckboxGroup, DemoBlock },

  data () {
    return {
      parentGroup: {},
      checkbox1: false,
      checkbox2: true,
      checkbox3: true,
      checkboxShape: true,
      list: ['a', 'b', 'c'],
      result: ['a', 'b'],
      result2: [],
      result3: [],
      result4: ['a', 'b'],
      activeIcon: 'https://img.yzcdn.cn/vant/user-active.png',
      inactiveIcon: 'https://img.yzcdn.cn/vant/user-inactive.png'
    }
  },

  onLoad () {
  },
  onUnload () {
  },
  methods: {
    onChange (val) {
      this.checkbox1 = val
    },
    toggle (index) {
      this.$refs[`page-checkbox-${index}`][0].toggle();
    },
    noop () { }
  }
}
</script>

<style lang="less">
.demo-checkbox-group {
  margin: 10px 0 0 20px;
}

.demo-checkbox {
  margin: 10px 0 0 20px;
}

.value-class {
  flex: none !important;
}

.icon {
  width: 20px;
}
</style>
