<template>
	<view class="groupHead">
		<view class="headList" v-for="item in memberHead" :key="item.id">
			<image class="headImg" :src="item.imgurl"></image>
		</view>
		<!-- <image class="headImg" src="../static/images/test_img/tou.jpg"></image>
		<image class="headImg" src="../static/images/test_img/tou.jpg"></image>
		<image class="headImg" src="../static/images/test_img/tou.jpg"></image> -->
	</view>
</template>

<script>
	import datas from '../commons/js/datas.js';
	export default {
		data() {
			return {
				memberHead: [],
			};
		},
		props: {
			groupId: {
				type: Number,
				default: 'none',
			}
		},
		created() {
			console.log("groupHead_onLoad");
			this.getHead(this.groupId);
		},
		methods: {
			getHead(id) {
				let allGroup = datas.groups();
				let allUser = datas.friends();
				let groupMsg = null;
				allGroup.forEach((item) => {
					if(item.groupId == id) {
						groupMsg = item;
						return;
					}
				})
				let num = 0
				groupMsg.groupMember.forEach((item) => {
					allUser.forEach((res) => {
						if(num >= 9) {
							return;
						}
						if(res.id == item.userId) {
							this.memberHead.push(res);
							num++;
						}
					})
				})
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.groupHead {
		width: 99rpx;
		height: 99rpx;
		padding-left: 5rpx;
		padding-bottom: 5rpx;
		box-sizing: border-box;
		background-color: #ecf0f1;
		border-radius: 8rpx;
		overflow: hidden;
		
			.headImg {
				width: 28rpx;
				height: 28rpx;
				float: left;
				padding-top: 5rpx;
				padding-right: 5rpx;
			}
		
	}
</style>
