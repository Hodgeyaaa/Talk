<template>
	<view class="group">
		<top-bar>
			<template v-slot:left>
				<image 
				src="../../../static/images/public/取消.png"
				class="left_img"
				></image>
			</template>
			<template v-slot:center>
				<view>发起群聊</view>
			</template>
		</top-bar>
		<view class="main">
			<view class="search_wrap">
				<view class="search_box">
					<input type="text"
					class="search"
					placeholder="搜索用户"
					placeholder-style="color:#aaa;font-size:32rpx"
					v-model="searchVal"
					@input="search"
					/>
					<image 
					src="../../../static/images/public/取消.png"
					class="cancel_img"
					></image>
				</view>
				<image 
				src="../../../static/images/index/search_img.png"
				class="search_img"
				></image>
				
			</view>
			<scroll-view class="result">
				<view class="result_item" v-if="!isSearch">
					<view class="user_item" 
					v-for="item in userarr" 
					:key="item.id" 
					@tap="user_click(item.id)">
						<view class="selected">
							<image 
							v-show="item.isSelected" 
							class="selected_img"
							src="../../../static/images/public/选中.png"
							></image>
						</view>
						<image :src="item.imgurl" class="user_img"></image>
						<view class="userInfo">
							<view class="username" v-html="item.name"></view>
							<view class="email" v-html="item.email"></view>
						</view>
						
					</view>
				</view>
				
				<view class="result_item" v-if="!isSearch">
					<view class="user_item" 
					v-for="item in userarr" 
					:key="item.id" 
					@tap="user_click(item.id)">
						<view class="selected">
							<image 
							v-show="item.isSelected" 
							class="selected_img"
							src="../../../static/images/public/选中.png"
							></image>
						</view>
						<image :src="item.imgurl" class="user_img"></image>
						<view class="userInfo">
							<view class="username" v-html="item.name"></view>
							<view class="email" v-html="item.email"></view>
						</view>
						
					</view>
				</view>
				
				<view class="result_item" v-if="!isSearch">
					<view class="user_item" 
					v-for="item in userarr" 
					:key="item.id" 
					@tap="user_click(item.id)">
						<view class="selected">
							<image 
							v-show="item.isSelected" 
							class="selected_img"
							src="../../../static/images/public/选中.png"
							></image>
						</view>
						<image :src="item.imgurl" class="user_img"></image>
						<view class="userInfo">
							<view class="username" v-html="item.name"></view>
							<view class="email" v-html="item.email"></view>
						</view>
						
					</view>
				</view>
				<!-- 搜索的好友 -->
				<view class="result_item" v-if="isSearch">
					<view class="user_item" 
					v-for="item in searchUser" 
					:key="item.id" 
					@tap="user_click(item.id)">
						<view class="selected">
							<image 
							v-show="item.isSelected" 
							class="selected_img"
							src="../../../static/images/public/选中.png"
							></image>
						</view>
						<image :src="item.imgurl" class="user_img"></image>
						<view class="userInfo">
							<view class="username" v-html="item.name"></view>
							<view class="email" v-html="item.email"></view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="bottom_bar">
			<view class="input_box">
				<input
				type="text" 
				placeholder="请输入群名"
				placeholder-style="color:#aaa;font-size:32rpx"
				class="bottom_input"
				v-model="groupName"
				/>
				<image
				src="../../../static/images/public/取消.png"
				class="cancel_img"
				></image>
			</view>
			<view class="build_bot" @tap="buildGroup">
				<text class="bot">创建</text>
				<text class="num" v-show="memberNum > 0">({{memberNum}})</text>
			</view>
		</view>
	</view>
</template>

