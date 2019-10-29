<template>

<view :class="classesCol">
  <van-cell
    :title=" title "
    title-class="title-class"
    :icon=" icon "
    :value=" value "
    :label=" label "
    :is-link=" isLink "
    :clickable=" clickable "
    :border=" border && expanded "
    :class="classes"
    right-icon-class="van-cell__right-icon"
    custom-class="van-cell"
    hover-class="van-cell--hover"
    @click="onClick"
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
    :class="classesTrans"
    :style="'height:' + contentHeight + 'px;'"
    @transitionend="onTransitionEnd"
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
import utils from '../wxs/utils';
import VanCell from "../cell/index";

const nextTick = () => new Promise(resolve => setTimeout(resolve, 20));

export default {
  // classes: ['title-class', 'content-class'],
  //
  // relation: {
  //   name: 'collapse',
  //   type: 'ancestor',
  //   linked(parent) {
  //     this.parent = parent;
  //   }
  // },

  name: 'van-collapse-item',
  components: {VanCell},
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

  data(){
    return {
      contentHeight: 0,
      expanded: false,
      transition: false
    };
  },

  computed: {
    classesCol(){
      return `van-collapse-item custom-class ${this.index !== 0 ? 'van-hairline--top' : ''}`
    },
    classes(){
      return `${utils.bem('collapse-item__title', {disabled: this.disabled, expanded: this.expanded })}`
    },
    classesTrans(){
      return `${utils.bem('collapse-item__wrapper', {transition: this.transition })}`
    },
  },

  mounted() {
    this.updateExpanded()
      .then(nextTick)
      .then(() => {
        const data = { transition: true };

        if (this.data.expanded) {
          data.contentHeight = 'auto';
        }

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
        : (value || []).some((name) => name === currentName);

      const stack = [];

      if (expanded !== this.data.expanded) {
        stack.push(this.updateStyle(expanded));
      }

      stack.push(this.set({ index, expanded }));

      return Promise.all(stack);
    },

    updateStyle(expanded) {
      return this.getRect('.van-collapse-item__content')
        .then((rect) => rect.height)
        .then((height) => {
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
        this.data.contentHeight = 'auto'
      }
    }
  }
};

</script>

<style lang="less">

</style>
