<template>
    <wxs src="../wxs/utils.wxs" module="utils" />

<view class="van-collapse-item custom-class {{ index !== 0 ? 'van-hairline--top' : '' }}">
  <van-cell
    title="{{ title }}"
    title-class="title-class"
    icon="{{ icon }}"
    value="{{ value }}"
    label="{{ label }}"
    is-link="{{ isLink }}"
    clickable="{{ clickable }}"
    border="{{ border && expanded }}"
    class="{{ utils.bem('collapse-item__title', { disabled, expanded }) }}"
    right-icon-class="van-cell__right-icon"
    custom-class="van-cell"
    hover-class="van-cell--hover"
    bind:click="onClick"
  >
    <slot
      name="title"
      slot="title"
    />
    <slot
      name="icon"
      slot="icon"
    />
    <slot name="value" />
    <slot
      name="right-icon"
      slot="right-icon"
    />
  </van-cell>
  <view
    class="{{ utils.bem('collapse-item__wrapper', { transition }) }}"
    style="height: {{ contentHeight }};"
    bind:transitionend="onTransitionEnd"
  >
    <view
      class="van-collapse-item__content content-class"
    >
      <slot />
    </view>
  </view>
</view>

</template>

<script>
    import { VantComponent } from '../common/component';

const nextTick = () => new Promise(resolve => setTimeout(resolve, 20));

VantComponent({
  classes: ['title-class', 'content-class'],

  relation: {
    name: 'collapse',
    type: 'ancestor',
    linked(parent) {
      this.parent = parent;
    }
  },

  props: {
    name: null,
    title: null,
    value: null,
    icon: String,
    label: String,
    disabled: Boolean,
    clickable: Boolean,
    border: {
      type: Boolean,
      value: true
    },
    isLink: {
      type: Boolean,
      value: true
    }
  },

  data: {
    contentHeight: 0,
    expanded: false,
    transition: false
  },

  mounted() {
    this.updateExpanded()
      .then(nextTick)
      .then(() => {
        const data: Record<string, boolean | string> = { transition: true };

        if (this.data.expanded) {
          data.contentHeight = 'auto';
        }

        this.setData(data);
      });
  },

  methods: {
    updateExpanded() {
      if (!this.parent) {
        return Promise.resolve();
      }

      const { value, accordion } = this.parent.data;
      const { children = [] } = this.parent;
      const { name } = this.data;

      const index = children.indexOf(this);
      const currentName = name == null ? index : name;

      const expanded = accordion
        ? value === currentName
        : (value || []).some((name: string | number) => name === currentName);

      const stack = [];

      if (expanded !== this.data.expanded) {
        stack.push(this.updateStyle(expanded));
      }

      stack.push(this.set({ index, expanded }));

      return Promise.all(stack);
    },

    updateStyle(expanded: boolean) {
      return this.getRect('.van-collapse-item__content')
        .then((rect: WechatMiniprogram.BoundingClientRectCallbackResult) => rect.height)
        .then((height: number) => {
          if (expanded) {
            return this.set({
              contentHeight: height ? `${height}px` : 'auto'
            });
          }

          return this.set({ contentHeight: `${height}px` })
            .then(nextTick)
            .then(() => this.set({ contentHeight: 0 }));
        });
    },

    onClick() {
      if (this.data.disabled) {
        return;
      }

      const { name, expanded } = this.data;
      const index = this.parent.children.indexOf(this);
      const currentName = name == null ? index : name;

      this.parent.switch(currentName, !expanded);
    },

    onTransitionEnd() {
      if (this.data.expanded) {
        this.setData({
          contentHeight: 'auto'
        });
      }
    }
  }
});

</script>

<style lang="less">

</style>
