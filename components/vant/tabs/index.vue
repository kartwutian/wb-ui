<template>

<view :class="tabsClass">
  <view
      :style="'z-index: ' + zIndex + '; ' + wrapStyle"
      :class="tabsWrapClass"
  >
    <slot name="nav-left" />

    <scroll-view
      :scroll-x=" scrollable "
      scroll-with-animation
      :scroll-left=" scrollLeft "
      :class="'van-tabs__scroll--' + type"
      :style=" color ? 'border-color: ' + color : '' "
    >
      <view :class="tabsNavClass">
        <view v-if=" type === 'line' " class="van-tabs__line" :style=" lineStyle " />
        <view
          v-for="(item, index) in tabs "
          :key="index"
          :data-index=" index "
          :class="'van-ellipsis ' + tabClass + (index === currentIndex ? tabActiveClass : '') + ($utils.bem('tab', { active: index === currentIndex, disabled: item.disabled }))"
          :style="(color && index !== currentIndex && type === 'card' && !item.disabled ? 'color: ' + color : '') + (color && index === currentIndex && type === 'card' ? ';background-color:' + color : '') + (color ? ';border-color: ' + color : '') + (scrollable ? ';flex-basis:' + (88 / swipeThreshold) + '%' : '')"
          @tap="onTap"
        >
          <view class="van-ellipsis" :style=" item.titleStyle ">
            {{ item.title }}
            <van-info
              v-if=" item.info !== null || item.dot "
              :info=" item.info "
              :dot=" item.dot "
              custom-class="van-tab__title__info"
            />
          </view>
        </view>
      </view>
    </scroll-view>

    <slot name="nav-right" />
  </view>
  <view
    class="van-tabs__content"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
  >
    <view class="van-tabs__track" :style=" trackStyle ">
      <slot />
    </view>
  </view>
</view>

</template>

<script>
import utils from '../wxs/utils';
import {basic} from "../mixins/basic";
import { touch } from '../mixins/touch';
import { set } from '../mixins/set';
// import { Weapp } from 'definitions/weapp';
import { nextTick, isDef, addUnit } from '../common/utils';
import VanInfo from "../info/index";

// type TabItemData = {
//   width?: number
//   active: boolean
//   inited?: boolean
//   animated?: boolean
//   name?: string | number
// };

// type Position = 'top' | 'bottom' | '';

