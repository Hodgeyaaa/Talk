<template>
	<view class="pageItem">
		<view class="left">
			<slot name="left">
			</slot>
		</view>
		<view class="text">
			<slot name="text"></slot>
		</view>
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
	.pageItem {
		width: 750rpx;
		height: 120rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		.left {
			
			border-radius: 14rpx;
			margin: 20rpx 20rpx 20rpx 0rpx;
		}
		.text {
			width: calc(100% - 100rpx);
			height: 100%;
			font-size: 35rpx;
			line-height: 120rpx;
			border-bottom: 1px solid black;
		}
	}
</style>
