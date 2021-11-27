<template>
	<view>
		<view class="top-bar">
			<view class="left" @tap="back">
				<slot name="left">
					<image class="back_img" src="@/static/images/public/左.png"></image>
				</slot>
			</view>
			
			<view class="center">
				<slot name="center"></slot>
			</view>
			<view class="right">
				<slot name="right">
					
				</slot>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			back() {
				console.log("back");
				uni.navigateBack({
					delta: 1,
				})
				// uni.switchTab({
				// 	url: '/pages/index/index',
				// })
				
			}
		}
	}
</script>

<style lang="scss" scoped>
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
		.left {
			flex: 1;
			box-sizing: border-box;
			.back_img {
				width: 60rpx;
				height: 60rpx;
				margin-top: 10rpx;
			}
		}
			
		.center {
			flex: 3;
			text-align: center;
			// border: 1px solid red;
		}
		.right {
			flex: 1;
			width: 16%;
			display: flex;
			justify-content: flex-end;
			// border: 1px solid red;
			font-size: 30rpx;
			
		}
	}
</style>
