<template>
  <view :class="classes">
    <slot />
  </view>

</template>

<script>
  export default {
    name: 'van-collapse',
    // relation: {
    //   name: 'collapse-item',
    //   type: 'descendant',
    //   linked(child) {
    //     this.children.push(child);
    //   },
    //   unlinked(child) {
    //     this.children = this.children.filter(
    //       (item) => item !== child
    //     );
    //   }
    // },

    props: {
      value: {
        type: null,
        observer: 'updateExpanded'
      },
      accordion: {
        type: Boolean,
        observer: 'updateExpanded'
      },
      border: {
        type: Boolean,
        default: true
      },
      customClass: {
        type: String,
        default: ''
      }
    },

    computed: {
      classes() {
        return `${this.customClass} van-collapse ${this.border ? 'van-hairline--top-bottom' : ''}`
      },
    },

    beforeCreate() {
      this.children = [];
    },
    mounted(){
      console.log(this)
    },

    methods: {
      updateExpanded() {
        this.children.forEach((child) => {
          child.updateExpanded();
        });
      },

      switch(name) {
        const {accordion, value} = this.data;
        if (!accordion) {
          name = expanded
            ? (value || []).concat(name)
            : (value || []).filter(
              (activeName) => activeName !== name
            );
        } else {
          name = expanded ? name : '';
        }
        this.$emit('change', name);
        this.$emit('input', name);
      }
    }
  }

</script>

<style lang="less">

</style>