export default {
  name: 'van-tabs',
  components: {VanInfo},
  mixins: [basic, touch, set],

  // classes: ['nav-class', 'tab-class', 'tab-active-class', 'line-class'],

  relation: {
    name: 'tab',
    type: 'descendant',

  },

  props: {
    color: String,
    sticky: Boolean,
    animated: Boolean,
    swipeable: Boolean,
    navClass: {
      type: String,
      default: ''
    },
    tabClass: {
      type: String,
      default: ''
    },
    tabActiveClass: {
      type: String,
      default: ''
    },
    lineClass: {
      type: String,
      default: ''
    },
    lineWidth: {
      type: String | Number,
      default: -1
    },
    lineHeight: {
      type: String | Number,
      default: -1
    },
    active: {
      type: String | Number,
      default: 0,
    },
    type: {
      type: String,
      default: 'line'
    },
    border: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 0.3
    },
    zIndex: {
      type: Number,
      default: 1
    },
    swipeThreshold: {
      type: Number,
      default: 4
    },
    offsetTop: {
      type: Number,
      default: 0
    }
  },

  data(){
    return {
      tabs: [],
      lineStyle: '',
      scrollLeft: 0,
      scrollable: false,
      trackStyle: '',
      wrapStyle: '',
      position: '',
      currentIndex: 0,
    }
  },

  computed: {
    tabsClass(){
      return `${this.customClass} ${utils.bem('tabs', [this.type])}`
    },
    tabsWrapClass(){
      return `${utils.bem('tabs__wrap', { scrollable: this.scrollable })} ${this.type === 'line' && this.border ? 'van-hairline--top-bottom' : ''}`
    },
    tabsNavClass(){
      return `${utils.bem('tabs__nav', [this.type])} ${this.navClass}`
    },
  },


  watch: {
    swipeThreshold() {
      this.scrollable = this.children.length > this.swipeThreshold;
    },
    color: 'setLine',
    lineWidth: 'setLine',
    lineHeight: 'setLine',
    active: 'setActiveTab',
    animated: 'setTrack',
    offsetTop: 'setWrapStyle'
  },

  mounted() {
    console.log(this.children)
    setTimeout(()=>{
      console.log(this.children)
    },1000)
    this.setLine(true);
    this.setTrack();
    this.scrollIntoView();
    this.getRect('.van-tabs__wrap').then(
      (rect) => {
        this.navHeight = rect.height;
        this.observerContentScroll();
      }
    );
  },

  destroyed() {
    // @ts-ignore
    this.createIntersectionObserver().disconnect();
  },

  methods: {

    linked(child) {
      this.children = this.children || [];
      child.index = this.children.length;
      this.children.push(child);
      // 把子项data映射过来
      this.updateTabs(this.tabs.concat({
        ...child.$data,
        ...child.$props,
      }));
    },
    unlinked(child) {
      const index = this.children.indexOf(child);
      const { tabs } = this;
      tabs.splice(index, 1);
      this.children.splice(index, 1);

      let i = index;
      while (i >= 0 && i < this.children.length) {
        const currentChild = this.children[i];
        currentChild.index--;
        i++;
      }

      this.updateTabs(tabs);
    },

    updateTabs(tabs) {
      tabs = tabs || this.tabs;
      this.tabs = tabs;
      // debugger
      this.scrollable = tabs.length > this.swipeThreshold;
      this.setActiveTab();
    },

    trigger(eventName) {
      const { tabs, currentIndex } = this;

      this.$emit(eventName, {
        name,
        title: tabs[currentIndex].title
      });
    },

    onTap(event) {
      const { index } = event.currentTarget.dataset;
      const child = this.children[index];
      if (this.tabs[index].disabled) {
        this.trigger('disabled', child.computedName);
      } else {
        this.trigger('click', child.computedName);
        this.setActive(child.computedName);
      }
    },

    setActive(computedName) {
      if (computedName !== this.currentName) {
        this.currentName = computedName;
        this.trigger('change', computedName);
        this.setActiveTab();
      }
    },

    setLine(skipTransition) {
      if (this.type !== 'line') {
        return;
      }

      const { color, duration, currentIndex, lineWidth, lineHeight } = this;

      this.getRect('.van-tab', true).then(
        (rects) => {
          const rect = rects[currentIndex];
          const width = lineWidth !== -1 ? lineWidth : rect.width / 2;
          const height = lineHeight !== -1 ? `height: ${addUnit(lineHeight)}; border-radius: ${addUnit(lineHeight)};` : '';

          let left = rects
            .slice(0, currentIndex)
            .reduce((prev, curr) => prev + curr.width, 0);

          left += (rect.width - width) / 2;

          const transition = skipTransition
            ? ''
            : `transition-duration: ${duration}s; -webkit-transition-duration: ${duration}s;`;

          this.lineStyle = `
            ${height}
            width: ${addUnit(width)};
            background-color: ${color};
            -webkit-transform: translateX(${left}px);
            transform: translateX(${left}px);
            ${transition}
          `;
        }
      );
    },

    setTrack() {
      const { animated, duration, currentIndex } = this;

      if (!animated) return '';

      this.getRect('.van-tabs__content').then(
        (rect) => {
          const { width } = rect;

          this.trackStyle = `
              width: ${width * this.children.length}px;
              left: ${-1 * currentIndex * width}px;
              transition: left ${duration}s;
              display: -webkit-box;
              display: flex;
            `;

          const data = { width, animated };

          this.children.forEach((item) => {
            Object.keys(data).forEach((k) => {
              item[k] = data[k];
            });
          });
        }
      );
    },

    setActiveTab() {
      if (!isDef(this.currentName)) {
        this.currentName = this.active || (this.children[0] || {}).computedName;
      }

      this.children.forEach((item, index) => {
        const data = {
          active: item.computedName === this.currentName
        };


        if (data.active) {
          this.currentIndex = index;
          data.inited = true;
        }

        if (data.active !== item.active) {
          Object.keys(data).forEach((k) => {
            item[k] = data[k];
          });
        }
      });

      nextTick(() => {
        this.setLine();
        this.setTrack();
        this.scrollIntoView();
      });
    },

    // scroll active tab into view
    scrollIntoView() {
      const { currentIndex, scrollable } = this;

      if (!scrollable) {
        return;
      }

      Promise.all([
        this.getRect('.van-tab', true),
        this.getRect('.van-tabs__nav')
      ]).then(
        ([tabRects, navRect]) => {
          const tabRect = tabRects[currentIndex];
          const offsetLeft = tabRects
            .slice(0, currentIndex)
            .reduce((prev, curr) => prev + curr.width, 0);

          this.scrollLeft = offsetLeft - (navRect.width - tabRect.width) / 2;
        }
      );
    },

    onTouchStart(event) {
      if (!this.swipeable) return;

      this.touchStart(event);
    },

    onTouchMove(event) {
      if (!this.swipeable) return;

      this.touchMove(event);
    },

    // watch swipe touch end
    onTouchEnd() {
      if (!this.swipeable) return;

      const { tabs, currentIndex } = this;

      const { direction, deltaX, offsetX } = this;
      const minSwipeDistance = 50;

      if (direction === 'horizontal' && offsetX >= minSwipeDistance) {
        if (deltaX > 0 && currentIndex !== 0) {
          this.setActive(this.children[currentIndex - 1].computedName);
        } else if (deltaX < 0 && currentIndex !== tabs.length - 1) {
          this.setActive(this.children[currentIndex + 1].computedName);
        }
      }
    },

    setWrapStyle() {
      const { offsetTop, position } = this;
      let wrapStyle;

      switch (position) {
        case 'top':
          wrapStyle = `
            top: ${offsetTop}px;
            position: fixed;
          `;
          break;
        case 'bottom':
          wrapStyle = `
            top: auto;
            bottom: 0;
          `;
          break;
        default:
          wrapStyle = '';
      }

      if (wrapStyle !== this.wrapStyle) {
        this.wrapStyle = wrapStyle;
      }
    },

    observerContentScroll() {
      if (!this.sticky) {
        return;
      }

      const { offsetTop } = this;
      const { windowHeight } = wx.getSystemInfoSync();

      // @ts-ignore
      this.createIntersectionObserver().disconnect();

      // @ts-ignore
      this.createIntersectionObserver()
        .relativeToViewport({ top: -(this.navHeight + offsetTop) })
        .observe('.van-tabs', (res) => {
          const { top } = res.boundingClientRect;

          if (top > offsetTop) {
            return;
          }

          const position =
            res.intersectionRatio > 0 ? 'top' : 'bottom';

          this.$emit('scroll', {
            scrollTop: top + offsetTop,
            isFixed: position === 'top'
          });

          this.setPosition(position);
        });

      // @ts-ignore
      this.createIntersectionObserver()
        .relativeToViewport({ bottom: -(windowHeight - 1 - offsetTop) })
        .observe('.van-tabs', (res) => {
          const { top, bottom } = res.boundingClientRect;

          if (bottom < this.navHeight) {
            return;
          }

          const position = res.intersectionRatio > 0 ? 'top' : '';

          this.$emit('scroll', {
            scrollTop: top + offsetTop,
            isFixed: position === 'top'
          });

          this.setPosition(position);
        });
    },

    setPosition(position) {
      if (position !== this.position) {
        this.set({ position }).then(() => {
          this.setWrapStyle();
        });
      }
    }
  }
};

</script>

<style lang="less">
  .content {
    padding: 20px;
    background-color: #fff;
  }

  .content-2 {
    padding: 20px;
  }

  .right-nav {
    padding: 0 10px;
    line-height: 44px !important;
    background-color: #fff;
  }

  .tab-class {
    transition: all 0.25s ease-in-out;
  }

  .tab-active-class {
    font-size: 1.05em !important;
  }
</style>
