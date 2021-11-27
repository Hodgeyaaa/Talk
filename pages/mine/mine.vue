<template>
	<view class="mine">
		<view class="mine_item" @tap="toMineDetail">
			<view class="head_img">
				<image class="userImg" src="../../static/images/public/Head/hodgeHead.png"></image>
			</view>
			<view class="mine_detail">
				<view class="name">Hodge</view>
				<view class="msg">
					<view class="email">邮箱：2039818857@qq.com</view>
					<image class="qrcode" src="../../static/images/public/二维码.png"></image>
					<image class="r_arrow" src="../../static/images/public/右箭头.png"></image>
				</view>
			</view>
		</view>
		<view class="mine_func">
			<image class="func_img" src="../../static/images/mine/支付.png"></image>
			<func>
				<template v-slot:left>
						<text class="func_text">支付</text>
				</template>
				
			</func>
		</view>
		<view class="mine_func">
			<image class="func_img" src="../../static/images/mine/收藏.png"></image>
			<func>
				<template v-slot:left>
						<text class="func_text">收藏</text>
				</template>
				
			</func>
		</view>
		<view class="mine_func">
			<image class="func_img" src="../../static/images/mine/dynamic.png"></image>
			<func>
				<template v-slot:left>
						<text class="func_text">动态</text>
				</template>
				
			</func>
		</view>
		<view class="mine_func">
			<image class="func_img" src="../../static/images/mine/卡包.png"></image>
			<func>
				<template v-slot:left>
						<text class="func_text">卡包</text>
				</template>
				
			</func>
		</view>
		<view class="mine_func">
			<image class="func_img" src="../../static/images/mine/表情%20(1).png"></image>
			<func>
				<template v-slot:left>
						<text class="func_text">表情</text>
				</template>
				
			</func>
		</view>
		<view class="mine_func">
			<image class="func_img" src="../../static/images/mine/设置.png"></image>
			<func>
				<template v-slot:left>
						<text class="func_text">设置</text>
				</template>
				
			</func>
		</view>
		
		
	</view>
</template>

<script>
	import func from '../../components/func_item.vue';
	export default {
		data() {
			return {
				animationData: {},
				count: this.$store.state.count,
			}
		},
		onLoad() {
			console.log(this.$store.state.count);
		},
		methods: {
			toMineDetail() {
				uni.navigateTo({
					url: './mine_detail/mine_detail',
				})
			},
		},
		components: {
			func,
		}
	}
</script>

<style lang="scss" scoped>
	.mine {
		width: 750rpx;
		height: auto;
		.mine_item {
			width: 100%;
			height: auto;
			padding: 30rpx;
			margin: 60rpx auto;
			box-sizing: border-box;
			display: flex;
			.head_img {
				width: 130rpx;
				height: 130rpx;
				.userImg {
					width: 100%;
					height: 100%;
					border: 2px solid black;
					border-radius: 20rpx;
				}
			}
			.mine_detail {
				width: calc(100% - 185rpx);
				margin-left: 50rpx;
				.name {
					font-size: 40rpx;
					font-weight: bolder;
					margin-bottom: 35rpx;
				}
				.msg {
					width: 100%;
					display: flex;
					justify-content: space-between;
					.email {
						width: 400rpx;
						height: auto;
						font-size: 33rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.qrcode {
						width: 40rpx;
						height: 40rpx;
					}
					.r_arrow {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
		}
		.mine_func {
			width: 100%;
			display: flex;
			padding-left: 30rpx;
			box-sizing: border-box;
			justify-content: space-between;
			align-items: center;
			.func_img {
				width: 70rpx;
				height: 70rpx;
			}
			func {
				width: calc(100% - 80rpx);
				.func_text {
					height: 110rpx;
					line-height: 60rpx;
					font-size: 36rpx;
				}
			}
		}
		
	}
</style>
