<template>
	<view class="voiceLoad">
		<view class="love">
		      <ul>
		        <li></li>
		        <li></li>
		        <li></li>
		        <li></li>
		        <li></li>
		        <li></li>
		        <li></li>
		        <li></li>
		        <li></li>
		      </ul>
		</view>
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
	.voiceLoad {
		
		.love ul {
		      width: 370rpx;
		      height: 400rpx;
		      margin: 0;
		      padding: 0;
		      display: flex;
		      align-items: center;
			  margin: 300rpx auto;
			  // transform: scale(.4);
		    }
		    .love ul li {
		      list-style: none;
		      width: 20rpx;
		      height: 20rpx;
		      border-radius: 10rpx;
		      background-color: #FFFFFF;
		      margin-left: 20rpx;
		    }
		    .love ul li:nth-child(1) {
		      animation: love1 2s linear infinite;
		      /* height: 60px; */
		      /* transform: translateY(-30px); */
		    }
		    .love ul li:nth-child(2) {
		      animation: love2 2s 0.2s linear infinite;
		      /* height: 155px; */
		      /* transform: translateY(-70px); */
		    }
		    .love ul li:nth-child(3) {
		      animation: love3 2s 0.4s linear infinite;
		      /* height: 200px; */
		      /* transform: translateY(-85px); */
		    }
		    .love ul li:nth-child(4) {
		      animation: love4 2s 0.8s linear infinite;
		      /* height: 210px; */
		      /* transform: translateY(30px); */
		    }
		    .love ul li:nth-child(5) {
		      animation: love5 2s 1s linear infinite;
		      /* height: 220px;
		      transform: translateY(50px); */
		    }
		    .love ul li:nth-child(6) {
		      animation: love4 2s 1.2s linear infinite;
		      /* height: 210px;
		      transform: translateY(30px); */
		    }
		    .love ul li:nth-child(7) {
		      animation: love3 2s 1.4s linear infinite;
		      /* height: 200px;
		      transform: translateY(-85px); */
		    }
		    .love ul li:nth-child(8) {
		      animation: love2 2s 1.8s linear infinite;
		      /* height: 155px; */
		      /* transform: translateY(-70px); */
		    }
		    .love ul li:nth-child(9) {
		      animation: love1 2s 2s linear infinite;
		      /* height: 60px; */
		      /* transform: translateY(-30px); */
		    }
		    @keyframes love1 {
		      30%,
		      50% {
		        height: 60rpx;
		        /* transform: translateY(-30px); */
		      }
		      70%,
		      100% {
		        height: 20rpx;
		        /* transform: translateY(0px); */
		      }
		    }
		    @keyframes love2 {
		      30%,
		      50% {
		        height: 155rpx;
		        /* transform: translateY(-70px); */
		      }
		      70%,
		      100% {
		        height: 20rpx;
		        /* transform: translateY(0px); */
		      }
		    }
		    @keyframes love3 {
		      30%,
		      50% {
		        height: 200rpx;
		        /* transform: translateY(-85px); */
		      }
		      70%,
		      100% {
		        height: 20rpx;
		        /* transform: translateY(0px); */
		      }
		    }
		    @keyframes love4 {
		      30%,
		      50% {
		        height: 210rpx;
		        transform: translateY(30px);
		      }
		      70%,
		      100% {
		        height: 20rpx;
		        transform: translateY(0px);
		      }
		    }
		    @keyframes love5 {
		      30%,
		      50% {
		        height: 220rpx;
		        transform: translateY(50px);
		      }
		      70%,
		      100% {
		        height: 20rpx;
		        transform: translateY(0px);
		      }
		    }
	}
</style>
