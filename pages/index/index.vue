<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left">
				<image src="../../static/images/public/Head/hodgeHead.png" mode=""></image>
			</view>
			<view class="top-bar-center">
				<text>TALK</text>
			</view>
			<view class="top-bar-right">
				<view class="search" @tap="toSearch">
					<image src="../../static/images/index/search_img.png"></image>
				</view>
				<view class="add" @tap="moreFeatures">
					<image src="../../static/images/index/add_ikmg.png"></image>
				</view>
			</view>
		</view>
		
		<view class="apply"></view>
		<view class="friends">
			<view class="friend-list" v-for="item in friendArr" :key="item.id">
				<!-- 群组 -->
				<view 
				class="friend-list-l" 
				v-if="item.groupName"
				@tap="toGroup('group', item.groupId)"
				>
					<text class="tip" v-if="item.tip > 0">{{item.tip}}</text>
					<groupHead :groupId="item.groupId"></groupHead>
				</view>
				<view class="friend-list-r" 
				v-if="item.groupName" 
				@tap="toGroup('group', item.groupId)"
				>
					<view class="top">
						<view class="name">{{item.groupName}}</view>
						<view class="time">{{item.time | formatDate}}</view>
					</view>
					<view class="content">
						{{item.news}}
					</view>
				</view>
				<!-- 好友 -->
				<view 
				class="friend-list-l" 
				v-if="item.name" 
				@tap="toFriend('friend', 2)"
				>
					<text class="tip" v-if="item.tip > 0">{{item.tip}}</text>
					<image :src="item.imgurl"></image>
				</view>
				<view 
				class="friend-list-r" 
				v-if="item.name"
				@tap="toFriend('friend', 2)"
				>
					<view class="top">
						<view class="name">{{item.name}}</view>
						<view class="time">{{item.time | formatDate}}</view>
					</view>
					<view class="content">
						{{item.news}}
					</view>
				</view>
			</view>
			
			<view class="friend-list">
				<view class="friend-list-l">
					<text class="tip">99+</text>
					<image src="../../static/images/public/Head/hodgeHead.png"></image>
				</view>
				<view class="friend-list-r">
					<view class="top">
						<view class="name">我自己</view>
						<view class="time">2021-9-29</view>
					</view>
					<view class="content">
						偶尔对自己好些，偷个小懒，抽点小疯，花点小钱，不算伤天害理。
					</view>
				</view>
			</view>
			
		</view>
		<!-- 更多功能 -->
		<view class="morePanel" v-show="showPanel" @tap="hidePanel">
			<view class="featuresPanel" :animation="animationData_panel">
				<view class="panel_item" @tap="toBuildGroup">
					<view class="panel_icon">
						<image class="img" src="../../static/images/index/发起群聊.png"></image>
					</view>
					<view class="title">发起群聊</view>
				</view>
				<view class="panel_item">
					<view class="panel_icon">
						<image class="img" src="../../static/images/index/添加朋友.png"></image>
					</view>
					<view class="title">添加朋友</view>
				</view>
				<view class="panel_item">
					<view class="panel_icon">
						<image class="img" src="../../static/images/index/扫一扫.png"></image>
					</view>
					<view class="title">扫一扫</view>
				</view>
				<view class="panel_item">
					<view class="panel_icon">
						<image class="img" src="../../static/images/index/收付款.png"></image>
					</view>
					<view class="title">收付款</view>
				</view>
				<view class="panel_item">
					<view class="panel_icon">
						<image class="img" src="../../static/images/index/帮助与反馈.png"></image>
					</view>
					<view class="title last_title">帮助与反馈</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js';
	import fall from '../../utils/fall.js';
	import groupHead from '../../components/groupHead.vue';
	export default {
		data() {
			return {
				friendArr: [],
				showPanel: false,
				animationData_panel: {},
				groupHeadArr: [],
			}
		},
		filters: {
			 formatDate(date) {
				 return fall.formatDate(date)
			 }
		},
		onLoad() {
			this.getFriends()
		},
		methods: {
			// 为全部用户，后期将friends改为myFriends
			getFriends() {
				this.friendArr = datas.friends();
				// console.log(datas.groups());
				this.friendArr.unshift(...datas.groups())
				
			},
			toSearch() {
				uni.navigateTo({
					url: '../search/search'
				})
			},
			// 弹出更多功能面板
			moreFeatures() {
				this.showPanel = true;
				var animation = uni.createAnimation({
					duration: 2000,
					timingFunction: 'ease',
				})
				animation.scale(1).step();
				this.animationData_panel = animation.export();
			},
			// 隐藏面板
			hidePanel() {
				this.showPanel = false;
			},
			// 到群聊天页
			toGroup(category, id) {
				uni.navigateTo({
					url: '../chat/chat?id='+id+'&category='+category,
				})
			},
			// 到好友聊天页
			toFriend(category, id) {
				uni.navigateTo({
					url: '../chat/chat?id='+id+'&category='+category,
				})
			},
			// 到建群页面
			toBuildGroup() {
				uni.navigateTo({
					url: './buildGroup/buildGroup',
				})
			},
		},
		components: {
			groupHead,
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 750rpx;
		.top-bar {
			height: 80rpx;
			width: 750rpx;
			box-sizing: border-box;
			// border: 1px solid red;
			z-index: 10;
			background-color: $uni-bg-color;
			box-shadow: 1rpx 4rpx 13rpx rgba(0, 0, 0, .2);
			position: fixed;
			top: 0px;
			left: 0;
			display: flex;
			align-items: center;
			// padding-top: var(--status-bar-height);
			padding: 0rpx 30rpx;
			image {
				width: 20px;
				height: 20px;
			}
			.top-bar-left {
				flex: 1;
			}
				
			.top-bar-center {
				flex: 2;
				text-align: center;
			}
			.top-bar-right {
				display: flex;
				flex: 1;
				justify-content: space-between;
				width: 16%;
			}
		}
		.friends {
			width: 750rpx;
			margin-top: 100rpx;
			padding: 30rpx;
			box-sizing: border-box;
			
			.friend-list {
				width: 100%;
				height: auto;
				&:active {
					background-color: $uni-bg-color-grey;
				}
				// border: 1px solid red;
				box-sizing: border-box;
				margin-bottom: 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.friend-list-l {
					width: 18%;
					height: 100%;
					// z-index: -100;
					// border: 1px solid green;
					position: relative;
					.tip {
						display: inline-block;
						min-width: 28rpx;
						height: 28rpx;
						line-height: 28rpx;
						position: absolute;
						top: -20rpx;
						right: 5rpx;
						padding: 8rpx;
						// z-index: 10;
						text-align: center;
						background-color: red;
						border-radius: 36rpx;
						color: #fff;
						font-size: 11px;
						
					}
					image {
						width: 100rpx;
						height: 100rpx;
						border-radius: 15rpx;
						border: 1px solid black;
						
					}
				}
				.friend-list-r {
					width: 80%;
					// border: 1px solid red;
					
					
					.top {
						display: flex;
						justify-content: space-between;
						.time {
							font-size: 28rpx;
							color: #636e72;
						}
					}
					.content {
						width: 100%;
						margin-top: 10rpx;
						overflow: hidden;
						font-size: 32rpx;
						color: #636e72;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					
				}
				
			}
		}
		.morePanel {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 100;
			background-color: rgba(222,222,222,.2);
			.featuresPanel {
				width: 300rpx;
				height: 500rpx;
				border-radius: 20rpx 0rpx 20rpx 20rpx;
				background-color: black;
				position: absolute;
				top: 80rpx;
				right: 30rpx;
				// transform: scale(0.4);
				// opacity: 1;
				.panel_item {
					width: 100%;
					height: 100rpx;
					box-sizing: border-box;
					display: flex;
					justify-content: start;
					align-items: center;
					.panel_icon {
						width: 100rpx;
						height: 45rpx;
						text-align: center;
						.img {
							width: 45rpx;
							height: 45rpx;
						}
					}
					.title {
						width: 200rpx;
						color: #FFFFFF;
						height: 100%;
						border-bottom: 1px solid #2d3436;
						line-height: 100rpx;
						letter-spacing: 3rpx;
						font-size: 33rpx;
					}
					.last_title {
						border-bottom: none;
					}
				}
			}
		}
	}
	

</style>
