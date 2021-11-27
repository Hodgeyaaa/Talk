<template>
	<view class="groupMessage">
		<view class="member">
			<view class="member_list">
				<view class="member_item" v-for="item in memberArr" :key="item.id">
					<image class="member_img" :src="item.imgurl"></image>
					<view class="member_name">{{item.name}}</view>
				</view>
				<view class="member_item">
					<image class="member_img" src="../../../static/images/public/Head/hodgeHead.png"></image>
					<view class="member_name">Hodge</view>
				</view>
				
			</view>
			
		</view>
		<func>
			<template v-slot:left>
				<view>群聊名称</view>
			</template>
			<template v-slot:right>
				<view>{{groupName}}</view>
			</template>
		</func>
		<func>
			<template v-slot:left>
				<view>群二维码</view>
			</template>
			<template v-slot:right>
				<image class="right_img" src="@/static/images/public/二维码.png"></image>
			</template>
		</func>
		<func>
			<template v-slot:left>
				<view>群公告</view>
			</template>
			
		</func>
		<func>
			<template v-slot:left>
				<view>我在群昵称</view>
			</template>
			<template v-slot:right>
				<view>Hodge</view>
			</template>
		</func>
		
	<view class="out">
		删除并退出
	</view>
	</view>
</template>

<script>
	import datas from '../../../commons/js/datas.js';
	import func from '../../../components/func_item.vue';
	export default {
		data() {
			return {
				memberArr: [],
				groupId: 1,
				groupName: '',
			}
		},
		onLoad() {
			this.getMember(1);
		},
		methods: {
			// 获取群信息及群成员信息
			getMember(e) {
				let groups = datas.groups();
				let all_user = datas.friends()
				let myGroup = groups.filter((item) => {
					return item.groupId === e;
				})
				this.groupName = myGroup[0].groupName;
				let group_member = myGroup[0].groupMember
				for(var i = 0; i < group_member.length; i++) {
					const memberId = group_member[i].userId;
					all_user.forEach((res) => {
						if(res.id === memberId) {
							this.memberArr.push(res);
						};
					})
				}
			}
		},
		components: {
			func,
		}
	}
</script>

<style lang="scss" scoped>
	.groupMessage {
		.member {
			width: 750rpx;
			height: auto;
			.member_list {
				width: 100%;
				height: auto;
				padding: 20rpx;
				border: 1px solid black;
				box-sizing: border-box;
				overflow: hidden;
				.member_item {
					width: 20%;
					height: auto;
					padding: 20rpx;
					float: left;
					box-sizing: border-box;
					text-align: center;
					// border: 1px solid red;
					
					.member_img {
						width: 100rpx;
						height: 100rpx;
						border: 1px solid black;
						border-radius: 15rpx;
					}
					.last_item {
						border: none;
					}
					.member_name {
						width: 100%;
						padding: 0 10rpx;
						box-sizing: border-box;
						font-size: 25rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}
			
		}
		.right_img {
			width: 50rpx;
			height: 50rpx;
		}
		.out {
			width: 60%;
			height: 80rpx;
			position: absolute;
			left: 20%;
			bottom: 30rpx;
			color: #FFFFFF;
			font-size: 33rpx;
			background-color: #2c2c2c;
			text-align: center;
			line-height: 80rpx;
			border-radius: 30rpx;
		}
	}
</style>