<script>
	import datas from '../../../commons/js/datas.js'
	import topBar from '../../../components/top-bar.vue'
	export default {
		data() {
			return {
				userarr: [],
				searchUser: [],
				searchVal: '',
				isSelected: false,
				memberNum: 0,
				isSearch: false,
				groupName: '',
			}
		},
		onLoad() {
			this.getMyFriends()
		},
		methods: {
			// 加载好友
			getMyFriends() {
				datas.myFriends().forEach((item) => {
					item.isSelected = false;
					this.userarr.push(item);
				})
			},
			// 搜索好友
			search() {
				if(this.searchVal.length > 0) {
					this.isSearch = true;
					this.searchUser = [];
					// let exp = eval("/"+e+"/g");
					this.userarr.forEach((item) => {
						if(item.name.indexOf(this.searchVal) != -1 || item.email.indexOf(this.searchVal) != -1) {
							
							this.searchUser.push(item);
						}
					})
				}else {
					this.isSearch = false;
				}
			},
			// 点击选中好友
			user_click(id) {
				this.userarr.forEach((item) => {
					if(item.id === id) {
						if(item.isSelected === false) {
							item.isSelected = true;
							this.memberNum++;
						}else {
							item.isSelected = false;
							this.memberNum--;
						}
					}
					
				})
				
			},
			// 创建群聊
			buildGroup() {
				if(this.groupName === '') {
					uni.showToast({
						title: '群名不能为空',
						image: '../../../static/images/public/提示.png',
						position: 'top',
					})
				}
				else if(this.memberNum < 2) {
					uni.showToast({
						title: '请选择至少2名成员',
						image: '../../../static/images/public/提示.png',
						position: 'top',
					})
				}
				else {
					let group = {};
					group.name = this.groupName;
					group.memberArr = this.userarr.filter(function (item) {
						return item.isSelected == true;
					})
					this.$store.commit('addGroup', group);
					console.log(this.$store.state.group)
					// 跳转页面
				}
			}
		},
		components: {
			topBar,
		}
	}
</script>

<style lang="scss" scoped>
	.group {
		top-bar {
			.left_img {
				width: 50rpx;
				height: 50rpx;
			}
		}
		.main {
			width: 750rpx;
			margin-top: 250rpx;
			margin-bottom: 120rpx;
			.search_wrap {
				width: 100%;
				height: 140rpx;
				padding: 30rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-around;
				align-items: center;
				background-color: #FFFFFF;
				position: fixed;
				top: 82rpx;
				left: 0;
				right: 0;
				z-index: 8;
				.search_box {
					width: 88%;
					height: 80rpx;
					position: relative;
					.search {
						width: 100%;
						height: 100%;
						box-sizing: border-box;
						border-radius: 40rpx;
						border: 1px solid black;
						background-color: $uni-bg-color-grey;
						padding: 0 100rpx 0 32rpx;
						font-size: 33rpx;
					}
					.cancel_img {
						position: absolute;
						top: 20rpx;
						right: 50rpx;
						width: 40rpx;
						height: 40rpx;
					}
				}
				.search_img {
					width: 60rpx;
					height: 60rpx;
				}
			}
			.result {
				width: 100%;
				margin-top: 80rpx;
				padding: 0rpx 30rpx;
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
						border-bottom: 1px solid black;
						position: relative;
						margin-bottom: 30rpx;
						&:active {
							background-color: $uni-bg-color-grey;
						}
						.user_img {
							width: 80rpx;
							height: 80rpx;
							border-radius: 18rpx;
							border: 1px solid black;
						}
						.selected {
							width: 40rpx;
							height: 40rpx;
							border: 1px solid black;
							border-radius: 50%;
							margin: 0 10rpx;
							.selected_img {
								width: 100%;
								height: 100%;
							}
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
		.bottom_bar {
			width: 100%;
			height: 120rpx;
			border: 1px solid black;
			box-sizing: border-box;
			position: fixed;
			bottom: 0;
			left: 0;
			background-color: #FFFFFF;
			padding: 20rpx 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.input_box {
				width: 72%;
				height: 80rpx;
				position: relative;
				.bottom_input {
					width: 100%;
					height: 100%;
					box-sizing: border-box;
					border-radius: 40rpx;
					border: 1px solid black;
					background-color: $uni-bg-color-grey;
					padding: 0 100rpx 0 32rpx;
					font-size: 33rpx;
				}
				.cancel_img {
					position: absolute;
					top: 20rpx;
					right: 50rpx;
					width: 40rpx;
					height: 40rpx;
				}
			}
			.build_bot {
				height: 70rpx;
				padding: 0 20rpx;
				line-height: 70rpx;
				border-radius: 10rpx;
				background-color: #333333;
				color: #FFFFFF;
				font-size: 30rpx;
			}
		}
		
		
	}
</style>
