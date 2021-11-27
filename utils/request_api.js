const BASE_URL = 'http://127.0.0.1:3000';
export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: function(res) {
				// if(res.data.status !== 0) {
				// 	uni.showToast({
				// 		title: '获取数据失败！',
				// 	})
				// }
				resolve(res);
			},
			fail: function(err) {
				uni.showToast({
					title: '请求失败',
				})
				reject(err);
			}
		})
	})
}