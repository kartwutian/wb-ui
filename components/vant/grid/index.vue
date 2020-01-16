<template>
  <view
    :class="'van-grid' + (border && !gutter ? 'van-hairline--top' : '')"
    :style="style"
  >
    <slot />
  </view>
</template>

<script>
export default {
  name: "van-grid",
  relation: {
    name: "grid-item",
    type: "descendant"
  },

  props: {
    square: {
      type: Boolean
    },
    gutter: {
      type: Number,
      default: 0
    },
    clickable: {
      type: Boolean
    },
    columnNum: {
      type: [Number, String],
      default: 4
    },
    center: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    square: "updateChildren",
    gutter: "updateChildren",
    clickable: "updateChildren",
    columnNum: "updateChildren",
    center: "updateChildren",
    border: "updateChildren"
  },

  beforeCreate() {
    this.children = [];
    this.$nextTick(() => {
      const { gutter } = this;
      if (gutter) {
        this.style = `padding-left: ${gutter}px`;
      }
    });
  },

  data() {
    return {
      style: ""
    };
  },

  methods: {
    linked(child) {
      this.children.push(child);
    },
    unlinked(child) {
      this.children = this.children.filter(item => item !== child);
    },
    updateChildren() {
      this.children.forEach(child => {
        child.updateStyle();
      });
    }
  }
};
</script>

<style lang="less"></style>
