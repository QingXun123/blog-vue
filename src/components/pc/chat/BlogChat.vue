<template>
	<div id="BlogChat" class="flex-center">
		<el-card class="box-card background-card">
			<div class="flex-container">
				<el-card class="box-card user-list-card">
					<ul ref="userList" class="user-list" v-infinite-scroll="userLoad" style="overflow:auto">
					    <li v-for="(oneUserData, index) in userData" :key="index - 1"  class="oneUser">
							<div class="flex-center-left">
								<el-avatar :size="40" :src="circleUrl"></el-avatar>
								<a v-if="oneUserData.status === 0" class="userName">游客{{ oneUserData.userName }}</a>
								<a v-else-if="oneUserData.status === 2" class="userName">【大坤吧】{{ oneUserData.userName }}</a>
								<a v-else class="userName">{{ oneUserData.userName }}</a>
							</div>
						</li>
					</ul>
				</el-card>
				<el-card class="box-card chat-card">
					<ul ref="chatList" class="chat-list" v-infinite-scroll="chatLoad" style="overflow:auto">
					    <li v-for="(oneChatData, index) in chatData" :key="index - 1" class="oneChat" ref="chatItem">
							<div>
								  <el-avatar :size="40" :src="circleUrl" class="userHead"></el-avatar>
								  <a v-if="oneChatData.status === '2'" class="userName-class">游客{{ oneChatData.userName }}</a>
								  <a v-else-if="oneChatData.type === 2" class="userName-class">游客{{ oneChatData.userId }}</a>
								  <a v-else class="userName-class">{{ oneChatData.userName }}</a>
								  <div class="sharpCorner-left"></div>
								  <span class="bubble">{{ oneChatData.chatContent || oneChatData.msg }}</span>
								  <!-- <span class="bubble">这是一个气泡内容</span> -->
								  <!-- <span class="bubble">这是一个气泡内容哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇</br>这是一个气泡内容</br>这是一个气泡内容</br>这是一个气泡内容</br></span> -->
							</div>
						</li>
					</ul>
				</el-card>
			</div>
			<el-card class="box-card content-card flex-center">
				<el-card class="box-card content-window flex-center">
					<el-checkbox v-model="chatChecked" class="checked" disabled>匿名发布</el-checkbox>
					<el-button 
					size="mini"
					:loading="loading"
					@click="addChatData()"
					class="content-button">发布</el-button>
				</el-card>
				<el-input
					  type="textarea"
					  placeholder="请输入内容"
					  v-model="content"
					  maxlength="300"
					  show-word-limit
					  resize="none"
					  class="content-input">
					</el-input>
				</el-card>
			</el-card>
		</el-card>
	</div>
</template>

<script>
	// 引入 WebSocket 模块
	import WebSocketClient from 'websocket'
	import axios from 'axios'
	
	export default {
		props: ['user'],
		data() {
			return {
				socket: null,
				content: '',
				userData: [],
				chatData: [],
				circleUrl: require('@/assets/headImg.png'),
				chatChecked: false,
				loading: false,
				status: 0,
				userName: '',
				intervalId: {},
				connectFlag: false,
			}
		},
		created() {
			// this.getUserList();
		  },
		  watch: {
		  	user: {
		  		immediate: true, // 立即执行一次
		  		handler(newVal, oldVal) {
					// 先关闭旧连接
					if (this.socket && this.socket.readyState === WebSocket.OPEN) {
					  this.socket.close();
					}
					this.setupWebSocket();
					console.log("newVal: " + newVal);
		  		}
		  	},
			socket: {
				immediate: true, // 立即执行一次
				handler(newVal, oldVal) {
					// 先关闭旧连接
					  oldVal.close();
					  console.log("关闭旧连接: ");
				}
			}
		  },
		  mounted() {
		  // Run your method every 5 seconds (adjust the interval as needed)
		  // 在组件创建时启动定时器
			  this.intervalId = setInterval(() => {
				// 要定期执行的方法
				this.getUserList();
			  }, 2000); // 间隔时间，单位是毫秒
		},
		 beforeDestroy() {
			// 在组件销毁前清除定时器
			clearInterval(this.intervalId);
		  },
		methods: {
			async setupWebSocket() {
				await this.getChatList();
				// 创建 WebSocket 实例
				const socket = new WebSocket(`ws://api.blog.qxbase.com/websocket/1/${this.user.userId}`);
			  // 创建 WebSocket 实例
			  this.socket = socket;
		
			  // 监听连接建立事件
			  this.socket.onopen = () => {
				console.log('WebSocket 连接已建立');
				this.getUserList();
				// this.sendMessage({'msg': "123", "to": "1", "userId": "1", "type": "2001"});
			  };
		  
			  // 监听消息事件
			  this.socket.onmessage = (event) => {
				console.log('接收到消息:', event.data);
				// this.userData.push(event.data.userName);
				const data = JSON.parse(event.data);
				
				this.chatData.push(data);
				this.scrollToChatBottom();
			  };
		  
			  // 监听连接关闭事件
			  this.socket.onclose = (event) => {
				console.log('WebSocket 连接已关闭:', event.code, event.reason);
			  };
		  
			  // 监听错误事件
			  this.socket.onerror = (error) => {
				console.error('WebSocket 发生错误:', error);
			  };
			},
			// 发送消息的方法
			sendMessage(message) {
			  if (this.socket && this.socket.readyState === WebSocket.OPEN) {
				message = JSON.stringify(message);
				this.socket.send(message);
				console.log('消息已发送:', message);
			  } else {
				console.error('WebSocket 连接未建立或已关闭');
			  }
			},
		  userLoad () {
			this.scrollToUserBottom();
		  },
		  chatLoad() {
			  this.scrollToChatBottom();
		  },
		  scrollToUserBottom() {
			this.$nextTick(() => {
			  const list = this.$refs.userList;
			  list.scrollTop = list.scrollHeight;
			});
		  },
		  scrollToChatBottom() {
			this.$nextTick(() => {
			  const list = this.$refs.chatList;
			  list.scrollTop = list.scrollHeight;
			});
		  },
		  getChatList() {
			  axios.get("http://api.blog.qxbase.com/chat/getChatList")
			  .then((response) => {
				  const data = response.data;
				  if (data.code != 200) {
					  this.$message({
						  'type': 'error',
						  'message': data.data,
					  })
				  }
				  this.chatData = data.data;
				  this.scrollToChatBottom();
				  console.log(this.chatData);
			  }).catch((error) => {
				  console.log(error);
			  })
		  },
		  getUserList() {
			  axios.get("http://api.blog.qxbase.com/room/getOnlineUserByRoomId?roomId=" + 1)
			  .then((response) => {
				  const data = response.data;
				  if (data.code != 200) {
					  this.$message({
						  'type': 'error',
						  'message': data.data,
					  })
				  }
				  this.userData = data.data;
				  console.log("userList: " + this.userData);
			  }).catch((error) => {
				  console.log(error);
			  })
		  },
		  addChatData() {
			  var message = {};
			  if (this.isLogin()) {
				  message = {
					  "msg":this.content,
					  "to":"1",
					  "type":"2002",
					  "userName":"青旬",
					  "userId":"1",
					  'status': "0",
				  }
			  } else {
				  message = {
					  "msg":this.content,
					  "to":"1",
					  "type":"2002",
					  'status': "2",
				  }
			  }
			  this.sendMessage(message);
			  this.content = '';
			  this.loading = true;
			  setTimeout(() => {
			  	this.loading = false;
			  }, 1500); // 2000 毫秒即 2 秒，你可以根据需要调整时间
		  },
		  isLogin: function() {
		  	return !(this.user === undefined || this.user === null || Object.keys(this.user).length === 0);
		  },
		}
	}
