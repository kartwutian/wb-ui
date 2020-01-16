<template>
  <view :class="tabsClass">
    <van-sticky
      :disabled="!sticky"
      :z-index="zIndex"
      :offset-top="offsetTop"
      :wrap-id="wrapId"
      @scroll="onTouchScroll"
    >
      <view
        :style="'z-index: ' + zIndex + '; ' + wrapStyle"
        :class="tabsWrapClass"
      >
        <slot name="nav-left" />

        <scroll-view
          :scroll-x="scrollable"
          scroll-with-animation
          :scroll-left="scrollLeft"
          :class="scrollClass"
          :style="color ? 'border-color: ' + color : ''"
        >
          <view :class="tabsNavClass">
            <view
              v-if="type === 'line'"
              class="van-tabs__line"
              :style="lineStyle"
            />
            <view
              v-for="(item, index) in tabs"
              :key="index"
              :data-index="index"
              :class="
                'van-ellipsis ' +
                  tabClass +
                  ' ' +
                  (index === currentIndex ? tabActiveClass + ' ' : '') +
                  $utils.bem('tab', {
                    active: index === currentIndex,
                    disabled: item.disabled
                  })
              "
              :style="
                (color &&
                index !== currentIndex &&
                type === 'card' &&
                !item.disabled
                  ? 'color: ' + color
                  : '') +
                  (color && index === currentIndex && type === 'card'
                    ? ';background-color:' + color
                    : '') +
                  (color ? ';border-color: ' + color : '') +
                  (scrollable ? ';flex-basis:' + 88 / swipeThreshold + '%' : '')
              "
              @tap="onTap(index)"
            >
              <view class="van-ellipsis" :style="item.titleStyle">
                {{ item.title }}
                <van-info
                  v-if="item.info || item.dot"
                  :info="item.info"
                  :dot="item.dot"
                  custom-class="van-tab__title__info"
                />
              </view>
            </view>
          </view>
        </scroll-view>

        <slot name="nav-right" />
      </view>
    </van-sticky>
    <view
      class="van-tabs__content"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <view class="van-tabs__track" :style="trackStyle">
        <slot />
      </view>
    </view>
  </view>
</template>

<script>
import utils from "../wxs/utils";
import { basic } from "../mixins/basic";
import { touch } from "../mixins/touch";
import { set } from "../mixins/set";
// import { Weapp } from 'definitions/weapp';
import { nextTick, isDef, addUnit } from "../common/utils";
import VanInfo from "../info/index";
import VanSticky from "../sticky/index";

// type TabItemData = {
//   width?: number
//   active: boolean
//   inited?: boolean
//   animated?: boolean
//   name?: string | number
// };

// type Position = 'top' | 'bottom' | '';

