<template>
	<view class="chat_content">
		<topBar>
			<template v-slot:center>
				<text v-if="chatCategory == 'group'">{{getGroupName(groupId)}}</text>
				<text v-if="chatCategory == 'friend'">{{getUserName(userId)}}</text>
			</template>
			<template v-slot:right>
				<image 
				class="more_img" 
				src="@/static/images/public/更多.png"
				@tap="toChatMessage(userId, groupId)"
				></image>
			</template>
		</topBar>
		<scroll-view class="chat_wrap" 
		scroll-y="true" 
		scroll-with-animation="true"
		:scroll-into-view="scrollToView"
		@tap="tapScroll"
		@scrolltoupper="nextPage"
		>
			
			<view class="chat_main" :style="{paddingBottom: inputHeight+'px'}">
				<load v-show="isLoading"></load>
				<view class="chat_record" 
				v-for="(item, index) in messages"
				:key="index"
				:id="'scrollTo' + item.tip"
				>
					<view class="time_line" v-if="item.time != ''">{{item.time | formatDate}}</view>
					<view class="msg_m msg_left" v-if="item.id === 'a'">
						<image :src="item.imgUrl" class="user_img" @tap="toMsgPage(item.userId)"></image>
						<view class="message" v-if="item.types === 0">
							<view class="user_name">{{getUserName(item.userId)}}</view>
							<view class="msg_text">
								{{item.message}}
							</view>
						</view>
						<view class="message" v-if="item.types === 1">
							<view class="user_name">{{getUserName(item.userId)}}</view>
							<view class="msg_text" @tap="preView(item.message)">
								<image :src="item.message" mode="aspectFill"></image>
							</view>
						</view>
						<view class="message" v-if="item.types === 2">
							<view class="user_name">{{getUserName(item.userId)}}</view>
							<view class="msg_voice" :style="{width: item.message.time*6 + 'rpx'}">
								<image class="voice_img" src="../../static/images/acFrame/声波_a.png"></image>
								{{item.message.time}}″
							</view>
						</view>
						<view class="message" v-if="item.types === 3">
							<view class="user_name">{{getUserName(item.userId)}}</view>
							<view class="msg_position" 
							@tap="openLocation(item.message)"
							>
								<view class="position_info">
									<view class="title_name">{{item.message.name}}</view>
									<view class="detail_address">
										{{item.message.address}}
									</view>
								</view>
								<map
								:latitude="item.message.latitude" 
								:longitude="item.message.longitude"
								:markers="covers(item.message)"
								></map>
							</view>
						</view>
					</view>
					
					<view class="msg_m msg_right" v-if="item.id === 'b'">
						<image :src="item.imgUrl" class="user_img" @tap="toMsgPage(item.userId)"></image>
						<!-- 文字 -->
						<view class="message" v-if="item.types === 0">
							<view class="msg_text">{{item.message}}</view>
						</view>
						<!-- 图片 -->
						<view class="message" v-if="item.types === 1">
							<view class="msg_text" @tap="preView(item.message)">
								<image :src="item.message" mode="aspectFill" @tap="preView(item.message)"></image>
							</view>
						</view>
						<!-- 语音 -->
						<view class="message" v-if="item.types === 2">
							<view class="msg_voice" 
							:style="{width: item.message.time*6 + 'rpx'}"
							@tap="playVoice(item.message.voice)"
							>
								{{item.message.time}}″
								<image class="voice_img" src="../../static/images/acFrame/声波_b.png"></image>
							</view>
						</view>
						<!-- 位置 -->
						<view class="message" v-if="item.types === 3">
							<view class="msg_position" 
							@tap="openLocation(item.message)"
							>
								<view class="position_info">
									<view class="title_name">{{item.message.name}}</view>
									<view class="detail_address">
										{{item.message.address}}
									</view>
								</view>
								<map
								:latitude="item.message.latitude" 
								:longitude="item.message.longitude"
								:markers="covers(item.message)"
								></map>
							</view>
						</view>
					</view>
				</view>
				
				<!-- <view class="chat_record" 
				v-for="item in messages"
				:key="item.tip"
				v-if="item.id === 'b'"
				>
					<view class="time_line">{{item.time | formatDate}}</view>
					<view class="msg_m msg_right">
						<image :src="item.imgUrl" class="user_img"></image>
						<view class="message">
							<view class="msg_text">{{item.message}}</view>
						</view>
					</view>
				</view> -->
			</view>
			<view :animation="animationData_chat" class="bot_interval"></view>
		</scroll-view>
		<acFrame 
		:ishide="isHidePanel" 
		@sendMsgs="sendMsgs"
		@getInputHeight="getInputHeight"
		
		></acFrame>
	</view>