</script>

<style scoped>
	#BlogChat {
		min-height: 700px;
	}
	
	.flex-center {
		display: flex;
		align-items: center; /* 水平居中 */
		justify-content: center;
	}
	
	.flex-center-left {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	
	.background-card {
		margin-top: 30px;
		border-radius: 10px;
		width: 800px;
		height: 600px;
		background-color: darkgrey;
	}
	
	.flex-container {
		display: flex;
		height: 390px;
		width: 100%;
	}
	
	.user-list-card {
		width: 28%;
		border-radius: 10px;
		box-shadow: none; /* 去除阴影 */
		border-radius: 10px 5px 5px 5px;
	}
	
	.chat-card {
		background-color: rgb(248, 248, 248);
		border: 1px solid rgb(248, 248, 248);
		margin-left: 2%;
		width: 70%;
		border-radius: 5px 10px 5px 5px;
	}
	
	.user-list, .chat-list {
		position: relative;
		top: -20px;
		left: -20px;
		height: 360px;
		list-style-type: none;
		/* border: 2px solid black; */
	}
	
	.user-list {
		width: 174px;
	}
	
	.chat-list {
		width: 492px;
	}
	
	.oneUser {
		position: relative;
		min-width: 150px;
		max-width: 195px;
		left: -20px;
		margin-top: 20px;
		/* border: 2px solid black; */
	}
	
	.userHead {
		position: absolute;	
	}
	
	.userName-class {
		position: absolute;
		font-size: 13px;
		font-weight: 500;
		color: grey;
		left: 50px;
	}
	
	.sharpCorner-left {
		content: "";
		position: absolute;
		border-style: solid;
		border-width: 10px;
		border-color: transparent white transparent transparent; /* 调整颜色以匹配气泡背景 */
		top: 37px;
		left: 35px; /* 调整尖角位置 */
		transform: translateY(-50%);
	}
	
	/* 根据需要设置气泡的颜色、边框样式等 */
	span.bubble {
	  display: inline-block;
	  font-size: 14px;
	  font-weight: 500;
	  min-height: 20px;
	  min-width: 10px;
	  max-width: 275px;
	  top: 17px;
	  
	  background-color: white;
	  color: black;
	  padding: 10px;
	  padding-top: 13px;
	  border-radius: 10px;
	  position: relative;
	  left: 55px;
	}
	
	
	.userName {
		margin-left: 5px;
		/* border: 2px solid black; */
	}
	
	.oneChat {
		position: relative;
		min-width: 150px;
		max-width: 425px;
		left: -20px;
		margin-top: 37px;
		/* border: 2px solid black; */
	}
	
	.chatContent {
		margin-left: 5px;
	}
	
	.contentForm {
		font-size: 15px;
	}
	
	.content-card {
		width: 100%;
		margin-top: 10px;
		height: 160px;
		box-shadow: 0;
		position: relative;
		border-radius: 5px 5px 10px 10px;
	}
	
	.content-window {
		background-color: #f2f2f2;
		box-shadow: 0;
		border-radius: 5px 5px 0 0;
		position: relative;
		width: 761px;
		height: 30px;
	}
	
	.checked {
		position: relative;
		right: 300px;
	}
	
	.content-button {
		position: relative;
		left: 300px;
		box-shadow: 0;
	}
	
	.content-input {
		border-radius: 0 0 10px 10px;
		position: relative;
		height: 129px;
		left: 0;
		width: 765px;
	}
	
	/deep/ textarea {
		height: 130px;
		border-radius: 0 0 10px 10px;
	}
	
</style>