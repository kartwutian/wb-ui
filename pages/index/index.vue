<template>
	<view>
		<view v-if="PageCur=='basics'">
			<wb-icon type="cart"></wb-icon>
			<wb-icon type="good"></wb-icon>
		</view>
		<view v-if="PageCur=='component'">2</view>
		<view v-if="PageCur=='plugin'">3</view>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="basics">
				<view class='cuIcon-cu-image'>
					<wb-icon type="setting"></wb-icon>
				</view>
				<view :class="PageCur=='basics'?'text-green':'text-gray'">元素</view>
			</view>
			<view class="action" @click="NavChange" data-cur="component">
				<view class='cuIcon-cu-image'>
					<wb-icon type="good"></wb-icon>
				</view>
				<view :class="PageCur=='component'?'text-green':'text-gray'">组件</view>
			</view>
			<view class="action" @click="NavChange" data-cur="plugin">
				<view class='cuIcon-cu-image'>
					<wb-icon type="cart"></wb-icon>
				</view>
				<view :class="PageCur=='plugin'?'text-green':'text-gray'">扩展</view>
			</view>
		</view>
	</view>
</template>

<script>
	import WbIcon from "../../components/wanbo/wb-icon/wb-icon";
	export default {
		components: {WbIcon},
		data() {
			return {
				PageCur: 'basics'
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>