</template>

<script>
	import datas from '../../commons/js/datas.js'
	import formatDate from '../../utils/fall.js'
	import topBar from '../../components/top-bar.vue';
	import acFrame from '../../components/ac_frame.vue';
	import load from '../../components/load.vue'
	// 播放音频对象
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				myId: 1,
				msgs: [],//所有聊天数据
				messages: [],//需要展示的聊天数据
				imgArr: [],
				oldTime: new Date(),
				isHidePanel: false,
				scrollToView: '',
				inputHeight: this.$store.state.scrollPadding,
				animationData_chat: {},
				latitude: 39.909,
                longitude: 116.39742,
                iconPath: '../../../static/location.png',
				pageNum: 1,
				animationData_load: {},
				loadTimer: null,
				isLoading: false,
				chatCategory: 'friend',
				groupId: '',
				userId: '',
				
			}
		},
		onLoad(option) {
			this.chatCategory = option.category;
			this.groupId = option.id;
			this.userId = option.id;
			this.getInitMessage(option.category, option.id)
			this.toBottom()
			// this.nextPage()
		},
		watch: {
			isHidePanel(newVal, oldVal) {
				console.log('isHidePanel发生改变：' + newVal);
			},
		},
		computed: {
			getUserName() {
				return function(id) {
					let allUser = datas.friends();
					let name = '';
					allUser.forEach((item) => {
						if(item.id == id) {
							name = item.name;
						}
					})
					return name;
				}
			},
			// 群名
			getGroupName(id) {
				return function(id) {
					let allGroup = datas.groups();
					let name = '';
					allGroup.forEach((item) => {
						if(item.groupId == id) {
							name = item.groupName;
						}
					})
					return name;
				}
			}
		},
		filters: {
			formatDate(data) {
				return formatDate.formatDate_chat(data)
			}
		},
		mounted() {
			
			this.$bus.$on('changeBot', (e) => {
				if(e) {
					this.$store.commit('risePadding')
					this.inputHeight = this.$store.state.scrollPadding;
					this.toBottom()
				}else {
					this.$store.commit('reducePadding')
					this.inputHeight = this.$store.state.scrollPadding;
				}
			})
		},
		methods: {
			// 根据id获取用户名
			getName(id) {
				let allUser = datas.friends();
				let name = '';
				allUser.forEach((item) => {
					if(item.id == id) {
						name = item.name;
					}
				})
				return name;
			},
			
			// 点击头像图跳转到用户信息页，携带id
			toMsgPage(id, e) {
				console.log(e);
				if(this.chatCategory === 'friend') {
					uni.navigateTo({
						url: '../friend/friendMessage/friendMessage?id=' + id,
						
					})
					
				}
			},
			// 点击scroll组件
			tapScroll() {
				this.$bus.$emit('hidePanel')
				// this.isHidePanel = true;
				// uni.$emit('hidePanel', '1')
				// console.log("send")
				//inputHeight变为0
				this.$store.commit('reducePadding')
				this.inputHeight = this.$store.state.scrollPadding;
				
			},
			// 发送的内容
			sendMsgs(e) {
				
				let data = {
					id: 'b',
					imgUrl: '../../static/images/public/Head/hodgeHead.png',
					message: e.message,
					types: e.types,
					time: new Date(),
					tip: this.messages.length + 1
				}
				// 判断时间是否超过两分钟
				let t = formatDate.time_interval(this.oldTime, data.time);
				if(t) {
					this.oldTime = t
				}
				data.time = t
				
				this.messages.push(data)
				
				// 组件内图片数组更新
				if(data.types === 1) {
					this.imgArr.push(data.message)
				}
				// 
				this.toBottom()
				// console.log("发送的内容：" + data);
				// 后期添加到数据库
			},
			
			// 获取刚进入聊天界面时的聊天信息
			getInitMessage(category, id) {
				// 根据传参来加载用户消息还是群消息
				if(category === 'friend') {
					datas.message().forEach((item) => {
						if(item.userId == this.myId) {
							item.chatMessage.forEach((res) => {
								if(res.friendId == id) {
									this.msgs.push(...res.news);
									// console.log(this.msgs);
									return;
								}
							})
						}
					})
				}else {
					datas.groupMessage().forEach((item) => {
						if(item.groupId == id) {
							this.msgs = item.news;
							return;
						}
					})
				}
				this.getMessages();
			},
			// 获取聊天数据
			getMessages() {
				
				// let msgs = datas.message();
				
				let msgsLen = this.msgs.length;
				 // msgsLen = msgsLen > msgs.length ? msgs.length : this.pageNum * 5;
				 if(msgsLen > this.pageNum * 5){
					msgsLen = this.pageNum * 5;
				 }
				 else{
					clearTimeout(this.loadTimer);
				 };
				 
				// msgs.forEach((item) => {
				// 	this.messages.unshift(item)
				// 	if(item.types === 1) {
				// 		this.imgArr.unshift(item.message)
				// 	}
				// 	// console.log("you:" + item.time + "oldTime:" + this.oldTime)
				// 	// 判断时间是否超过两分钟
				// 	let t = formatDate.time_interval(this.oldTime, item.time);
				// 	if(t) {
				// 		this.oldTime = t
				// 	}
				// 	item.time = t
					
				// })
				
				for(var i=(this.pageNum - 1)*5; i<msgsLen; i++) {
					this.messages.unshift(this.msgs[i])
					if(this.msgs[i].types === 1) {
						this.imgArr.unshift(this.msgs[i].message)
					}
					let t = formatDate.time_interval(this.oldTime, this.msgs[i].time);
					if(t) {
						this.oldTime = t
					}
					this.msgs[i].time = t
				}
				// 判断数据是否全部加载
				if(msgsLen === this.msgs.length) {
					this.pageNum = -1;
				}
				else
				this.pageNum++;
				// 滚动到底部
				// this.$nextTick(() => {
				// 	this.scrollToView = 'scrollTo' + this.messages[this.messages.length - 1].tip;
				// 	// console.log(this.scrollToView)
				// })
				// 清除load动画定时器
				// clearInterval(this.loadTimer);
				//隐藏load图标
				this.isLoading = false;
			},
			// 点击预览图片
			preView(res) {
				let index = 0;
				for(var i = 0; i < this.imgArr.length; i++) {
					if(this.imgArr[i] === res) {
						index = i
					}
				}
				uni.previewImage({
							current: index,
				            urls: this.imgArr,
				            longPressActions: {
				                itemList: ['发送给朋友', '保存图片', '收藏'],
				                success: function(data) {
				                    console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				                },
				                fail: function(err) {
				                    console.log(err.errMsg);
				                }
				            }
				        });
			},
			
			// 点击播放音频
			playVoice(e) {
				innerAudioContext.src = e;
				innerAudioContext.play();
				// innerAudioContext.onPlay(() => {
				//   console.log('开始播放');
				// });
				// innerAudioContext.onStop(() => {
				// 	console.log('播放音频停止');
				// });
				innerAudioContext.onEnded(() => {
					console.log('音频自然播放结束');
				})
			},
			// map组件参数
			covers(m) {
				let map = [
					{
						latitude: m.latitude,
						longitude: m.longitude,
						iconPath: '../../static/images/test_img/people.png',
						width: 20,
						height: 20
					}
				]
				return map;
			},
			// 点开位置查看
			openLocation(e) {
				uni.openLocation({
						name: e.name,
						address: e.address,
						latitude: e.latitude,
						longitude: e.longitude,
						success: function () {
							console.log('success');
						}
					});
			},
			// 滚动到底部
			toBottom() {
				this.scrollToView = '';
				this.$nextTick(() => {
					this.scrollToView = 'scrollTo' + this.messages[this.messages.length - 1].tip;
					
				})
			},
			// 下一页函数
			nextPage() {
				if (this.pageNum > 0) {
					// 显示load图标
					this.isLoading = true;
					this.loadTimer = setTimeout(() => {
						this.getMessages();
						console.log(this.messages);
					}, 1200)
				}
			},
			// 根据chatCategory决定跳转到群信息页还是用户信息页
			toChatMessage() {
				if(this.chatCategory == 'friend') {
					uni.navigateTo({
						url: 'chatFriendMessage/chatFriendMessage?id=' + this.groupId,
					})
				}else {
					uni.navigateTo({
						url: 'chatGroupMessage/chatGroupMessage?id=' + this.userId,
					})
				}
			},
		},
		components: {
			topBar,
			acFrame,
			load,
		}
	}
