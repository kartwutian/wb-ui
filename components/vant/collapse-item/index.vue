<template>
  <view :class="classesCol">
    <van-cell
      :title="title"
      :title-class="titleClass"
      :icon="icon"
      :value="value"
      :label="label"
      :is-link="isLink"
      :clickable="clickable"
      :border="border && expanded"
      :class="classes"
      right-icon-class="van-cell__right-icon"
      custom-class="van-cell"
      hover-class="van-cell--hover"
      @click="onClick"
    >
      <view slot="title">
        <slot name="title" />
      </view>
      <view slot="icon">
        <slot name="icon" />
      </view>
      <view slot="value">
        <slot name="value" />
      </view>
      <view slot="right-icon">
        <slot name="right-icon" />
      </view>
    </van-cell>
    <view
      :class="classesTrans"
      :style="'height:' + contentHeight + 'px;'"
      @transitionend="onTransitionEnd"
    >
      <view :class="'van-collapse-item__content ' + contentClass">
        <slot />
      </view>
    </view>
  </view>
</template>

<script>
import utils from "../wxs/utils";
import VanCell from "../cell/index";
import { basic } from "../mixins/basic";
import { set } from "../mixins/set";
import { queryParentComponent } from "../common/utils";

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

  name: "van-collapse-item",
  mixins: [basic, set],
  components: { VanCell },
  props: {
    name: null,
    title: null,
    value: null,
    icon: String,
    label: String,
    disabled: Boolean,
    clickable: Boolean,
    titleClass: {
      type: String,
      default: ""
    },
    contentClass: {
      type: String,
      default: ""
    },
    border: {
      type: Boolean,
      default: true
    },
    isLink: {
      type: Boolean,
      default: true
    },
    transition: {
      // 控制是否展示过度动画
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      contentHeight: 0,
      expanded: false,

      hasParent: false
    };
  },

  computed: {
    classesCol() {
      return `van-collapse-item ${this.customClass} ${
        this.index !== 0 ? "van-hairline--top" : ""
      }`;
    },
    classes() {
      return `${utils.bem("collapse-item__title", {
        disabled: this.disabled,
        expanded: this.expanded
      })}`;
    },
    classesTrans() {
      return `${utils.bem("collapse-item__wrapper", {
        transition: this.transition
      })}`;
    }
  },

  mounted() {
    this.parent = queryParentComponent(this, "van-collapse");
    if (this.parent) {
      this.hasParent = true;
      this.parent.linked(this);
    }
    this.updateExpanded()
      .then(nextTick)
      .then(() => {
        if (this.expanded) {
          this.contentHeight = "auto";
        }
      });
  },

  destroyed() {
    if (this.parent) {
      this.parent.unlinked(this);
      this.parent = null;
      this.hasParent = false;
    }
  },

  methods: {
    updateExpanded() {
      if (!this.parent) {
        return Promise.resolve();
      }

      const { value, accordion } = this.parent;
      const { children = [] } = this.parent;
      const { name } = this;

      const index = children.indexOf(this);
      const currentName = name == null ? index : name;

      const expanded = accordion
        ? value === currentName
        : (value || []).some(name => name === currentName);

      const stack = [];

      if (expanded !== this.expanded) {
        stack.push(this.updateStyle(expanded));
      }

      stack.push(this.set({ index, expanded }));

      return Promise.all(stack);
    },

    updateStyle(expanded) {
      return this.getRect(".van-collapse-item__content")
        .then(rect => rect.height)
        .then(height => {
          // console.log(height)
          if (expanded) {
            this.contentHeight = height;
          } else {
            this.contentHeight = 0;
          }
          // if (expanded) {
          //   return this.contentHeight = height ? `${height}px` : 'auto'
          // }

          // return this.set({ contentHeight: `${height}px` })
          //   .then(nextTick)
          //   .then(() => this.set({ contentHeight: 0 }));
        });
    },

    async onClick() {
      if (this.disabled) {
        return;
      }
      // console.log(this)
      const { name, expanded } = this;
      const index = this.parent.children.indexOf(this);
      const currentName = name == null ? index : name;
      // console.log(index)
      // console.log(currentName)
      this.expanded = !expanded;
      this.updateStyle(this.expanded);
      // if(this.expanded){
      //   this.contentHeight = 100
      // }else{
      //   await nextTick();
      //
      //   this.contentHeight = 0
      // }

      this.parent.switch(currentName, !expanded);
    },

    onTransitionEnd() {
      if (this.expanded) {
        this.contentHeight = "auto";
      }
    }
  }
};
</script>

<style lang="less"></style>
