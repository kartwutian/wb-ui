<template>
  <view :class="customClass + ' van-sticky'" :style="containerStyle">
    <view :class="classes" :style="wrapStyle">
      <slot />
    </view>
  </view>

</template>

<script>
  import {basic} from '../mixins/basic'
  import {nextTick} from '../common/utils';

  export default {
    name: 'van-sticky',
    mixins: [basic],
    props: {
      zIndex: {
        type: Number,
        default: 99
      },
      offsetTop: {
        type: Number,
        default: 0
      },
      disabled: {
        type: Boolean,
        default: false,
      }
    },

    computed: {
      classes(){
        return `${this.$utils.bem('sticky-wrap', { fixed: this.fixed })}`
      }
    },

    data(){
      return {
        fixed: false,
        height: 0,
        wrapStyle: '',
        containerStyle: ''
      };
    },

    methods: {
      setStyle() {
        const { offsetTop, height, fixed, zIndex } = this;

        if (fixed) {
          this.wrapStyle = `top: ${offsetTop}px;`;
          this.containerStyle = `height: ${height}px; z-index: ${zIndex};`;
        } else {
          this.wrapStyle = '';
          this.containerStyle = '';
        }
      },

      observerContentScroll() {
        const { offsetTop } = this;
        const intersectionObserver = uni.createIntersectionObserver(this, {
          thresholds: [0, 1]
        });
        this.intersectionObserver = intersectionObserver;
        intersectionObserver.relativeToViewport({ top: -offsetTop });
        intersectionObserver.observe(
          '.van-sticky',
          (res) => {
            if (this.disabled) {
              return;
            }
            console.log(res)

            // @ts-ignore
            const { top, height } = res.boundingClientRect;
            const fixed = top <= offsetTop;
            this.$emit('scroll', {
              scrollTop: top,
              isFixed: fixed
            });

            this.fixed = fixed;
            this.height = height;

            this.setStyle();
          }
        );
      }
    },


    mounted() {
      this.observerContentScroll();
    },

    destroyed() {
      this.intersectionObserver.disconnect();
    }
  };

</script>

<style lang="less">

</style>
