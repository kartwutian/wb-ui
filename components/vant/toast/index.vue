<template>
  <view>
    <van-overlay
      v-if="mask || forbidClick"
      :show="show"
      :z-index="zIndex"
      :custom-style="mask ? '' : 'background-color: transparent;'"
    />
    <van-transition
      :show="show"
      :custom-style="'z-index: ' + zIndex"
      custom-class="van-toast__container"
    >
      <view
        :class="
          'van-toast van-toast--' +
            (type === 'text' ? 'text' : 'icon') +
            ' van-toast--' +
            position
        "
        @touchmove="noop"
      >
        <!-- text only -->
        <text v-if="type === 'text'">{{ message }}</text>

        <!-- with icon -->
        <block v-else>
          <van-loading
            v-if="type === 'loading'"
            color="white"
            :type="loadingType"
            custom-class="van-toast__loading"
          />
          <van-icon v-else size="48" :name="type" />
          <text v-if="message" class="van-toast__text">{{ message }}</text>
        </block>

        <slot />
      </view>
    </van-transition>
  </view>
</template>

<script>
import { basic } from "../mixins/basic";
import VanOverlay from "../overlay/index";
import VanTransition from "../transition/index";
import VanIcon from "../icon/index";
import VanLoading from "../loading/index";
export default {
  name: "van-toast",
  components: { VanLoading, VanIcon, VanTransition, VanOverlay },
  mixins: [basic],

  data() {
    return {
      show: false,
      mask: false,
      message: "",
      zIndex: 1000,
      forbidClick: false,
      type: "text",
      loadingType: "circular",
      position: "middle"
    };
  },

  methods: {
    // for prevent touchmove
    noop() {}
  }
};
</script>

<style lang="less"></style>