</script>

<style lang="scss" scoped>
	// @import '../../commons/css/mycss.scss';
	.chat_content {
		.more_img {
			width: 60rpx;
			height: 60rpx;
		}
		
		.chat_wrap {
			width: 100%;
			height: 100vh;
			
			.chat_main {
				width: 750rpx;
				box-sizing: border-box;
				padding: 100rpx 30rpx 12rpx 30rpx;
				display: flex;
				flex-direction: column;
				.chat_record {
					margin-top: 30rpx;
					.time_line {
						font-size: 35rpx;
						line-height: 40rpx;
						padding: 20rpx 0;
						text-align: center;
						// border: 1px solid red;
						color: rgba(39, 40, 50, .4);
					}
					.msg_m {
						position: relative;
						padding: 20rpx 0;
						display: flex;
						.user_img {
							width: 80rpx;
							height: 80rpx;
							border: 1px solid black;
							border-radius: 20rpx;
							// flex: auto;
						}
						.message {
							max-width: 490rpx;
							margin: 0 16rpx;
							box-sizing: border-box;
							.msg_text {
								padding: 16rpx 24rpx;
								line-height: 44rpx;
								font-size: 32rpx;
								border: 1px solid black;
								image {
									width: 200rpx;
									height: 200rpx;
								}
							}
							.msg_voice {
								max-width: 360rpx;
								min-width: 110rpx;
								padding: 16rpx 20rpx;
								font-size: 38rpx;
								letter-spacing: 3px;
								display: flex;
								align-items: center;
								justify-content: space-between;
								border: 1px solid black;
								image {
									width: 80rpx;
									height: 50rpx;
									
								}
							}
							.msg_position {
								width: 480rpx;
								padding: 16rpx 20rpx;
								box-sizing: border-box;
								border: 1px solid black;
								box-sizing: border-box;
								background-color: #FFFFFF;
								
								.position_info {
									.title_name {
										font-size: 30rpx;
									}
									.detail_address {
										font-size: 24rpx;
										color: #636e72;
										overflow: hidden;
										white-space: nowrap;
										text-overflow: ellipsis;
									}
									margin-bottom: 10rpx;
								}
								map {
									width: 440rpx;
									height: 250rpx;
								}
								
							}
							.user_name {
								font-size: 32rpx;
								padding: 5rpx 0;
							}
						}
					}
					.msg_left {
						.msg_text {
							background-color: #FFFFFF;
							border-radius: 0 20rpx 20rpx 20rpx;
						}
						.msg_voice {
							background-color: #FFFFFF;
							border-radius: 0 20rpx 20rpx 20rpx;
						}
						.msg_position {
							background-color: #FFFFFF;
							border-radius: 0 20rpx 20rpx 20rpx;
						}
					}
					.msg_right {
						flex-direction: row-reverse;
						// align-items: center;
						.msg_text {
							background-color: #2d3436;
							border-radius: 20rpx 0rpx 20rpx 20rpx;
							color: #FFFFFF;
							word-wrap:break-word;
							word-break:normal;
						}
						.msg_voice {
							background-color: #2d3436;
							border-radius: 20rpx 0rpx 20rpx 20rpx;
							color: #FFFFFF;
							word-wrap:break-word;
							word-break:normal;
						}
						.msg_position {
							border-radius: 20rpx 0rpx 20rpx 20rpx;
						}
						
					}
				}
			}
			.bot_interval {
				height: 150rpx;
				width: 100%;
			}
		}
		
	}
	
</style>
