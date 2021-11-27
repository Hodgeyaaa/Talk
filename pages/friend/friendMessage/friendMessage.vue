<template>
	<view class="friendMessage">
		<topBar>
			<template v-slot:center>
				<view>好友信息</view>
			</template>
		</topBar>
		<view class="baseMessage">
			<view class="left">
				<image class="headImg" :src="friendMsg.imgurl"></image>
			</view>
			<view class="msg">
				<view class="nick">{{friendMsg.nick}}</view>
				<view class="other userName">{{friendMsg.name}}</view>
				<view class="other email">邮箱:{{friendMsg.email}}</view>
				<view class="other address">地区: 广州</view>
			</view>
		</view>
		<func>
			<template v-slot:left>
				设置备注和标签
			</template>
		</func>
		<func>
			<template v-slot:left>
				朋友权限
			</template>
		</func>
		<func>
			<template v-slot:left>
				动态
			</template>
		</func>
		<func>
			<template v-slot:left>
				更多信息
			</template>
		</func>
		<view class="sendMsg" @tap="toChat">发消息</view>
		<view class="del" @tap="deleteFriend">删除好友</view>
	</view>
</template>

<script>
	import datas from '../../../commons/js/datas.js';
	import func from '../../../components/func_item.vue';
	import topBar from '../../../components/top-bar.vue';
	export default {
		data() {
			return {
				friendMsg: {},
			}
		},
		onLoad(option) {
			this.getFriendMsg(option.id);
		},
		methods: {
			getFriendMsg(id) {
				let myFriends = datas.myFriends();
				myFriends.forEach((item) => {
					if(id == item.id) {
						this.friendMsg = item;
					}
					// console.log(this.friendMsg);
				})
			},
			// 点击发消息,携带id
			toChat() {
				uni.navigateTo({
					url: '../../chat/chat?id='+this.friendMsg.id+'&category=friend',
				})
				console.log(this.friendMsg.id);
			},
			// 删除好友
			deleteFriend() {
				this.$bus.$emit('delFriend', this.friendMsg.id);
				uni.navigateBack({
					delta: 1,
				})
			},
		},
		components: {
			func,
			topBar,
		}
	}
</script>

<style lang="scss" scoped>
	.friendMessage {
		width: 750rpx;
		margin-top: 80rpx;
		.baseMessage {
			width: 100%;
			height: auto;
			box-sizing: border-box;
			padding: 60rpx 25rpx;
			// border: 1px solid red;
			display: flex;
			.left {
				width: 100rpx;
				height: 100rpx;
				.headImg {
					width: 100%;
					height: 100%;
				}
			}
			.msg {
				margin-left: 40rpx;
				.nick {
					font-size: 42rpx;
					font-weight: bolder;
				}
				.other {
					font-size: 28rpx;
					margin-top: 5rpx;
				}
			}
			
		}
		.sendMsg {
			width: 60%;
			height: 80rpx;
			position: absolute;
			left: 20%;
			bottom: 150rpx;
			color: #FFFFFF;
			font-size: 33rpx;
			background-color: #2c2c2c;
			text-align: center;
			line-height: 80rpx;
			border-radius: 40rpx;
			&:active {
				background-color: black;
			}
		}
		.del {
			width: 60%;
			height: 78rpx;
			position: absolute;
			left: 20%;
			bottom: 30rpx;
			color: #2c2c2c;
			font-size: 33rpx;
			background-color: #FFFFFF;
			text-align: center;
			line-height: 80rpx;
			border: 1px solid black;
			border-radius: 39rpx;
			transition: all .1s linear;
			&:active {
				background-color: red;
				color: #FFFFFF;
			}
		}
		
	}
</style>
