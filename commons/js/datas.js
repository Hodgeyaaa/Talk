export default {
	friends: function() {
		let userArr = [
			{	id: 1,
				imgurl: require('@/static/images/public/Head/boy1.png'),
				tip: 9,
				name: '麦岑福',
				sex: '男',
				email: 'bbcdef@163.com',
				password: 123456,
				telephone: 17322096481,
				createTime: new Date()-1000*60*60*60*24*7,
				autograph: '格式单窗口是从哪开始了',
				time: new Date(),
				news: '不要使用方言，引起用户无法理解，听不懂表达的话，那么用户关注的意义何在呢？',
			},
			{	id: 2,
				imgurl: require('@/static/images/public/Head/boy2.png'),
				tip: 2,
				name: 'Jhon',
				sex: '男',
				email: 'aacdef@163.com',
				password: 123456,
				telephone: 17322096481,
				createTime: new Date()-1000*60*60*60*24*7,
				autograph: '格式单窗口是从哪开始了',
				time: new Date(),
				news: '不要使用方言，引起用户无法理解，听不懂表达的话，那么用户关注的意义何在呢？',
			},
			{	id: 3,
				imgurl: require('@/static/images/public/Head/boy3.png'),
				tip: 0,
				name: 'Peter',
				sex: '男',
				email: 'abddef@163.com',
				password: 123456,
				telephone: 17322096481,
				createTime: new Date()-1000*60*60*60*24*7,
				autograph: '格式单窗口是从哪开始了',
				time: new Date(),
				news: '不要使用方言，引起用户无法理解，听不懂表达的话，那么用户关注的意义何在呢？',
			},
			{	id: 4,
				imgurl: require('@/static/images/public/Head/girl1.png'),
				tip: 11,
				name: 'Mary',
				sex: '女',
				email: 'abceef@163.com',
				password: 123456,
				telephone: 17322096481,
				createTime: new Date()-1000*60*60*60*24*7,
				autograph: '格式单窗口是从哪开始了',
				time: new Date(),
				news: '不要使用方言，引起用户无法理解，听不懂表达的话，那么用户关注的意义何在呢？',
			},
			{	id: 5,
				imgurl: require('@/static/images/public/Head/boy4.png'),
				tip: 0,
				name: 'peiqi',
				sex: '男',
				email: 'PQ@163.com',
				password: 123456,
				telephone: 17322096481,
				createTime: new Date()-1000*60*60*60*24*7,
				autograph: '格式单窗口是从哪开始了',
				time: new Date(),
				news: '不要使用方言，引起用户无法理解，听不懂表达的话，那么用户关注的意义何在呢？',
			},
			{	id: 6,
				imgurl: require('@/static/images/public/Head/boy5.png'),
				tip: 9,
				name: '李庄',
				sex: '男',
				email: 'LiZ@163.com',
				password: 123456,
				telephone: 17322096481,
				createTime: new Date()-1000*60*60*60*24*7,
				autograph: '格式单窗口是从哪开始了',
				time: new Date(),
				news: '不要使用方言，引起用户无法理解，听不懂表达的话，那么用户关注的意义何在呢？',
			},
			{	id: 7,
				imgurl: require('@/static/images/public/Head/boy2.png'),
				tip: 2,
				name: '张苏格',
				sex: '男',
				email: 'shu@163.com',
				password: 123456,
				telephone: 17322096481,
				createTime: new Date()-1000*60*60*60*24*7,
				autograph: '格式单窗口是从哪开始了',
				time: new Date(),
				news: '不要使用方言，引起用户无法理解，听不懂表达的话，那么用户关注的意义何在呢？',
			},
			{	id: 8,
				imgurl: require('@/static/images/public/Head/boy4.png'),
				tip: 0,
				name: '刘大壮',
				sex: '男',
				email: 'LDZ@163.com',
				password: 123456,
				telephone: 17322096481,
				createTime: new Date()-1000*60*60*60*24*7,
				autograph: '格式单窗口是从哪开始了',
				time: new Date(),
				news: '不要使用方言，引起用户无法理解，听不懂表达的话，那么用户关注的意义何在呢？',
			},
			{	id: 9,
				imgurl: require('@/static/images/public/Head/boy3.png'),
				tip: 11,
				name: '王五',
				sex: '男',
				email: 'WW@163.com',
				password: 123456,
				telephone: 17322096481,
				createTime: new Date()-1000*60*60*60*24*7,
				autograph: '格式单窗口是从哪开始了',
				time: new Date(),
				news: '不要使用方言，引起用户无法理解，听不懂表达的话，那么用户关注的意义何在呢？',
			},
			{	id: 10,
				imgurl: require('@/static/images/public/Head/girl4.png'),
				tip: 0,
				name: '韩梅梅',
				sex: '女',
				email: 'PQ@163.com',
				password: 123456,
				telephone: 17322096481,
				createTime: new Date()-1000*60*60*60*24*7,
				autograph: '格式单窗口是从哪开始了',
				time: new Date(),
				news: '不要使用方言，引起用户无法理解，听不懂表达的话，那么用户关注的意义何在呢？',
			},
			{	id: 11,
				imgurl: require('@/static/images/public/Head/boy6.png'),
				tip: 0,
				name: '李雷',
				sex: '男',
				email: 'LiLei@163.com',
				password: 123456,
				telephone: 17322096481,
				createTime: new Date()-1000*60*60*60*24*7,
				autograph: '格式单窗口是从哪开始了',
				time: new Date(),
				news: '不要使用方言，引起用户无法理解，听不懂表达的话，那么用户关注的意义何在呢？',
			},
		];
		return userArr;
	},
	// 群表
	groups() {
		let groups = [
			{
				groupId: 1,
				id: 1,//数据id
				groupName: '1号群',
				groupMember: [
					{
						userId: 1,
					},
					{
						userId: 2,
					},
					{
						userId: 3,
					},
					{
						userId: 4,
					},
					{
						userId: 5,
					},
					{
						userId: 6,
					},
					{
						userId: 7,
					},
					
					
					
				],
				tip: 0,
				time: new Date() - 1000 * 60 * 4,
				news: '大家好',
			},
		];
		return groups;
	},
	// 好友表
	myFriends() {
		let myFriendsArr = [
			{	id: 1,
				imgurl: require('@/static/images/public/Head/boy1.png'),
				tip: 9,
				name: '麦岑福',
				nick: '大麦子',
				email: 'bbcdef@163.com',
				time: new Date(),
				news: 'have not heard from sb. since; have had no news of sb. or sth.',
			},
			{	id: 2,
				imgurl: require('@/static/images/public/Head/boy2.png'),
				tip: 2,
				name: 'Jhon',
				nick: '二爷',
				email: 'aacdef@163.com',
				time: new Date(),
				news: 'have not heard from sb. since; have had no news of sb. or sth.',
			},
			{	id: 3,
				imgurl: require('@/static/images/public/Head/boy3.png'),
				tip: 0,
				name: 'Peter',
				nick: '老皮',
				email: 'abddef@163.com',
				time: new Date(),
				news: 'have not heard from sb. since; have had no news of sb. or sth.',
			},
			{	id: 4,
				imgurl: require('@/static/images/public/Head/girl2.png'),
				tip: 11,
				name: 'Mary',
				nick: '小美',
				email: 'abceef@163.com',
				time: new Date(),
				news: 'have not heard from sb. since; have had no news of sb. or sth.',
			},
			{	id: 5,
				imgurl: require('@/static/images/public/Head/boy4.png'),
				tip: 0,
				name: 'peiqi',
				nick: '佩奇',
				email: 'PQ@163.com',
				time: new Date(),
				news: 'have not heard from sb. since; have had no news of sb. or sth.',
			},
		];
		return myFriendsArr;
	},
	
	// 判断好友表
	isFriend() {
		let isFriend = [
			{
				userid: 1,
				friend: 1,
			},
			{
				userid: 2,
				friend: 2,
			},
			{
				userid: 3,
				friend: 3,
			},
			{
				userid: 4,
				friend: 4,
			},
			
		];
		return isFriend;
	},
	// 用户之间聊天信息
	message:function() {
		let msg = [
			{
				userId: 1,
				chatMessage: [
					{
						friendId: 2,
						news: [
							{
								id: 'b',
								userId: 1,
								imgUrl: require('@/static/images/public/Head/hodgeHead.png'),
								message: {
									voice: '',
									time: 3
								},
								types: 2,
								time: new Date() - 2000,
								tip: 0
							},
							{
								id: 'a',
								userId: 2,
								imgUrl: require('@/static/images/public/Head/boy2.png'),
								message: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F3d%2Fa5%2F42%2F3da542de95a5ab09941a42ff4256951d.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636110666&t=1baac9efceeb2aa768031c214194ad5a',
								types: 1,
								time: new Date() - 1000,
								tip: 1
							},
							{
								id: 'a',
								userId: 2,
								imgUrl: require('@/static/images/public/Head/boy2.png'),
								message: {
									name: '广东工贸职业技术学院',
									address: '广东省广州市兴华街道广州大道北1098号',
									longitude: 120.363172,
									latitude: 30.312212,
								},
								types: 3,
								time: new Date() - 1000 * 60 * 4,
								tip: 2
							},
							{
								id: 'a',
								userId: 2,
								imgUrl: require('@/static/images/public/Head/boy2.png'),
								message: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fuploads.5068.com%2Fallimg%2F1712%2F144-1G209191R5.jpg&refer=http%3A%2F%2Fuploads.5068.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636110666&t=06676d908824115a463002f40c4552e8',
								types: 1,
								time: new Date() - 1000 * 23,
								tip: 3
							},
							{
								id: 'a',
								userId: 2,
								imgUrl: require('@/static/images/public/Head/boy2.png'),
								message: '雷，我们也好久没见了，我有好多话想跟你说',
								types: 0,
								time: new Date() - 1000 * 50,
								tip: 4
							},
							{
								id: 'b',
								userId: 1,
								imgUrl: require('@/static/images/public/Head/hodgeHead.png'),
								message: '雷，我们也好久没见了，我有好多话想跟你说',
								types: 0,
								time: new Date() - 1000 * 60 * 4,
								tip: 5
							},
							{
								id: 'b',
								userId: 1,
								imgUrl: require('@/static/images/public/Head/hodgeHead.png'),
								message: '雷，我们也好久没见了，我有好多话想跟你说',
								types: 0,
								time: new Date() - 1000 * 60 * 30,
								tip: 6
							},
							{
								id: 'a',
								userId: 2,
								imgUrl: require('@/static/images/public/Head/boy2.png'),
								message: {
									voice: '',
									time: 3
								},
								types: 2,
								time: new Date() - 1000 * 60 * 60 * 24 * 2,
								tip: 7
							},
							{
								id: 'a',
								userId: 2,
								imgUrl: require('@/static/images/public/Head/boy2.png'),
								message: '雷，我们也好久没见了，我有好多话想跟你说',
								types: 0,
								time: new Date() - 1000 * 60 * 60 * 24 * 3,
								tip: 8
							},
							{
								id: 'b',
								userId: 1,
								imgUrl: require('@/static/images/public/Head/hodgeHead.png'),
								message: '梅，我们也好久没见了，我有好多话想跟你说',
								types: 0,
								time: new Date() - 1000 * 60 * 60 * 24 * 4,
								tip: 9
							},
							{
								id: 'b',
								userId: 1,
								imgUrl: require('@/static/images/public/Head/hodgeHead.png'),
								message: '梅，你怎么了？',
								types: 0,
								time: new Date() - 1000 * 60 * 60 * 24 * 4,
								tip: 10
							},
							{
								id: 'a',
								userId: 2,
								imgUrl: require('@/static/images/public/Head/boy2.png'),
								message: '雷.....',
								types: 0,
								time: new Date() - 1000 * 60 * 60 * 24 * 4,
								tip: 11
							},
						],
					},
				],
			},
		]
		return msg;
	},
	//群聊天信息
	groupMessage: function() {
		let groupMsg = [
			{
				groupId: 1,
				news: [
					{
						id: 'a',
						userId: '1',
						imgUrl: require('@/static/images/public/Head/boy1.png'),
						message: '梅，我们也好久没见了，我有好多话想跟你说',
						types: 0,
						time: new Date() - 1000 * 60 * 60 * 24 * 4,
						tip: 1, //消息编号
					},
					{
						id: 'a',
						userId: '2',
						imgUrl: require('@/static/images/public/Head/boy2.png'),
						message: '大家好',
						types: 0,
						time: new Date() - 1000 * 60 * 60 * 24 * 5,
						tip: 2, 
					}
				],
			},
		]
		return groupMsg;
	},
}