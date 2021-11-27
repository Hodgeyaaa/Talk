<template>
	<view class="mine_detail_content">
		<view class="top-bar">
			<view class="top-bar-left" @tap="back">
				<image src="../../../static/images/public/取消.png"></image>
			</view>
			<view class="top-bar-right" @tap="toSingIn">
				切换账号
			</view>
			
		</view>
		<view class="main">
			<view class="head_item" @tap="choose_img">
				<view class="item_left">
					<text>头像</text>
				</view>
				<view class="item_right">
					<image :src="head_portrait" @tap.stop="tap_img"></image>
					<text>></text>
				</view>
			</view>
			<view class="message_item" @tap="modify('昵称', user.nick)">
				<view class="item_left">
					<text>昵称</text>
				</view>
				<view class="item_right">
					<text class="message">{{user.nick}}</text>
					<text>></text>
				</view>
			</view>
			<view class="message_item" @tap="modify('签名', user.autograph)">
				<view class="item_left">
					<text>签名</text>
				</view>
				<view class="item_right">
					<text class="message">{{user.autograph}}</text>
					<text>></text>
				</view>
			</view>
			<view class="message_item">
				<view class="item_left">
					<text>性别</text>
				</view>
				<view class="item_right">
					 <picker @change="bindPickerChange" :value="index" :range="user.array">
					    <view class="uni-input">{{user.array[index]}}</view>
					 </picker>
					<text>></text>
				</view>
			</view>
			<view class="message_item">
				<view class="item_left">
					<text>生日</text>
				</view>
				<view class="item_right">
					  <picker mode="date" :value="user.date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{user.date}}</view>
					  </picker>
					<text>></text>
				</view>
			</view>
		</view>
		<view class="modify" :animation="animationData">
			<view class="modify_head">
				<view class="cancel" @tap="cancel_animation">取消</view>
				<view class="title">{{modify_title}}</view>
				<view class="determine" @tap="determine_modify(default_content)">确定</view>
			</view>
			<view class="modify_content">
				<textarea v-model="default_content"></textarea>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
			            format: true
			      })
			return {
				animationData: {},
				// animationData_cancel: {},
				head_portrait: ['../../../static/images/public/Head/hodgeHead.png'],
				modify_title: '',
				index: 0,
				default_content: '',
				user: {
					nick: 'out of life',
					autograph: '你说你是从哪科罗娜按此',
					date: currentDate,
					array: ['男', '女', '未知'],
				}
			}
		},
		computed: {
		        startDate() {
		            return this.getDate('start');
		        },
		        endDate() {
		            return this.getDate('end');
		        }
		},
		methods: {
			tap_img() {
				// let urls = this.head_portrait
				uni.previewImage({
					// current: 0,
					urls: this.head_portrait,
				})
			},
			choose_img() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						this.head_portrait = res.tempFilePaths
						// console.log(this.head_portrait)
						// 上传后端
						// uni.uploadFile({
						// 	url: '后端接口地址',
						// 	filePath: this.head_portrait,
						// 	name: 'file',
						// 	fileType: 'image',
						// 	success: (uploadFileRes) => {
						// 		var backstr = uploadFileRes.data
						// 	},
						// 	fail(e) {
						// 		console.log("this is errormes" + e.message)
						// 	}
						// })
					}
				})
			},
			 bindPickerChange: function(e) {
			    console.log('picker发送选择改变，携带值为', e.target.value)
			    this.index = e.target.value
			},
			bindDateChange: function(e) {
			            this.user.date = e.target.value
			},
			getDate(type) {
			    const date = new Date();
			    let year = date.getFullYear();
			    let month = date.getMonth() + 1;
			    let day = date.getDate();
			
			    if (type === 'start') {
			        year = year - 60;
			    } else if (type === 'end') {
			        year = year + 2;
			    }
			    month = month > 9 ? month : '0' + month;
			    day = day > 9 ? day : '0' + day;
			    return `${year}-${month}-${day}`;
			},
			modify(type, data) {
				this.default_content = data
				this.modify_title = type
				var animation = uni.createAnimation({
					duration: 200,
					timingFunction: 'ease-out'
				})
				animation.top(0).step()
				this.animationData = animation.export()
			},
			determine_modify(data) {
				if(this.modify_title === '昵称') {
					this.user.nick = data
				}
				else if (this.modify_title === '签名') {
					this.user.autograph = data
				}
				this.cancel_animation()
			},
			cancel_animation() {
				var animation = uni.createAnimation({
					duration: 200,
					timingFunction: 'ease-out'
				})
				animation.top('100%').step()
				this.animationData = animation.export()
			},
			// 返回是上一页面
			back() {
				uni.navigateBack({
					delta: 1,
				})
			},
			toSingIn() {
				uni.navigateTo({
					url: '../../singin/singin',
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../commons/css/mycss.scss';
	.mine_detail_content {
		.main {
			margin-top: 80rpx;
			.head_item {
				width: 750rpx;
				height: 160rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 30rpx;
				box-sizing: border-box;
				border-bottom: 1px solid #dfe6e9;
				// border: 1px solid red;
				.item_left {
					
				}
				.item_right {
					display: flex;
					align-items: center;
					image {
						width: 120rpx;
						height: 120rpx;
						border-radius: 15rpx;
						border: 1px solid black;
					}
					text {
						font-size: 54rpx;
						color: #aaa69d;
						padding-left: 30rpx;
					}
				}
			}
			.message_item {
				width: 750rpx;
				height: 120rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 30rpx;
				box-sizing: border-box;
				border-bottom: 1px solid #dfe6e9;
				// border: 1px solid red;
				.item_right {
					display: flex;
					align-items: center;
					.message {
						font-size: 30rpx;
						color: black;
					}
					text {
						font-size: 54rpx;
						color: #aaa69d;
						padding-left: 30rpx;
					}
				}
			}
		}
		.modify {
			width: 750rpx;
			position: fixed;
			top: 100%;
			left: 0;
			background-color: #fff;
			z-index: 100;
			height: 100%;
			// border-radius: 50rpx 50rpx 0 0;
			box-sizing: border-box;
			// padding: 30rpx;
			// border: 1px solid red;
			.modify_head {
				display: flex;
				justify-content: space-between;
				text-align: center;
				align-items: center;
				height: 100rpx;
				padding: 0 30rpx;
				border-bottom: 1px solid #dfe6e9;
				.cancel {
					flex: 1;
					// border: 1px solid red;
					font-size: 33rpx;
				}
				.title {
					flex: 4;
					// border: 1px solid red;
				}
				.determine {
					flex: 1;
					// border: 1px solid red;
					font-size: 33rpx;
					color: #74b9ff;
				}
			}
			.modify_content {
				// border: 1px solid red;
				margin: 30rpx;
				padding: 20rpx;
				font-size: 30rpx;
				background-color: $uni-bg-color-grey;
			}
		}
	}
</style>
