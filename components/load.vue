<template>
		<view class="loading">
			<image class="loading_img"
			 src="../static/images/public/加载.png"
			 ></image>
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
	.loading {
		width: 100%;
		height: 80rpx;
		text-align: center;
		.loading_img {
			margin-top: 10rpx;
			width: 50rpx;
			height: 50rpx;
			animation: load_animation 1s linear infinite;
		}
	}
	
	@keyframes load_animation{
		from{
			transform: rotate(0deg);
		}
		to{
			transform: rotate(360deg);
		}
	}
</style>
