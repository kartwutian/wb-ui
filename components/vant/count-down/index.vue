<template>
  <view class="van-count-down">
    <slot v-if="useSlot" />
    <block v-else>{{ formattedTime }}</block>
  </view>
</template>

<script>
import { isSameSecond, parseFormat, parseTimeData } from "./utils";
import { basic } from "../mixins/basic";

function simpleTick(fn) {
  return setTimeout(fn, 30);
}

export default {
  name: "van-count-down",
  mixins: [basic],
  props: {
    useSlot: {
      type: Boolean,
      default: false
    },
    millisecond: Boolean,
    time: {
      type: Number
      // observer: 'reset'
    },
    format: {
      type: String,
      default: "HH:mm:ss"
    },
    autoStart: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      timeData: parseTimeData(0),
      formattedTime: "0"
    };
  },

  mounted() {
    this.reset();
  },

  destroyed() {
    clearTimeout(this.tid);
    this.tid = null;
  },

  methods: {
    // 开始
    start() {
      if (this.counting) {
        return;
      }

      this.counting = true;
      this.endTime = Date.now() + this.remain;
      this.tick();
    },

    // 暂停
    pause() {
      this.counting = false;
      clearTimeout(this.tid);
    },

    // 重置
    reset() {
      this.pause();
      this.remain = this.time;
      this.setRemain(this.remain);

      if (this.autoStart) {
        this.start();
      }
    },

    tick() {
      if (this.millisecond) {
        this.microTick();
      } else {
        this.macroTick();
      }
    },

    microTick() {
      this.tid = simpleTick(() => {
        this.setRemain(this.getRemain());

        if (this.remain !== 0) {
          this.microTick();
        }
      });
    },

    macroTick() {
      this.tid = simpleTick(() => {
        const remain = this.getRemain();

        if (!isSameSecond(remain, this.remain) || remain === 0) {
          this.setRemain(remain);
        }

        if (this.remain !== 0) {
          this.macroTick();
        }
      });
    },

    getRemain() {
      return Math.max(this.endTime - Date.now(), 0);
    },

    setRemain(remain) {
      this.remain = remain;
      const timeData = parseTimeData(remain);

      if (this.useSlot) {
        this.$emit("change", timeData);
      }

      this.formattedTime = parseFormat(this.format, timeData);

      if (remain === 0) {
        this.pause();
        this.$emit("finish");
      }
    }
  },

  watch: {
    time: "reset"
  }
};
</script>

<style lang="less"></style>
