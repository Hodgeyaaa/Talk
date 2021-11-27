<template>
	<view class="singin">
		<view class="top-bar">
			<view class="top-bar-left">
				<image @tap="toMine" src="../../static/images/public/取消.png"></image>
			</view>
			<view class="top-bar-right">
				<text @click="toSingup">注册</text>
			</view>
		</view>
		<view class="logo">
			<text>LOGO</text>
		</view>
		<view class="main">
			<input type="text" 
			placeholder="用户名/邮箱" 
			placeholder-style="color:#aaa;font-size:32rpx"
			v-model="userName"
			@blur="getUser"
			 />
			<input type="password" 
			placeholder="密码" 
			placeholder-style="color:#aaa;font-size:32rpx" 
			v-model="password"
			@blur="getPsw"
			/>
			<view class="tips" v-if="sing_tip">{{sing_text}}</view>
		</view>
		<view class="login">
			<button @tap="isTrue">登录</button>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				sing_tip: false,
				userName: '',
				password: '',
				sing_text: '用户名或密码不能为空'
			}
		},
		methods: {
			
			getUser(e) {
				this.user = e.detail.value
			},
			getPsw(e) {
				this.psw = e.detail.value
			},
			isTrue() {
					if(this.user && this.psw) {
						// this.sing_tip = false
						// uni.request({
						// 	url: 'http://127.0.0.1:3000/test',
						// 	data: {
								
						// 	},
						// 	method: 'GET',
						// 	success: (data) => {
						// 		console.log(data)
						// 	}
						// })
						this.$myRequest({
							// url: '/test',
							url: '/singin',
							method: 'POST',
							data: {
								name: this.userName,
								pwd: this.password,
							}
						}).then((res) => {
							
							if(res.data.result) {
								this.sing_tip = false;
								uni.switchTab({
									url: '../mine/mine',
								})
							}else {
								this.sing_tip = true
								this.sing_text = res.data.msg;
							}
							console.log(res.data.result);
							
						});
						console.log("提交数据")
					}
					else {
						this.sing_tip = true
					}
			},
			toSingup() {
				uni.navigateTo({
					url: '../singup/singup'
				})
			},
			toMine() {
				uni.switchTab({
					url: '../mine/mine',
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../commons/css/mycss.scss';
	// .top-bar {
	// 	height: 80rpx;
	// 	width: 750rpx;
	// 	box-sizing: border-box;
	// 	border: 1px solid red;
	// 	z-index: 10;
	// 	background-color: $uni-bg-color;
	// 	position: fixed;
	// 	top: 0px;
	// 	left: 0;
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: space-between;
	// 	// padding-top: var(--status-bar-height);
	// 	padding: 0rpx 50rpx;
	// 	.top-bar-left {
	// 		width: 50rpx;
	// 		height: 50rpx;
	// 		border: 1px solid red;
	// 		image {
	// 			width: 100%;
	// 			height: 100%;
	// 		}
	// 	}
		
	// }
	.logo {
		margin-top: 80rpx;
		padding: 80rpx 0;
		text-align: center;
	}
	.main {
		width: 750rpx;
		height: auto;
		box-sizing: border-box;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		input {
			width: 80%;
			height: 100rpx;
			margin-bottom: 30rpx;
			border-bottom: 1px solid black;
		}
		.tips {
			font-size: 30rpx;
			color: red;
			position: absolute;
			// border: 1px solid green;
			left: 150rpx;
			bottom: -20rpx;
		}
	}
	.login {
		width: 750rpx;
		margin-top: 100rpx;
		button {
			width: 50%;
			height: 80rpx;
			line-height: 75rpx;
			border-radius: 40rpx;
			font-size: 38rpx;
			border: 1px solid black;
		}
	}
</style>
