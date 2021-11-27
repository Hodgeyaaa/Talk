<template>
	<view class="singup">
		<view class="top-bar">
			<view class="top-bar-left" @tap="toSingin">
				<image @tap="toMine" src="../../static/images/public/取消.png"></image>
			</view>
			<view class="top-bar-right">
				<text @tap="toSingin">登录</text>
			</view>
		</view>
		<view class="logo">
			<text>LOGO</text>
		</view>
		<view class="main">
			<view class="username">
				<input type="text"
				placeholder="用户名"
				placeholder-style="color:#aaa;font-size:32rpx"
				v-model="userName"
				@input="isusername"
				@blur="getUser"
					/>
				<text v-if="name_display">{{name_tip}}</text>
			</view>
			<view class="email">
				<input type="text"
				placeholder="邮箱"
				placeholder-style="color:#aaa;font-size:32rpx"
				@input="isemail"
				v-model="email"
				/>
				<text v-if="email_display">{{email_tip}}</text>
			</view>
			<view class="password">
				<input :type="password_type"
				placeholder="密码"
				placeholder-style="color:#aaa;font-size:32rpx"
				v-model="pwd"
				@input="ispassword"
				/>
				<image :src="passwordImg" @click="handleimg"></image>
			</view>
			<text class="password_text" v-if="password_display">{{password_tip}}</text>
			<view class="verification">
				<input type="number" placeholder="验证码"placeholder-style="color:#aaa;font-size:32rpx" @input="isverification" />
				<button @click="vhandle" class="v-btn" ref="btn" :disabled="btn_disabled">{{verification_info}}</button>
			</view>
			<text class="verification_text" v-if="verification_display">{{verification_tip}}</text>
			<!-- <view class="tips">用户名或密码错误</view> -->
		</view>
		<view class="logup">
			<button :disabled="can_post" @tap="register">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName: '',
				email: '',
				pwd: '',
				myVerification: '',
				verification_info: '点击获取',
				password_type: 'password',
				time: 5,
				btn_disabled: false,
				passwordImg: '../../static/images/test_img/password_hide.png',
				flag: 1,
				email: '',
				name_tip: '用户名不能为空',
				email_tip: '邮箱不能为空',
				password_tip: '密码不能为空',
				verification_tip: '验证码错误',
				name_display: false,
				email_display: false,
				password_display: false,
				verification_display: false,
				can_post: true,
				userInfo: {
					username: '',
					user_email: '',
					user_password: '',
					verification: ''
				},
				isend: false
				
			}
		},
		onLoad() {
			
		},
		methods: {
			toSingin() {
					uni.navigateBack({
						delta: 1
					})
			},
			isusername(e) {
				if(e.detail.value.length === 0) {
					this.name_display = true
				}
				else {
					this.name_display = false
					
				}
				this.isfinish()
			},
			getUser(e) {
				this.userInfo.username = e.detail.value
			},
			isemail(e) {
				this.email = e.detail.value
				let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
				if (this.email.length === 0) {
					this.email_display = true
				}
				else if(this.email.length != 0) {
					if(reg.test(this.email)) {
						this.email_display = false
						this.userInfo.user_email = e.detail.value
						// console.log(this.userInfo.user_email)
					}
					else {
						this.email_display = true
						this.email_tip = '邮箱格式不正确'
						
					}
				}
				this.isfinish()
			},
			
			ispassword(e) {
				let reg = /^[a-zA-Z0-9]{8,18}$/;
				if(e.detail.value.length === 0) {
					this.password_tip = '密码不能为空'
					this.password_display = true
				}
				else if(e.detail.length != 0) {
					if(!reg.test(e.detail.value)) {
						this.password_display = true
						this.password_tip = '请输入8~16位带数字，字母的密码'
						
					}
					else {
						this.password_display = false
						this.userInfo.user_password = e.detail.value
						
					}
				}
				this.isfinish()
				
			},
			vhandle() {
				this.btn_disabled = !this.btn_disabled
				// 后台发送邮箱
				this.$myRequest({
					url:'/singup/sendCode',
					data: {
						mail: this.email,
					},
					method: 'POST',
				})
				let timer = setInterval(() => {
					this.time--
					this.verification_info = `${this.time}s后重新发送`
					if(this.time == 0){
						clearInterval(timer)
						this.verification_info = '重新发送'
						this.time = 5
						this.btn_disabled = !this.btn_disabled
					}
					
				}, 1000)
			},
			handleimg() {
				if(this.flag == 1) {
					this.passwordImg = '../../static/images/test_img/password_display.png'
					this.password_type = 'text'
					this.flag = 0
				}
				else if(this.flag == 0) {
					this.passwordImg = '../../static/images/test_img/password_hide.png'
					this.password_type = 'password'
					this.flag = 1
				}
			},
			isverification(e) {
				if(e.detail.value.length > 3) {
					this.isend = true
					this.myVerification = e.detail.value;
				}
				else {
					this.isend = false;
				}
				this.isfinish()
			},
			// 验证验证码
			judgeVft(e) {
				if(e.detail.value.length === 0) {
					this.verification_display = true
				}
				else
				this.verification_display = false
			},
			isfinish() {
				if(!this.name_display && !this.email_display && !this.password_display && this.isend) {
						this.can_post = false
				}
				else {
					this.can_post = true
				}
				
			},
			register() {
				this.$myRequest({
					url: '/singup/add',
					method: 'POST',
					data: {
						name: this.userName,
						mail: this.email,
						pwd: this.pwd,
						verification: this.myVerification
					}
				}).then((res) => {
					if(!res.data){
						this.verification_display = true;
					}else {
						this.verification_display = false;
						uni.navigateTo({
							url: '../singin/singin',
						})
					}
					console.log(res.data);
				})
				
			},
			toMine() {
				uni.switchTab({
					url: '../mine/mine',
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../commons/css/mycss.scss';
	.singup {
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
		// 	padding: 0rpx 30rpx;
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
			.username {
				width: 80%;
				height: 100rpx;
				margin-bottom: 30rpx;
				position: relative;
				input {
					width: 100%;
				}
				text {
					position: absolute;
					right: 20rpx;
					bottom: 20rpx;
					color: red;
					font-size: 33rpx;
					border: 1px solid red;
				}
			}
			.email {
				width: 80%;
				height: 100rpx;
				margin-bottom: 30rpx;
				position: relative;
				input {
					width: 100%;
				}
				text {
					position: absolute;
					right: 20rpx;
					bottom: 20rpx;
					color: red;
					font-size: 33rpx;
				}
			}
			.password {
				width: 80%;
				height: 100rpx;
				margin-bottom: 30rpx;
				position: relative;
				input {
					width: 100%;
				}
				image {
					width: 50rpx;
					height: 50rpx;
					position: absolute;
					z-index: 10;
					right: 20rpx;
					bottom: 20rpx;
				}
			}
			.password_text {
				margin-bottom: 30rpx;
				color: red;
				font-size: 33rpx;
			}
			.verification {
				width: 80%;
				height: 100rpx;
				display: flex;
				align-items: center;
				input {
					width: 50%;
					height: 100%;
					
				}
				button {
					width: 38%;
					height: 80rpx;
					border-radius: 40rpx;
					font-size: 28rpx;
					line-height: 80rpx;
					border: 1px solid black;
				}
			}
			.verification_text {
				color: red;
				font-size: 33rpx;
				
			}
		}
		.logup {
			width: 750rpx;
			margin-top: 100rpx;
			button {
				width: 50%;
				height: 80rpx;
				border: none;
				outline: none;
				line-height: 80rpx;
				border-radius: 40rpx;
			}
		}
	}
	
</style>
