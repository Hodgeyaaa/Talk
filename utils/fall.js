export default {
		formatDate(date) {
			let old = new Date(date)
			let now = new Date()
			let h = old.getHours()
			let m = old.getMinutes()
			let Y = old.getFullYear()
			let M = old.getMonth() + 1
			let D = old.getDate()
			
			let nh = now.getHours()
			let nm = now.getMinutes()
			let nY = now.getFullYear()
			let nM = now.getMonth() + 1
			let nD = now.getDate()
			
			if(Y === nY && M === nM && D === nD) {
				h = h < 10 ? '0' + h : h;
				m = m < 10 ? '0' + m : m;
				return h + ':' + m
			}
			if(Y === nY && M === nM && D + 1 === nD) {
				h = h < 10 ? '0' + h : h;
				m = m < 10 ? '0' + m : m;
				return '昨天' + h + ':' + m
			}
			else {
				M = M < 10 ? '0' + M : M;
				D = D < 10 ? '0' + D : D;
				return Y + '-' + M + '-' + D
				}
		},
		// 时间间隔
		time_interval(old, now) {
			old = new Date(old);
			now = new Date(now);
			// console.log("old:" + old + "now:" + now)
			let n_old = old.getTime();
			let n_now = now.getTime()
			if(n_old > (n_now + 1000 * 60 * 2)) {
				return now
			}else {
				return ''
			}
		},
		// 聊天记录时间
		formatDate_chat(date) {
			let old = new Date(date)
			let now = new Date()
			let h = old.getHours()
			let m = old.getMinutes()
			let Y = old.getFullYear()
			let M = old.getMonth() + 1
			let D = old.getDate()
			
			let nh = now.getHours()
			let nm = now.getMinutes()
			let nY = now.getFullYear()
			let nM = now.getMonth() + 1
			let nD = now.getDate()
			
			if(Y === nY && M === nM && D === nD) {
				h = h < 10 ? '0' + h : h;
				m = m < 10 ? '0' + m : m;
				return h + ':' + m
			}
			if(Y === nY && M === nM && D + 1 === nD) {
				h = h < 10 ? '0' + h : h;
				m = m < 10 ? '0' + m : m;
				return '昨天' + h + ':' + m
			}
			//今年内
			else if(Y === nY) {
				M = M < 10 ? '0' + M : M;
				D = D < 10 ? '0' + D : D;
				h = h < 10 ? '0' + h : h;
				m = m < 10 ? '0' + m : m;
				return M + '月' + D + '日 ' + h + ':' + m
				}
			else {
				M = M < 10 ? '0' + M : M;
				D = D < 10 ? '0' + D : D;
				return Y + '年' + M + '月' + D + '日'
				}
		}
	
}