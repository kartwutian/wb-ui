<template>
  <view>
    <wb-tabbar
        :tabs="tabs"
        :current="currentTabIndex"
        @change="handleDelayTabChange"
    ></wb-tabbar>
    <wb-tabbar
        type="bottom"
        :tabs="tabs"
        :current="currentTabIndex"
        @change="handleTabChange"
    ></wb-tabbar>
  </view>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'; // 节省代码量
  import WbTabbar from "../../components/wanbo/wb-tabbar/wb-tabbar";
  export default {
    components: {WbTabbar},
    computed: {
      ...mapGetters('tabbar', ['tabs', 'currentTabIndex'])
    },
    onUnload(){
      this.resetState();
    },
    methods: {
      handleDelayTabChange(index){
        this.delayChange({
          currentTabIndex: index,
        })
      },
      handleTabChange(index){
        this.updateState({
          currentTabIndex: index,
        })
      },
      ...mapMutations('tabbar', {
        resetState: 'reset',
        updateState: 'updateState'
      }),
      ...mapActions('tabbar', {
        delayChange: 'delayChange'
      })
    },
  }
</script>

<style lang="less">

</style>
