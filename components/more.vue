<template>
	<view class="more_container">
		<swiper class="more_wrap" indicator-dots="true">
			<swiper-item v-for="(page, i) in moreList" :key="i" class="more_page" >
				<view 
				class="more_item" 
				v-for="(item, index) in page" 
				:key="index"
				@tap="addFun(i, index)"
				>
						<view class="img">
							<image :src="item.imgUrl"></image>
						</view>
						<view class="item_title">
							{{item.title}}
						</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				moreList: [
					[
						{
							imgUrl: '../static/images/acFrame/相册.png',
							title: '相册'
						},
						{
							imgUrl: '../static/images/acFrame/拍摄.png',
							title: '拍摄'
						},
						{
							imgUrl: '../static/images/acFrame/语音通话.png',
							title: '语音通话'
						},
						{
							imgUrl: '../static/images/acFrame/位置.png',
							title: '位置'
						},
						{
							imgUrl: '../static/images/acFrame/红包.png',
							title: '红包'
						},
						{
							imgUrl: '../static/images/acFrame/转账.png',
							title: '转账'
						},
						{
							imgUrl: '../static/images/acFrame/文件.png',
							title: '文件'
						},
						
					],
					[
						{
							imgUrl: '../static/images/acFrame/转账.png',
							title: '转账'
						},
						{
							imgUrl: '../static/images/acFrame/文件.png',
							title: '文件'
						},
					]
				]
			};
			
		},
		methods: {
			
				addFun(i, index) {
					if(i === 0) {
						switch(index) {
							case 0:
								this.choosePic();
								break;
							case 1:
								// console.log("拍摄");
								this.photograph();
								break;
							case 2:
								console.log("语音通话");
								break;
							case 3:
								// console.log("位置");
								this.choosePosition();
								break;
							case 4:
								console.log("红包");
								break;
							case 5:
								console.log("转账");
								break;
							case 6:
								console.log("文件");
								break;
							default:
								console.log("其他");
						}
					}
				},
				// 发送资源到父组件
				sendMore(msg, type) {
					let data = {
						message: msg,
						types: type
					}
					this.$emit('sendMore', data);
					console.log("发送到父组件");
				},
				// 选取照片
				choosePic() {
					uni.chooseImage({
					    count: 6, //默认9
					    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					    sourceType: ['album'], //从相册选择
					    success: (res) => {
					        console.log(JSON.stringify(res.tempFilePaths));
							const filePaths = res.tempFilePaths;
							for(let i in filePaths) {
								this.sendMore(filePaths[i], 1);
							}
					    }
					});
				},
				// 拍摄
				photograph() {
					uni.chooseImage({
					    count: 1, //默认9
					    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					    sourceType: ['camera'], //从相册选择
					    success: function (res) {
					        console.log(JSON.stringify(res.tempFilePaths));
							
					    }
					});
				},
				// 位置
				choosePosition() {
					uni.chooseLocation({
					    success: (res) => {
							let data = {
								message: {
									name: res.name,
									address: res.address,
									latitude: res.latitude,
									longitude: res.longitude
								},
								types: 3
							}
							this.$emit('sendPosition', data);
					        // console.log('位置名称：' + res.name);
					        // console.log('详细地址：' + res.address);
					        // console.log('纬度：' + res.latitude);
					        // console.log('经度：' + res.longitude);
					    }
					});
				},
				
		},
	}
</script>

<style lang="scss" scoped>
	.more_container {
		width: 100%;
		height: 450rpx;
		.more_wrap {
			width: 100%;
			height: 100%;
			.more_page {
				display: flex;
				flex-wrap: wrap;
				width: 100%;
				height: 100%;
				padding: 50rpx;
				box-sizing: border-box;
				.more_item {
					width: 160rpx;
					height: 160rpx;
					text-align: center;
					.img {
						width: 110rpx;
						height: 110rpx;
						margin: 0 auto;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 20rpx;
						background-color: #FFFFFF;
						image {
							width: 60rpx;
							height: 60rpx;
							
						}
					}
					.item_title {
						font-size: 25rpx;
						margin-top: 5rpx;
						
					}
				}
				 
			}
		}
	}
</style>
