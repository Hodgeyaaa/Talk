<template>
	<view class="emoji">
		<view class="emoji_line" v-for="(line, i) in emoji" :key="i">
			<view 
			class="emoji_item" 
			v-for="(item, index) in line" 
			:key="index"
			@tap="clickEmoji(item)"
			>
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				emoji:[
						['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆'],
						['😉', '😊', '😋', '😎', '😍', '😘', '😗', '😙'],
						['😚', '🙂', '🤗', '🤔', '😐', '😑', '😶', '🙄'],
				    ],
			};
		},
		methods: {
			clickEmoji(e) {
				this.$emit('emotion', e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.emoji {
		width: 100%;
		height: 400rpx;
		padding: 10rpx;
		box-sizing: border-box;
		overflow: hidden;
		overflow-y: auto;
		.emoji_line {
			display: flex;
			text-align: center;
			.emoji_item {
				flex: 1;
			}
		}
	}
</style>
