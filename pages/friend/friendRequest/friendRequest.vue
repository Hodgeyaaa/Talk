<template>
	<view class="friendRequest_content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="back">
				<image src="../../../static/images/index/add_ikmg.png"></image>
			</view>
			<view class="top-bar-right">
				
			</view>
		</view>
		<view class="main">
			<view class="request_item" v-for="item in user_request" :key="item.id">
				<view class="info">
					<image class="head_img" :src="item.head_image"></image>
					<view class="sex">
						<image v-if="item.sex === '男'" :src="item.sex_img"></image>
						<image v-if="item.sex === '女'" :src="item.sex_img"></image>
					</view>
					<view class="name">{{item.name}}</view>
				</view>
				<view class="message">留言：{{item.message}}</view>
				<view class="isagree">
					<view class="reject">拒绝</view>
					<view class="agree">同意</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_request: [
					{
						id: 1,
						name: 'Mark',
						head_image: '../../../static/images/test_img/people.png',
						sex_img: '../../../static/images/test_img/boy.png',
						sex: '男',
						message: 'Mark请求添加为好友',
					},
					{
						id: 2,
						name: '小明',
						head_image: '../../../static/images/test_img/people.png',
						sex_img: '../../../static/images/test_img/boy.png',
						sex: '男',
						message: '小明请求添加为好友',
					},
					{
						id: 3,
						name: '小苏',
						head_image: '../../../static/images/test_img/people.png',
						sex_img: '../../../static/images/test_img/girl.png',
						sex: '女',
						message: '小苏请求添加为好友',
					},
				],
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1,
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../commons/css/mycss.scss';
	.top-bar {
		padding: 0rpx 40rpx;
		background: #fff;
	} 
	.main {
		margin-top: 80rpx;
		width: 750rpx;
		padding: 30rpx;
		box-sizing: border-box;
		.request_item {
			width: 100%;
			height: 460rpx;
			box-sizing: border-box;
			// border: 1px solid red;
			border-radius: 40rpx;
			box-shadow: 6rpx 12rpx 36rpx rgba(0, 0, 0, .1);
			padding: 30rpx;
			margin-bottom: 50rpx;
			.info {
				width: 100%;
				border: 1px solid black;
				display: flex;
				align-items: center;
				position: relative;
				.head_img {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50rpx;
					border: 1px solid black;
					margin-right: 50rpx;
				}
				.sex {
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					left: 60rpx;
					top: 60rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
			.message {
				width: 100%;
				height: 160rpx;
				margin: 20rpx auto;
				padding: 20rpx;
				box-sizing: border-box;
				background-color: $uni-bg-color-grey;
				font-size: 28rpx;
			}
			.isagree {
				width: 100%;
				display: flex;
				justify-content: space-between;
				text-align: center;
				.reject, .agree {
					width: 120rpx;
					height: 60rpx;
					line-height: 60rpx;
					font-size: 30rpx;
					border-radius: 30rpx;
					border: 1px solid black;
				}
				.reject {
					background-color: #ffcccc;
					
				}
				
			}
			
		}
	}
</style>
