<template>
	<view class="mailList">
		<searchItem @hideList="getStatus(data)"></searchItem>
		<view class="func" v-if="!isHideList">
			<pageItem>
				<template v-slot:left>
					<image class="left_img funImg" src="../../static/images/index/添加朋友.png"></image>
				</template>
				<template v-slot:text>
					<view class="text">新的朋友</view>
				</template>
			</pageItem>
		</view>
		<view class="result" v-if="!isHideList">
			<view class="result_item">
				<view class="title">好友</view>
				<!-- <view class="user_item" v-for="item in userArr" :key="item.id" @tap="user_click(item.id)">
					<image :src="item.imgurl"></image>
					<view class="username" v-html="item.name"></view>
				</view> -->
				<pageItem class="user_item" v-for="item in userArr" :key="item.id" @tap="user_click(item.id)">
					<template v-slot:left>
						<image class="left_img" :src="item.imgurl"></image>
					</template>
					<template v-slot:text>
						<view class="text">{{item.name}}</view>
					</template>
				</pageItem>
			</view>
			<view class="result_item">
				<view class="title">群聊</view>
				<pageItem>
					<template v-slot:left>
						<view class="groupImg">
							<groupHead :groupId="1"></groupHead>
						</view>
					</template>
					<template v-slot:text>
						<view class="groupName">1号群</view>
					</template>
				</pageItem>
			</view>
		</view>
	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js';
	import pageItem from '../../components/page_item.vue';
	import groupHead from '../../components/groupHead.vue';
	import searchItem from '../../components/searchItem.vue';
	export default {
		data() {
			return {
				userArr: [],
				groupArr: [],
				isHideList: false,
			}
		},
		onLoad() {
			this.getUser();
		},
		mounted() {
			// 删除好友事件触发
			this.$bus.$on('delFriend', (id) => {
				for(var i = 0; i < this.userArr.length; i++) {
					if(this.userArr[i].id == id) {
						this.userArr.splice(i, 1);
					}
				}
			})
		},
		methods: {
			
			getUser() {
				this.userArr = datas.myFriends();
			},
			user_click(id) {
				uni.navigateTo({
					url: '../friend/friendMessage/friendMessage?id='+id,
				})
			},
			// 根据子组件传来的参数决定是否隐藏列表
			getStatus(data) {
				this.isHideList = !this.isHideList;
				console.log(this.isHideList)
			}
			
		},
		components: {
			pageItem,
			groupHead,
			searchItem,
		}
	}
</script>

<style lang="scss" scoped>
	.mailList {
		width: 750rpx;
		box-sizing: border-box;
		.func {
			width: 750rpx;
			box-sizing: border-box;
			margin-top: 100rpx;
			padding-left: 30rpx;
			box-sizing: border-box;
		}
		.left_img {
			width: 80rpx;
			height: 80rpx;
		}
		.funImg {
			border-radius: 14rpx;
			background-color: black;
		}
		.result {
			width: 750rpx;
			margin-top: 30rpx;
			padding: 30rpx;
			padding-right: 0;
			box-sizing: border-box;
			.result_item {
				width: 100%;
				margin-bottom: 80rpx;
				.title {
					font-size: 40rpx;
					font-weight: 500;
					margin-bottom: 40rpx;
				}
				
				.user_item {
					display: flex;
					align-items: center;
					width: 100%;
					position: relative;
					&:active {
						background-color: $uni-bg-color-grey;
					}
					image {
						width: 80rpx;
						height: 80rpx;
						border-radius: 14rpx;
						border: 1px solid black;
					}
					.username {
						font-size: 35rpx;
					}
				}
			}
			
		}
	}
</style>
