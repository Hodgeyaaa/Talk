<template>
	<view>
		<view class="container" :animation="animationDate">
			<view class="submit">
				<view class="voice" @tap="switchRecord">
					<image class="voice_img" :src="recordIcon"></image>
				</view>
					<view :class="{hide:!isrecord}" 
					class="imput_box record"
					@touchstart="touchstart($event)"
					@touchend="touchend"
					@touchmove="cancelVoice($event)"
					>按住 说话</view>
					<textarea
					:class="{hide:isrecord}" 
					class="imput_box" 
					@input="inputs"
					:focus="isfocus"
					@focus="focus_now"
					v-model="msgs"
					:animation="animationDate_input"
					auto-height="true"></textarea>
				
					
					<image class="expression" src="../static/images/acFrame/表情.png" @tap="showEmoji"></image>
					<image class="add_btn" v-show="!showSendBtn" @tap="showMore" src="../static/images/acFrame/添加.png"></image>
					<view class="send_btn" v-show="showSendBtn" @tap="send">发送</view>
				
			</view>
			<view class="emoji" v-if="is_show_emoji">
				<view class="emoji_send">
					<view class="emoji_del" @tap="delEmoji">
						删除
					</view>
					
				</view>
				<emoji @emotion="emotion"></emoji>
			</view>
			<view class="more" v-if="!is_show_emoji">
				<more @sendMore="sendPic" @sendPosition = "sendPosition"></more>
			</view>
		</view>
		<view class="voice_animation" v-if="isvoiceNow">
			<voiceLoad></voiceLoad>
			<view class="cancel_voice">
				<image src="../static/images/acFrame/取消语音.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import emoji from './emoji.vue';
	import more from './more.vue';
	import voiceLoad from './voiceLoad.vue';
	// 录音对象
	const recorderManager = uni.getRecorderManager();
	export default {
		data() {
			return {
				isrecord: false,
				is_show_emoji: true,
				recordIcon: '../static/images/acFrame/voice.png',
				showSendBtn: false,
				animationDate_input: {},
				animationDate: '',
				ac_ishide: '',
				msgs: '',
				isfocus: false,
				voice_timer: '',
				voice_length: 1,
				isvoiceNow: false,
				is_send_voice: true,
			};
		},
		props: {
			ishide: {
				type: Boolean,
				default: '没有'
			}
		},
		watch: {
			// 监视msgs是否有内容决定发送按钮是否出现
			msgs(newVal, oldVal) {
				// this.ishide = false
				console.log('msgs变为:' + newVal)
				if(this.msgs.length > 0) {
					var animation = uni.createAnimation({
						duration: 200,
						timingFunction: 'ease'
					})
					animation.width('55%').step()
					this.animationDate_input = animation.export()
					this.showSendBtn = true;
				}
				if(this.msgs.length === 0) {
					var animation = uni.createAnimation({
						duration: 200,
						timingFunction: 'ease'
					})
					animation.width('65%').step()
					this.animationDate_input = animation.export()
					this.showSendBtn = false;
				}
			},
			
			
		},
		mounted() {
			this.$bus.$on('hidePanel', () => {
				var animation = uni.createAnimation({
					duration: 200,
					timingFunction: 'ease'
				})
				
				animation.height('100rpx').step()
				this.animationDate = animation.export()
				
			})
		},
		components: {
			emoji,
			more,
			voiceLoad,
		},
		methods: {
			// 获取输入框高度
			// getInputHeight() {
			// 	this.$nextTick(() => {
			// 		const query = uni.createSelectorQuery().in(this);
			// 		query.select('.container').boundingClientRect(data => {
			// 			this.$emit('getInputHeight', data.height);
			// 		}).exec()
			// 	})
			// },
			focus_now() {
				console.log("Focus Now")
			},
			switchRecord() {
				this.isrecord = !this.isrecord
				// 切换为语音输入，隐藏面板
				if(this.isrecord) {
					this.recordIcon = '../static/images/acFrame/键盘.png'
					var animation = uni.createAnimation({
						duration: 200,
						timingFunction: 'ease'
					})
					animation.height('100rpx').step()
					this.animationDate = animation.export()
					// 改变scroll组件的paddingBottom
					this.$bus.$emit('changeBot', false);
				}
				// 切换为键盘输入
				else {
					this.recordIcon = '../static/images/acFrame/voice.png'
				}
				
			},
			changeHeight() {
				var animation = uni.createAnimation({
					duration: 200,
					timingFunction: 'ease'
				})
				
				// this.isfocus = true;
				animation.height('600rpx').step()
				this.animationDate = animation.export()
				// 让scroll的paddingBottom变为250rpx
				this.$bus.$emit('changeBot', true);
				//表情按钮图标与键盘图标
				
				
			},
			showEmoji() {
				this.is_show_emoji = true;
				// 让输入框变为键盘输入
				this.isrecord = false;
				this.recordIcon = '../static/images/acFrame/voice.png'
				this.changeHeight();
				
			},
			showMore() {
				this.is_show_emoji = false;
				// 让输入框变为键盘输入
				this.isrecord = false;
				this.recordIcon = '../static/images/acFrame/voice.png'
				this.changeHeight();
			},
			// hidePanel() {
			// 	console.log('hidePanel')
			// 	var animation = uni.createAnimation({
			// 		duration: 200,
			// 		timingFunction: 'ease'
			// 	})
				
			// 	animation.height('150rpx').step()
			// 	this.animationDate = animation.export()
			// },
			// 输入内容时
			inputs(e) {
				var chat_msg = e.detail.value;
				var pos = chat_msg.indexOf('\n');
				if(pos != -1 && chat_msg.length > 1) {
					const data = {
						message: this.msgs,
						types: 0
					}
					this.$emit('sendMsgs', data);
					this.msgs = '';
				}
				
			},
			send() {
				const data = {
					message: this.msgs,
					types: 0
				}
				if(this.msgs.length > 0) {
					this.$emit('sendMsgs', data);
					this.msgs = '';
				}
			},
			// 发送图片
			sendPic(data) {
				this.$emit('sendMsgs', data);
			},
			// 接收表情
			emotion(e) {
				this.msgs = this.msgs + e;
				this.isfocus = true;
			},
			delEmoji() {
				this.msgs = this.msgs.substr(0, this.msgs.length - 2)
				// console.log(this.msgs.length)
			},
			// 按住说话
			touchstart(e) {
				console.log("按住：" + e.changedTouches[0].pageY)
				this.isvoiceNow = true;
				this.is_send_voice = true;
				this.voice_pageY = e.changedTouches[0].pageY;
				 recorderManager.start();
				 let t = 1;
				 this.voice_timer = setInterval(() => {
					 t++;
					 this.voice_length = t;
					 console.log(t)
					 if(t >= 60) {
						 clearInterval(this.voice_timer);
						 this.touchend();
					 }
					 
				 }, 1000)
			},
			// 松开发送语音
			touchend() {
				console.log("发送语音")
				this.isvoiceNow = false;
				recorderManager.stop();
				clearInterval(this.voice_timer);
				recorderManager.onStop((res) => {
					let data = {
						message: {
							voice: res.tempFilePath,
							time: this.voice_length,
						},
						types: 2,
					}
					if(this.is_send_voice) {
						this.$emit('sendMsgs', data);
					}
					this.voice_length = 1;
				    // console.log('recorder stop' + JSON.stringify(res));
				    // self.voicePath = res.tempFilePath;
				});
			},
			// 移动取消语音
			cancelVoice(e) {
				if(this.voice_pageY - e.changedTouches[0].pageY > 72) {
					this.isvoiceNow = false;
					this.is_send_voice = false;
				}
			},
			// 发送位置信息
			sendPosition(data) {
				this.$emit('sendMsgs', data);
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	.container {
		width: 750rpx;
		height: 100rpx;
		background-color: rgba(244, 244, 244, 0.96);
		// background-color: rgba(222, 222, 222, 0.88);
		position: fixed;
		bottom: 0;
		z-index: 100;
		// padding-bottom: 50rpx;
		.submit {
			width: 100%;
			box-sizing: border-box;
			border-top: 1px solid rgba(0, 0, 0, .2);
			padding: 18rpx 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.voice {
				width: 60rpx;
				height: 60rpx;
				// border: 1px solid red;
				.voice_img {
					width: 60rpx;
					height: 60rpx;
				}
			}
			.imput_box {
				background-color: #FFFFFF;
				width: 65%;
				padding: 10rpx;
				padding-left: 20rpx;
				font-size: 33rpx;
				border-radius: 10rpx;
			}
			.hide {
				display: none;
			}
			.record {
				text-align: center;
			}
			.expression {
				width: 60rpx;
				height: 60rpx;
			}
			.add_btn {
				width: 60rpx;
				height: 60rpx;
			}
			.send_btn {
				width: 120rpx;
				height: 60rpx;
				border-radius: 10rpx;
				background-color: black;
				color: #FFFFFF;
				font-size: 30rpx;
				text-align: center;
				line-height: 60rpx;
			}
			
		}
		.emoji {
			position: relative;
			// border: 1px solid red;
			.emoji_send {
				width: 200rpx;
				height: 120rpx;
				position: absolute;
				bottom: 0;
				right: 0;
				background-image: radial-gradient(rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
				.emoji_del {
					width: 120rpx;
					height: 60rpx;
					border: 1px solid black;
					margin: auto;
					margin-top: 30rpx;
					text-align: center;
					line-height: 60rpx;
					font-size: 30rpx;
					background-color: #FFFFFF;
				}
			}
			
		}
		.more {
			// position: relative;
		}
		
	}
	.voice_animation {
		width: 100%;
		height: 100%;
		background-color: rgba(4, 4, 4, 0.46);
		position: fixed;
		top: 0;
		left: 0;
		
		.cancel_voice {
			width: 100rpx;
			height: 100rpx;
			border: 2px solid black;
			border-radius: 20rpx;
			position: absolute;
			left: 50%;
			bottom: 200rpx;
			transform: translateX(-50%);
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	
</style>