export default {
  name: "van-tabs",
  components: { VanSticky, VanInfo },
  mixins: [basic, touch, set],

  // classes: ['nav-class', 'tab-class', 'tab-active-class', 'line-class'],

  relation: {
    name: "tab",
    type: "descendant"
  },

  props: {
    color: String,
    sticky: Boolean,
    animated: Boolean,
    swipeable: Boolean,
    wrapId: {
      type: String,
      default: ""
    },
    navClass: {
      type: String,
      default: ""
    },
    tabClass: {
      type: String,
      default: ""
    },
    tabActiveClass: {
      type: String,
      default: ""
    },
    lineClass: {
      type: String,
      default: ""
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
      default: 0
    },
    type: {
      type: String,
      default: "line"
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

  data() {
    return {
      tabs: [],
      lineStyle: "",
      scrollLeft: 0,
      scrollable: false,
      trackStyle: "",
      wrapStyle: "",
      position: "",
      currentIndex: 0
    };
  },

  computed: {
    tabsClass() {
      return `${this.customClass} ${utils.bem("tabs", [this.type])}`;
    },
    tabsWrapClass() {
      return `${utils.bem("tabs__wrap", { scrollable: this.scrollable })} ${
        this.type === "line" && this.border ? "van-hairline--top-bottom" : ""
      }`;
    },
    tabsNavClass() {
      return `${utils.bem("tabs__nav", [this.type])} ${this.navClass}`;
    },
    scrollClass() {
      return `${utils.bem("tabs__scroll", [this.type])}`;
    }
  },

  watch: {
    swipeThreshold() {
      this.scrollable = this.children.length > this.swipeThreshold;
    },
    color: "setLine",
    lineWidth: "setLine",
    lineHeight: "setLine",
    active(value) {
      this.currentName = value;
      this.setActiveTab();
    },
    animated: "setTrack"
  },

  mounted() {
    // console.log(this.children)
    // setTimeout(()=>{
    //   console.log(this.children)
    // },1000)
    this.setLine(true);
    this.setTrack();
    this.scrollIntoView();
  },

  destroyed() {
    // @ts-ignore
  },

  methods: {
    linked(child) {
      this.children = this.children || [];
      child.index = this.children.length;
      this.children.push(child);
      // 把子项data映射过来
      this.updateTabs();
    },
    unlinked(child) {
      const index = this.children.indexOf(child);
      this.children.splice(index, 1);

      let i = index;
      while (i >= 0 && i < this.children.length) {
        const currentChild = this.children[i];
        currentChild.index--;
        i++;
      }

      this.updateTabs();
    },

    updateTabs() {
      this.tabs = this.children.map(child => {
        return {
          ...child.$data,
          ...child.$props
        };
      });
      // debugger
      this.scrollable = this.tabs.length > this.swipeThreshold;
      this.setActiveTab();
    },

    trigger(eventName, name) {
      const { tabs, currentIndex } = this;

      this.$emit(eventName, {
        name,
        title: tabs[currentIndex].title
      });
    },

    onTap(index) {
      const child = this.children[index];
      const computedName = child.getComputedName();
      if (this.tabs[index].disabled) {
        this.trigger("disabled", computedName);
      } else {
        this.trigger("click", computedName);
        this.setActive(computedName);
      }
    },

    setActive(computedName) {
      if (computedName !== this.currentName) {
        this.currentName = computedName;
        this.setActiveTab();
        this.trigger("change", computedName);
      }
    },

    setLine(skipTransition) {
      if (this.type !== "line") {
        return;
      }

      const { color, duration, currentIndex, lineWidth, lineHeight } = this;

      this.getRect(".van-tab", true).then(rects => {
        const rect = rects[currentIndex];
        const width = lineWidth !== -1 ? lineWidth : rect.width / 2;
        const height =
          lineHeight !== -1
            ? `height: ${addUnit(lineHeight)}; border-radius: ${addUnit(
                lineHeight
              )};`
            : "";

        let left = rects
          .slice(0, currentIndex)
          .reduce((prev, curr) => prev + curr.width, 0);

        left += (rect.width - width) / 2;

        const transition = skipTransition
          ? ""
          : `transition-duration: ${duration}s; -webkit-transition-duration: ${duration}s;`;

        this.lineStyle = `
            ${height}
            width: ${addUnit(width)};
            background-color: ${color};
            -webkit-transform: translateX(${left}px);
            transform: translateX(${left}px);
            ${transition}
          `;
      });
    },

    setTrack() {
      const { animated, duration, currentIndex } = this;

      if (!animated) return "";

      this.getRect(".van-tabs__content").then(rect => {
        const { width } = rect;

        this.trackStyle = `
              width: ${width * this.children.length}px;
              left: ${-1 * currentIndex * width}px;
              transition: left ${duration}s;
              display: -webkit-box;
              display: flex;
            `;

        const data = { width, animated };

        this.children.forEach(item => {
          Object.keys(data).forEach(k => {
            item[k] = data[k];
          });
        });
      });
    },

    setActiveTab() {
      if (!isDef(this.currentName)) {
        const { active } = this;
        const { children = [] } = this;

        this.currentName =
          active === "" && children.length
            ? children[0].getComputedName()
            : active;
      }

      this.children.forEach((item, index) => {
        const data = {
          active: item.getComputedName() === this.currentName
        };

        if (data.active) {
          this.currentIndex = index;
          data.inited = true;
        }

        if (data.active !== item.active) {
          Object.keys(data).forEach(k => {
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
        this.getRect(".van-tab", true),
        this.getRect(".van-tabs__nav")
      ]).then(([tabRects, navRect]) => {
        const tabRect = tabRects[currentIndex];
        const offsetLeft = tabRects
          .slice(0, currentIndex)
          .reduce((prev, curr) => prev + curr.width, 0);

        this.scrollLeft = offsetLeft - (navRect.width - tabRect.width) / 2;
      });
    },

    onTouchScroll(val) {
      this.$emit("scroll", val);
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
      if (direction === "horizontal" && offsetX >= minSwipeDistance) {
        if (deltaX > 0 && currentIndex !== 0) {
          const child = this.children[currentIndex - 1];
          this.setActive(child.getComputedName());
        } else if (deltaX < 0 && currentIndex !== tabs.length - 1) {
          const child = this.children[currentIndex + 1];
          this.setActive(child.getComputedName());
        }
      }
    }
  }
};
</script>

<style lang="less"></style>
