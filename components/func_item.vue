<template>
	<view class="func_item">
		<view class="left">
			<slot name="left">
			</slot>
		</view>
		<view class="right">
			<slot name="right"></slot>
		</view>
		<image class="arrow_img" src="@/static/images/public/右箭头.png"></image>
		<view class="line"></view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.func_item {
		width: 100%;
		height: 110rpx;
		padding: 30rpx;
		box-sizing: border-box;
		position: relative;
		font-size: 33rpx;
		&:active {
			background-color: $uni-bg-color-grey;
		}
		.right {
			position: absolute;
			right: 70rpx;
			top: 30rpx;
			margin-right: 30rpx;
			
		}
		.arrow_img {
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			right: 30rpx;
			top: 35rpx;
			bottom: 20rpx;
		}
		.line {
			width: 750rpx;
			height: 0;
			position: absolute;
			left: 30rpx;
			bottom: 0;
			border-bottom: 1px solid black;
		}
	}
</style>
