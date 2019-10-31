<template>

<view
  class="{{ utils.bem('sidebar-item', { active }) }} van-hairline custom-class"
  hover-class="van-sidebar-item--hover"
  hover-stay-time="70"
  @tap="onClick"
>
  <view class="van-sidebar-item__text">
    <van-info
      v-if=" info !== null || dot "
      :dot=" dot "
      :info=" info "
      custom-style="right: 4px"
    />
    {{ title }}
  </view>
</view>

</template>

<script>
  import utils from '../wxs/utils';


export default {
  relation: {
    type: 'ancestor',
    name: 'sidebar',
    linked(target) {
      this.parent = target;
    }
  },

  props: {
    dot: Boolean,
    info: null,
    title: String
  },

  methods: {
    onClick() {
      const { parent } = this;

      if (!parent) {
        return;
      }

      const index = parent.items.indexOf(this);

      parent.setActive(index).then(() => {
        this.$emit('click', index);
        parent.$emit('change', index);
      });
    },

    setActive(active: boolean) {
      return this.setData({ active });
    }
  }
};

</script>

<style lang="less">

</style>
