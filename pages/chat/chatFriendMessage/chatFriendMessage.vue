<template>
	<view class="friendMessage">
		<view class="member">
			<view class="member_list">
				<!-- <view class="member_item" v-for="item in memberArr" :key="item.id">
					<image class="member_img" :src="item.imgurl"></image>
					<view class="member_name">{{item.name}}</view>
				</view> -->
				
				<view class="member_item" @tap="toFriendMsg">
					<image class="member_img" :src="HeadImg"></image>
					<view class="member_name">{{userName}}</view>
				</view>
				<view class="member_item">
					<image class="member_img last_item" src="@/static/images/public/add_member.png"></image>
					<view class="member_name"></view>
				</view>
			</view>
			
		</view>
		<func>
			<template v-slot:left>
				<view>查看聊天记录</view>
			</template>
		</func>
		<func>
			<template v-slot:left>
				<view>消息免打扰</view>
			</template>
			<template v-slot:right>
				<switch color="black" class="switched" />
			</template>
		</func>
		<func>
			<template v-slot:left>
				<view>设置当前聊天背景</view>
			</template>
		</func>
		<func>
			<template v-slot:left>
				<view>清除聊天记录</view>
			</template>
		</func>
		<func>
			<template v-slot:left>
				<view>投诉</view>
			</template>
		</func>
	</view>
</template>

<script>
	import datas from '../../../commons/js/datas.js'
	import func from '../../../components/func_item.vue';
	export default {
		data() {
			return {
				HeadImg: '',
				userName: 'none',
				userId: '',
			}
		},
		onLoad(option) {
			this.getUserName(option.id);
			this.userId = option.id;
			console.log(option.id);
		},
		
		methods: {
			getUserName(id) {
					let allUser = datas.friends();
					allUser.forEach((item) => {
						if(item.id == id) {
							this.userName = item.name;
							this.HeadImg = item.imgurl;
						}
					})
			},
			// 跳转到好友信息页
			toFriendMsg() {
				uni.navigateTo({
					url: '../../friend/friendMessage/friendMessage?id=' + this.userId,
				})
			}
		},
		components: {
			func,
		}
	}
</script>

<style lang="scss" scoped>
	.friendMessage {
		.member {
			width: 750rpx;
			height: auto;
			.member_list {
				width: 100%;
				height: auto;
				padding: 20rpx;
				border: 1px solid black;
				box-sizing: border-box;
				overflow: hidden;
				.member_item {
					width: 20%;
					height: auto;
					padding: 20rpx;
					float: left;
					box-sizing: border-box;
					text-align: center;
					// border: 1px solid red;
					
					.member_img {
						width: 100rpx;
						height: 100rpx;
						border: 1px solid black;
						border-radius: 15rpx;
					}
					.last_item {
						border: none;
					}
					.member_name {
						width: 100%;
						padding: 0 10rpx;
						box-sizing: border-box;
						font-size: 25rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}
			
		}
		.switched {
			transform: scale(.7, .7) translate(140rpx, -20rpx);
			z-index: 100;
		}
	}
</style>
