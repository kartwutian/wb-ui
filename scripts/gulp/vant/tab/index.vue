<template>
    <wxs src="../wxs/utils.wxs" module="utils" />

<view
  wx:if="{{ animated || inited }}"
  class="custom-class {{ utils.bem('tab__pane', { active, inactive: !active }) }}"
  style="{{ animated || active ? '' : 'display: none;' }} {{ width ? 'width:' + width + 'px;' : '' }}"
>
  <slot />
</view>

</template>

<script>
    import { VantComponent } from '../common/component';

VantComponent({
  relation: {
    name: 'tabs',
    type: 'ancestor'
  },

  props: {
    dot: Boolean,
    info: null,
    title: String,
    disabled: Boolean,
    titleStyle: String,
    name: {
      type: [Number, String],
      value: '',
      observer: 'setComputedName'
    }
  },

  data: {
    width: null,
    inited: false,
    active: false,
    animated: false
  },

  watch: {
    title: 'update',
    disabled: 'update',
    dot: 'update',
    info: 'update',
    titleStyle: 'update'
  },

  methods: {
    setComputedName() {
      this.computedName = this.data.name || this.index;
    },

    update() {
      const parent = this.getRelationNodes('../tabs/index')[0];
      if (parent) {
        parent.updateTabs();
      }
    }
  }
});

</script>

<style lang="less">

</style>
