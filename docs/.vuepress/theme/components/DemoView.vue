<template>
  <div class="demo-view">
    <div class="demo-view--left">
      <slot />
    </div>

    <div v-show="isShowVantIFrame" class="demo-view--right" v-bind:style="demoViewRightStyle">
      <iframe class="demo-view__frame" :src="src" frameborder="0"></iframe>
    </div>
  </div>

</template>
<script>
export default {
  data(){
    return {
      marginTop: 70,
      baseIframeSrc: '/',
      src: '/',
      isShowVantIFrame: false,
    }
  },

  computed: {
    demoViewRightStyle(){
      return `margin-top: ${this.marginTop}px;`
    },
  },

  mounted() {
    window.addEventListener('scroll', this.onScroll, false)
    // console.log(this)
    this.baseIframeSrc = this.$themeConfig.iframeSrc;
  },

  updated(){
    // console.log(this.$page)
    this.isShowVantIFrame = !!this.$frontmatter.vant;
    this.fetchPath(this.$page.regularPath)
  },

  destroyed() {
    window.removeEventListener('scroll', this.onScroll);
  },

  methods: {
    onScroll(){
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.marginTop = 70 + scrollTop;
    },
    // regularPath: "/vant/button.html"
    fetchPath(regularPath){
      const componentName = regularPath.substring(regularPath.lastIndexOf('/') + 1).split('.')[0];
      this.src = `${this.baseIframeSrc}${componentName}/${componentName}`
    },
  }
}
</script>
<style lang="stylus">

.demo-view
  display flex
  &--left
    flex 1
  &--right
    padding 0 20px
  &__frame
    width 375px
    height 667px
</style>
