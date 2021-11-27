<template>
	<view class="container">
		<view class="top-bar">
			<view class="top-bar-left" @tap="back">
				<image src="../../static/images/index/add_ikmg.png"></image>
			</view>
			<view class="top-bar-right">
				
			</view>
		</view>
		<view class="back">
				<image src="../../static/images/test_img/tou.jpg" class="bg_img" mode="aspectFill"></image>
		</view>
		<view class="main">
			<view class="user_header">
				
					<image
					class="portrait"
					src="../../static/images/test_img/tou.jpg"
					mode=""
					:animation="animationData_portrait"
					></image>
					<image class="sex" 
					src="../../static/images/test_img/boy.png"
					:animation="animationData_sex"
					></image>
				
			</view>
			<view class="user_info">
				<view class="name">{{user.name}}</view>
				<view class="nick">昵称：{{user.nick}}</view>
				<view class="introduction">{{user.introduction}}</view>
			</view>
			<view class="add_btn" @tap="add_btn_tap">加为好友</view>
		</view>
		<view class="add_panel" :animation="animationData">
			<view class="user_name">{{user.name}}</view>
			<textarea class="say_some" maxlength="120" :value="name + '请求添加为好友~_~'"></textarea>
			<view class="btn_list">
				<view class="btn_cancel" @tap="cancel_tap">取消</view>
				<view class="btn_send">发送</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: 'admin',
				animationData: {},
				animationData_portrait: {},
				animationData_sex: {},
				user: {
					name: 'Hodge',
					nick: 'out of live',
					introduction: '没有那么多过不去的事，只有一颗不够勇敢的心，最终使你脱颖而出的，不是天赋异禀，而是持之以恒',
					
					
				}
				
			}
		},
		// onShow() {
		// 	var animation = uni.createAnimation({
		// 		duration: 3000,
		// 		timingFunction: 'ease',
		// 	})
		// 	this.animation = animation
		// },
		methods: {
			back() {
				
				uni.navigateBack({
					delta: 1,
				})
			},
			add_btn_tap() {
				// this.$nextTick(() => {
				// 	let panel = uni.createSelectorQuery().select('.add_panel')
				// 	panel.boundingClientRect((data) => {
				// 		console.log(data.bottom)
				// 	}).exec()
				// })
				console.log("test")
				var animation = uni.createAnimation({
					duration: 500,
					timingFunction: 'ease-out'
				})
				var animation_portrait = uni.createAnimation({
					duration: 500,
					timingFunction: 'ease-out'
				})
				var animation_sex = uni.createAnimation({
					duration: 500,
					timingFunction: 'ease-out',
				})
				animation.bottom('0rpx').step()
				this.animationData = animation.export()
				animation_portrait.width('100rpx').height('100rpx').translate('-240rpx', '100rpx').scale(2).step()
				this.animationData_portrait = animation_portrait.export()
				animation_sex.scale(1).left('170rpx').top('170rpx').step()
				animation_sex.scale(.8).step()
				this.animationData_sex = animation_sex.export()
				
			},
			cancel_tap() {
				var animation = uni.createAnimation({
					duration: 500,
					timingFunction: 'ease-out'
				})
				var animation_portrait = uni.createAnimation({
					duration: 500,
					timingFunction: 'ease-out'
				})
				var animation_sex = uni.createAnimation({
					duration: 500,
					timingFunction: 'ease-out',
				})
				animation.bottom('-820rpx').step()
				this.animationData = animation.export()
				animation_portrait.width('360rpx').height('360rpx').translate('0rpx', '0rpx').scale(1).step()
				this.animationData_portrait = animation_portrait.export()
				animation_sex.scale(.8).left('470rpx').top('290rpx').step()
				animation_sex.scale(1).step()
				this.animationData_sex = animation_sex.export()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../commons/css/mycss.scss';
	.top-bar {
		padding: 0rpx 40rpx;
		background: transparent;
	} 
	.back {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		
		.bg_img {
			position: absolute;
			left: -10rpx;
			top: -10rpx;
			opacity: .6;
			width: 105%;
			height: 105%;
			filter: blur(10px);
		}
	}
	.main {
		// z-index: 10;
		margin-top: 200rpx;
		text-align: center;
		.user_header {
				position: relative;
				z-index: 10;
				// transform: translate(-240rpx, 120rpx)
				//  scale(2);
				
				// border: 1px solid red;
				.portrait {
					width: 360rpx;
					height: 360rpx;
					margin: 0 auto;
					position: relative;
					border-radius: 50rpx;
					box-shadow: 0 2px 15rpx rgba(0, 0, 0, 0.4);
					// border-radius: 50%;
				}
				.sex {
					position: absolute;
					left: 470rpx;
					top: 290rpx;
					// left: 170rpx;
					// top: 170rpx;
					// transform: scale(.8);
					width: 60rpx;
					height: 60rpx;
					
				}
				
			
		}
		.user_info {
			position: relative;
			// z-index: 10;
			.name {
				font-size: 55rpx;
				margin: 40rpx 0 10rpx 0;
			}
			.nick {
				font-size: 26rpx;
			}
			.introduction {
				width: 600rpx;
				margin: 30rpx auto;
				font-size: 26rpx;
				// word-break: break-all;
				word-wrap: break-word;
				line-height: 45rpx;
			}
		}
		.add_btn {
			width: 250rpx;
			height: 80rpx;
			margin: 100rpx auto;
			position: relative;
			border: 1px solid red;
			line-height: 80rpx;
			border-radius: 40rpx;
			font-size: 35rpx;
		}
	}
	.add_panel {
		width: 100%;
		height: 820rpx;
		z-index: 9;
		position: fixed;
		bottom: -820rpx;
		background-color: #fff;
		border-radius: 50rpx 50rpx 0 0;
		padding: 30rpx;
		box-sizing: border-box;
		animation: '';
		.user_name {
			margin-top: 80rpx;
			font-size: 50rpx;
			font-weight: bold;
		}
		.say_some {
			width: 100%;
			height: 400rpx;
			box-sizing: border-box;
			background-color: $uni-bg-color-grey;
			padding: 30rpx;
			margin: 80rpx auto;
			font-size: 30rpx;
			line-height: 50rpx;
		}
		.btn_list {
			width: 100%;
			height: 80rpx;
			display: flex;
			// border: 1px solid red;
			text-align: center;
			box-sizing: border-box;
			.btn_cancel {
				width: 25%;
				height: 100%;
				line-height: 80rpx;
				border: 1px solid red;
				border-radius: 15rpx;
				margin-right: 50rpx;
			}
			.btn_send {
				width: 75%;
				height: 100%;
				line-height: 80rpx;
				border-radius: 15rpx;
				border: 1px solid red;
			} 
		}
	}
	@keyframes panel_motion {
		0% {
			bottom: 100%;
		}
		100% {
			bottom: 0%;
		}
	} 

</style>
