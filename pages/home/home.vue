<template>
	<view>
		<view class="container">
			<view class="title">
				<image class="logo" src="https://img.yzcdn.cn/vant/logo.png" />
				<view class="title-text">Vant uni-app</view>
			</view>
			<view class="desc">基于 vant weapp 改造的 UI 组件库</view>
			<van-collapse
					v-for="group in list"
					:key="group.title"
					accordion
					v-model="activeNames"
					:border="false"
			>
				<van-collapse-item
						clickable
						:is-link="false"
						custom-class="mobile-nav"
						title-class="mobile-nav__title"
						content-class="mobile-nav__content"
						:title="group.groupName"
						:name="group.groupName"
				>
					<van-cell
							v-for="item in group.list"
							:key="item.title"
							is-link
							:title="`${item.title}`"
							:border="true"
							@tap="navTo(`/pages/vant${item.path}${item.path}`)"
					/>
					<van-icon
							:name="group.icon"
							slot="right-icon"
							custom-class="mobile-nav__icon"
					/>
				</van-collapse-item>
			</van-collapse>
		</view>

	</view>
</template>

<script>
	import VanTag from "../../components/vant/tag/index";
	import VanCell from "../../components/vant/cell/index";
	import VanCollapse from "../../components/vant/collapse/index";
	import VanCollapseItem from "../../components/vant/collapse-item/index";
	import VanIcon from "../../components/vant/icon/index";
	import VanCellGroup from "../../components/vant/cell-group/index";
	import config from '../../config/config';
	export default {
		components: {VanCellGroup, VanIcon, VanCell, VanCollapseItem, VanCollapse, VanTag},
		data(){
			return {
				activeNames: [],
				list: [
					{
						groupName: '基础组件',
						icon: 'https://img.yzcdn.cn/vant/basic-0401.svg',
						list: [
							{
								path: '/button',
								title: 'Button 按钮'
							},
							{
								path: '/cell',
								title: 'Cell 单元格'
							},
							{
								path: '/icon',
								title: 'Icon 图标'
							},
							{
								path: '/image',
								title: 'Image 图片'
							},
							{
								path: '/col',
								title: 'Layout 布局'
							},
							{
								path: '/popup',
								title: 'Popup 弹出层'
							},
							{
								path: '/transition',
								title: 'Transition 动画'
							}
						]
					},
					{
						groupName: '表单组件',
						icon: 'https://img.yzcdn.cn/vant/form-0401.svg',
						list: [
							{
								path: '/checkbox',
								title: 'Checkbox 复选框'
							},
							{
								path: '/datetime-picker',
								title: 'DatetimePicker 时间选择'
							},
							{
								path: '/field',
								title: 'Field 输入框'
							},
							{
								path: '/picker',
								title: 'Picker 选择器'
							},
							{
								path: '/radio',
								title: 'Radio 单选框'
							},
							{
								path: '/rate',
								title: 'Rate 评分'
							},
							{
								path: '/search',
								title: 'Search 搜索'
							},
							{
								path: '/slider',
								title: 'Slider 滑块'
							},
							{
								path: '/stepper',
								title: 'Stepper 步进器'
							},
							{
								path: '/switch',
								title: 'Switch 开关'
							},
							{
								path: '/uploader',
								title: 'Uploader 文件上传'
							}
						]
					},
					{
						groupName: '反馈组件',
						icon: 'passed',
						list: [
							{
								path: '/action-sheet',
								title: 'ActionSheet 上拉菜单'
							},
							{
								path: '/dialog',
								title: 'Dialog 弹出框'
							},
							{
								path: '/dropdown-menu',
								title: 'DropdownMenu 下拉菜单'
							},
							{
								path: '/loading',
								title: 'Loading 加载'
							},
							{
								path: '/notify',
								title: 'Notify 消息通知'
							},
							{
								path: '/overlay',
								title: 'Overlay 遮罩层'
							},
							{
								path: '/swipe-cell',
								title: 'SwipeCell 滑动单元格'
							},
							{
								path: '/toast',
								title: 'Toast 轻提示'
							}
						]
					},
					{
						groupName: '展示组件',
						icon: 'photo-o',
						list: [
							{
								path: '/circle',
								title: 'Circle 进度条'
							},
							{
								path: '/collapse',
								title: 'Collapse 折叠面板'
							},
							{
								path: '/count-down',
								title: 'CountDown 倒计时'
							},
							{
								path: '/notice-bar',
								title: 'NoticeBar 通告栏'
							},
							{
								path: '/panel',
								title: 'Panel 面板'
							},
							{
								path: '/progress',
								title: 'Progress 进度条'
							},
							{
								path: '/steps',
								title: 'Steps 步骤条'
							},
							{
								path: '/sticky',
								title: 'Sticky 粘性布局'
							},
							{
								path: '/skeleton',
								title: 'Skeleton 骨架屏'
							},
							{
								path: '/tag',
								title: 'Tag 标记'
							},
							{
								path: '/tree-select',
								title: 'TreeSelect 分类选择'
							},
							{
								path: '/divider',
								title: 'Divider 分割线'
							}
						]
					},
					{
						groupName: '导航组件',
						icon: 'https://img.yzcdn.cn/vant/nav-0401.svg',
						list: [
							{
								path: '/grid',
								title: 'Grid 宫格'
							},
							{
								path: '/sidebar',
								title: 'Sidebar 侧边导航'
							},
							{
								path: '/nav-bar',
								title: 'NavBar 导航栏'
							},
							{
								path: '/tab',
								title: 'Tab 标签页'
							},
							{
								path: '/tabbar',
								title: 'Tabbar 标签栏'
							}
						]
					},
					{
						groupName: '业务组件',
						icon: 'ellipsis',
						list: [
							{
								path: '/area',
								title: 'Area 省市区选择'
							},
							{
								path: '/card',
								title: 'Card 商品卡片'
							},
							{
								path: '/submit-bar',
								title: 'SubmitBar 提交订单栏'
							},
							{
								path: '/goods-action',
								title: 'GoodsAction 商品导航'
							}
						]
					}
				],
			}
		},
		computed: {
		},
		onLoad(){
			// this.getData({});
		},
		onUnload(){
		},
		methods: {

			navTo(path){
				// #ifdef  H5

				// 向父级窗口posMessage
				top.postMessage({path}, location.origin);
				// #endif

				uni.navigateTo({
					url: path,
				})
			}
		},
	}
</script>

<style lang="less">

</style>
