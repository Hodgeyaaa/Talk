<template>
	<view class="search_content">
		<view class="top-bar">
			<view class="top-bar-left">
				<input type="text"
				class="search"
				 placeholder="搜索用户/群"
				  placeholder-style="color:#aaa;font-size:32rpx"
				   @input="search"
				   />
				   <image src="../static/images/index/search_img.png"></image>
			</view>
			<view class="top-bar-right" @tap="back">
				<text>取消</text>
			</view>
		</view>
		<view class="result" v-if="userarr.length">
			<view class="result_item">
				<view class="title">用户</view>
				<view class="user_item" v-for="item in userarr" :key="item.id" @tap="user_click(item.isfriend)">
					<image :src="item.imgurl"></image>
					<view class="userInfo">
						<view class="username" v-html="item.name"></view>
						<view class="email" v-html="item.email"></view>
					</view>
					<view class="user_btn" v-if="item.isfriend">发消息</view>
					<view class="user_btn" v-if="!item.isfriend">加好友</view>
				</view>
			</view>
			<view class="result_item">
				<view class="title">组群</view>
				<view class="user_item">
					<image src="../static/images/test_img/people.png"></image>
					<view class="userInfo">
						<view class="username">群名</view>
						<view class="email">abcdef@163.com</view>
					</view>
					<view class="user_btn">发消息</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import datas from '../commons/js/datas.js'
	export default {
		data() {
			return {
				userarr: []
			}
		},
		methods: {
			search(e) {
				this.userarr = [];
				let searchValue = e.detail.value;
				let arr = datas.friends();
				let isFriendArr = datas.isFriend()
				if(searchValue.length > 0) {
					// let exp = eval("/"+e+"/g");
					// 隐藏父组件列表
					this.$emit('hideList', {'status': true});
					arr.forEach((item) => {
						if(item.name.indexOf(searchValue) != -1 || item.email.indexOf(searchValue) != -1) {
							// item.name.replace(exp, "<span style='color:#4AAAFF;'>"+e+"</span>");
							// item.email.replace(exp, "<span style='color:#4AAAFF;'>"+e+"</span>");
							item.isfriend = false
							
							isFriendArr.forEach((list) => {
								if(list.friend === item.id) {
									item.isfriend = true
								}
							})
							
							this.userarr.push(item)
						}
					})
				}
				else {
					this.$emit('hideList', {'status': false});
				}
				console.log(this.userarr)
			},
			back() {
				uni.navigateBack({
					delta: 1,
				})
			},
			user_click(isfriend) {
				if(isfriend) {
					uni.navigateTo({
						url: '../pages/chat/chat'
					})
				}
				else {
					uni.navigateTo({
						url: '../pages/user_homepage/user_homepage'
					})
				}
			},
			
			
		}
	}
</script>

<style lang="scss">
	@import '../commons/css/mycss.scss';
	.search_content {
		.top-bar {
			box-shadow: 1rpx 4rpx 13rpx rgba(0, 0, 0, .2);
			.top-bar-left {
				width: 83%;
				height: 60rpx;
				box-sizing: border-box;
				position: relative;
			}
			.search {
				height: 100%;
				background-color: $uni-bg-color-grey;
				padding: 0 60rpx 0 12rpx;
				font-size: 33rpx;
				
			}
			image {
				position: absolute;
				right: 10rpx;
				bottom: 10rpx;
				width: 40rpx;
				height: 40rpx;
			}
		}
		.result {
			width: 750rpx;
			margin-top: 80rpx;
			padding: 50rpx;
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
					padding: 20rpx 0rpx;
					border-bottom: .5px solid black;
					position: relative;
					margin-bottom: 30rpx;
					&:active {
						background-color: $uni-bg-color-grey;
					}
					image {
						width: 80rpx;
						height: 80rpx;
						border-radius: 18rpx;
						border: 1px solid black;
					}
					.userInfo {
						margin-left: 50rpx;
						.username {
							font-size: 35rpx;
						}
						.email {
							font-size: 22rpx;
						}
					}
					.user_btn {
						width: 120rpx;
						height: 48rpx;
						border: 1px solid black;
						border-radius: 24rpx;
						font-size: 28rpx;
						text-align: center;
						line-height: 48rpx;
						position: absolute;
						right: 30rpx;
						
					}
				}
			}
			
		}
	}
</style>
