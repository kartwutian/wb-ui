<template>
	<view>
		<view v-show="currentTabIndex === 0">
			<wb-grid :grids="grids"></wb-grid>
		</view>
		<view v-show="currentTabIndex === 1">
			1
		</view>
		<view v-show="currentTabIndex === 2">
			2
		</view>

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
	import WbIcon from "../../components/wanbo/wb-icon/wb-icon";
	import WbGrid from "../../components/wanbo/wb-grid/wb-grid";
	import WbTabbar from "../../components/wanbo/wb-tabbar/wb-tabbar";
	export default {
		components: {WbTabbar, WbGrid, WbIcon},
		computed: {
			...mapGetters('home', ['tabs', 'currentTabIndex', 'grids'])
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
				this.updateShallowState({
					currentTabIndex: index,
				})
			},
			...mapMutations('home', {
				resetState: 'reset',
				updateShallowState: 'updateShallowState'
			}),
			...mapActions('home', {
				delayChange: 'delayChange'
			})
		},
	}
</script>

<style>

</style>
