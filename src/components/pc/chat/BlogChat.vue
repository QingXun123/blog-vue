<template>
  <div id="BlogChat" class="flex-center">
    <el-card class="box-card background-card">
      <div class="flex-container">
        <el-card class="box-card user-list-card">
          <ul ref="userList" class="user-list" v-infinite-scroll="userLoad" style="overflow:auto">
            <li v-for="(oneUserData, index) in userData" :key="index - 1" class="oneUser">
              <div class="flex-center-left">
                <el-avatar :size="40" :src="circleUrl"></el-avatar>
                <a v-if="oneUserData.status === 0" class="userName">游客{{ oneUserData.userName }}</a>
                <a v-else-if="oneUserData.status === 2" class="userName">【大坤吧】{{ oneUserData.userName }}</a>
                <a v-else class="userName">{{ oneUserData.userName }}</a>
                <a v-if="oneUserData.userName === randomUserId || String(oneUserData.userId) === String(user.userId)"
                   class="userName">[我]</a>
              </div>
            </li>
          </ul>
        </el-card>
        <el-card class="box-card chat-card">
          <ul ref="chatList" class="chat-list" v-infinite-scroll="chatLoad" style="overflow:auto">
            <li v-for="(oneChatData, index) in chatData" :key="index - 1" class="oneChat" ref="chatItem">
              <div class="myChatFlex"
                   v-if="String(oneChatData.userId) === randomUserId || String(oneChatData.userId) === String(user.userId) || oneChatData.userName === randomUserId">
                <el-avatar :size="40" :src="circleUrl" class="userHeadByMyself"></el-avatar>
                <a v-if="oneChatData.status === '2'" class="userNameByMyself-class">游客{{ oneChatData.userName }}</a>
                <a v-else-if="oneChatData.type === 2" class="userNameByMyself-class">游客{{ oneChatData.userId }}</a>
                <a v-else class="userNameByMyself-class">{{ oneChatData.userName }}</a>
                <div class="sharpCorner-leftByMyself"></div>
                <span class="bubbleByMyself">{{ oneChatData.chatContent || oneChatData.msg }}</span>
                <!-- <span class="bubbleByMyself">这是一个气泡内容</span> -->
                <!-- <span class="bubbleByMyself">这是一个气泡内容哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇</br>这是一个气泡内容</br>这是一个气泡内容</br>这是一个气泡内容</br></span> -->
              </div>
              <div v-else>
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
      <div class="flex-container">
        <el-card class="box-card control-panel-class">
          <a>当前聊天室在线人数: {{ userCount }}</a>
          </br>
          <el-button @click="reConnectingClick" :type="connectStatus[connectIndex]" size="mini"
                     :loading="connectIndex === 0 || connectIndex === 3">
            <a v-if="connectIndex === 0">连接中</a>
            <a v-else-if="connectIndex === 1">连接成功</a>
            <a v-else-if="connectIndex === 2">连接已断开，点击重连</a>
            <a v-else-if="connectIndex === 3">正在重连...{{ reConnectTime }}</a>
          </el-button>
        </el-card>
        <el-card class="box-card content-card flex-center">
          <el-card class="box-card content-window flex-center">
            <el-checkbox v-model="chatChecked" class="checked" disabled>匿名发布</el-checkbox>
            <el-popover
                placement="right"
                width="400"
                trigger="click">
              <div style="display: inline;" @click="expressionIconClick(char)" class="clickable-link"
                   v-for="(char, index) in expressionIcon" :key="index">{{ char }}
              </div>
              <i class="el-icon-cherry clickable-link expressionIcon-class" slot="reference"></i>
            </el-popover>
            <el-button
                size="mini"
                :loading="loading"
                @click="addChatData()"
                class="content-button">发布
            </el-button>
          </el-card>
          <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="content"
              maxlength="300"
              show-word-limit
              resize="none"
              @keyup.enter.native="addChatData()"
              class="content-input">
          </el-input>
        </el-card>
      </div>

    </el-card>
    </el-card>
  </div>
</template>

<script>
// 引入 WebSocket 模块
import WebSocketClient from 'websocket'
import backendUrls from '@/config/globalConfig';
import {getChatList} from "@/api/chat/chat";
import {getOnlineCountByRoomId, getOnlineUserByRoomId} from "@/api/chat/chatWebSocket";

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
      randomUserId: null,
      connectStatus: ['info', 'success', 'warning', 'info'],
      connectIndex: 0,
      connectId: {},
      reConnectTime: 0,
      userCount: 0,
      expressionIcon: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺️', '😚', '😙', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡'],
    }
  },
  created() {
    // this.getUserList();
    setTimeout(() => {
      if (!(this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING))) {
        this.setupWebSocketAsVisitor();
      }
    }, 1500);
    setTimeout(() => {
      this.scrollToChatBottom();
    }, 1500);
    setTimeout(() => {
      if (!(this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING))) {
        this.connectIndex = 2;
      }
    }, 1500);
  },
  watch: {
    user: {
      immediate: true, // 立即执行一次
      handler(newVal, oldVal) {
        // 先关闭旧连接
        if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
          console.log("关闭socket");
          this.socket.close();
        }
        if (!(newVal === undefined || newVal === null || Object.keys(newVal).length === 0)) {
          this.setupWebSocket();
        } else {
          this.setupWebSocketAsVisitor();
        }
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
      this.getOnlineUserCount();
    }, 5000); // 间隔时间，单位是毫秒
    this.connectId = setInterval(() => {
      if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
        this.$notify({
          title: '成功',
          message: '在线聊天室已连接',
          type: 'success'
        });
        this.connectIndex = 1;
        clearInterval(this.connectId);
      }
    }, 1500);
  },
  beforeDestroy() {
    // 在组件销毁前清除定时器
    clearInterval(this.intervalId);
    // 关闭 WebSocket 连接
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      this.socket.close();
    }
  },
  methods: {
    async setupWebSocket() {
      await this.getChatList();
      if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
        this.socket.close();
      }
      // 创建 WebSocket 实例
      const socket = new WebSocket(`${backendUrls.wsUrl}/websocket/1/${this.user.userId}`);
      // 创建 WebSocket 实例
      this.socket = socket;

      // 监听连接建立事件
      this.socket.onopen = () => {
        console.log('WebSocket 连接已建立');
        this.getUserList();
        // this.getOnlineUserCount();
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
        this.$notify.error({
          title: '错误',
          message: '您与聊天室的连接似乎断开了哦~',
        });
      };

      // 监听错误事件
      this.socket.onerror = (error) => {
        console.error('WebSocket 发生错误:', error);
        this.$notify.error({
          title: '错误',
          message: '您与聊天室的连接似乎断开了哦~',
        });
      };
    },
    async setupWebSocketAsVisitor() {
      await this.getChatList();

      this.getRandomUserId();
      if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
        this.socket.close();
      }
      // 创建 WebSocket 实例
      const socket = new WebSocket(`${backendUrls.wsUrl}/websocket/1/${this.randomUserId}`);
      // 创建 WebSocket 实例
      this.socket = socket;

      // 监听连接建立事件
      this.socket.onopen = () => {
        console.log('WebSocket 连接已建立');
        this.getUserList();
        // this.getOnlineUserCount();
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
      if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
        message = JSON.stringify(message);
        this.socket.send(message);
        console.log('消息已发送:', message);
      } else {
        console.error('WebSocket 连接未建立或已关闭');
      }
    },
    userLoad() {
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
        list.style.scrollBehavior = 'smooth'; // Enable smooth scrolling
      });
    },
    getChatList() {
      getChatList().then((response) => {
        const data = response.data;
        if (data.code != 0) {
          this.$message({
            'type': 'error',
            'message': data.msg,
          })
        }
        this.chatData = data;
        this.scrollToChatBottom();
        console.log(this.chatData);
      }).catch((error) => {
        console.log(error);
      })
    },
    getUserList() {
      getOnlineUserByRoomId(1)
          .then((response) => {
            const data = response.data;
            if (data.code != 0) {
              this.$message({
                'type': 'error',
                'message': data.msg,
              })
            }
            this.userData = data;
            console.log("userList: " + this.userData);
          }).catch((error) => {
        console.log(error);
      })
    },
    addChatData() {
      var message = {};
      if (this.isLogin()) {
        message = {
          "msg": this.content,
          "to": "1",
          "type": "2002",
          "userName": this.user.userName,
          "userId": this.user.userId,
          'status': "0",
        }
      } else {
        message = {
          "msg": this.content,
          "to": "1",
          "userId": this.randomUserId,
          "type": "2002",
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
    isLogin: function () {
      return !(this.user === undefined || this.user === null || Object.keys(this.user).length === 0);
    },
    generateRandomNumber(length) {
      // 生成指定长度的随机数字字符串
      let result = '';
      for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10); // 生成 0 到 9 的随机数字
      }
      return result;
    },
    expressionIconClick(icon) {
      this.content += icon;
    },
    reConnectingClick() {
      if (this.connectIndex !== 2) {
        return;
      }
      this.$notify.info({
        title: '消息',
        message: '正在重连聊天室......'
      });
      this.connectIndex = 3;
      // 先关闭旧连接
      if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
        console.log("关闭socket");
        this.socket.close();
      }
      if (this.isLogin()) {
        this.setupWebSocket();
      } else {
        this.setupWebSocketAsVisitor();
      }
      this.reConnectTime = 5;
      setInterval(() => {
        this.reConnectTime--;
        if (this.reConnectTime <= 0) {
          if (this.connectIndex === 3) {
            this.connectIndex = 2;
          }
          clearInterval(this.connectId);
        }
      }, 1000);
    },
    getOnlineUserCount() {
      getOnlineCountByRoomId(1)
          .then((response) => {
            const data = response.data;
            if (data.code !== 0) {
              this.$message({
                'type': 'error',
                'message': data.msg,
              });
            }
            this.userCount = data;
            console.log("data: " + data);
          }).catch((error) => {
        console.log(error);
      })
    },
    getRandomUserId() {
      // 检查是否存在保存的位置信息和时间戳
      const lastRandomUserId = localStorage.getItem('lastRandomUserId');
      const lastRandomUserIdTimestamp = localStorage.getItem('lastRandomUserIdTimestamp');
      console.log("lastRandomUserId: " + lastRandomUserId);
      console.log("lastRandomUserIdTimestamp: " + lastRandomUserIdTimestamp);
      // 检查是否需要重新生成随机 ID
      if (lastRandomUserId && lastRandomUserIdTimestamp) {
        const currentTime = new Date().getTime();
        const lastGeneratedTime = parseInt(lastRandomUserIdTimestamp);

        // 判断是否超过一周，86400000 毫秒为一天的时间戳
        if (currentTime - lastGeneratedTime > 7 * 86400000) {
          this.randomUserId = 0 + this.generateRandomNumber(5);
          // 更新保存的位置和时间戳
          localStorage.setItem('lastRandomUserId', this.randomUserId);
          localStorage.setItem('lastRandomUserIdTimestamp', currentTime.toString());
        } else {
          this.randomUserId = lastRandomUserId;
        }
      } else {
        // 第一次生成随机 ID
        this.randomUserId = 0 + this.generateRandomNumber(5);
        // 保存位置和时间戳
        localStorage.setItem('lastRandomUserId', this.randomUserId);
        localStorage.setItem('lastRandomUserIdTimestamp', new Date().getTime().toString());
      }
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

.flex-center-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
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

.myChatFlex {
  display: flex;
  /* align-items: center; */
  justify-content: flex-end;
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

.userHeadByMyself {
  position: absolute;
  left: 450px;
}

.userName-class {
  position: absolute;
  font-size: 13px;
  font-weight: 500;
  color: grey;
  left: 50px;
}

.userNameByMyself-class {
  position: absolute;
  font-size: 13px;
  font-weight: 500;
  color: grey;
  top: 0;
  right: -10px;
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

.sharpCorner-leftByMyself {
  content: "";
  position: absolute;
  border-style: solid;
  border-width: 10px;
  border-color: transparent transparent transparent white; /* 调整颜色以匹配气泡背景 */
  top: 37px;
  left: 435px; /* 调整尖角位置 */
  transform: translateY(-50%) scaleY(-1); /* 垂直翻转 */;
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

/* 根据需要设置气泡的颜色、边框样式等 */
span.bubbleByMyself {
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
  right: -10px;
  direction: ltr; /* 设置文本方向为右到左 */
  text-align: left; /* 将文本从右侧开始显示，使长度向左增长 */
}

.userName {
  margin-left: 5px;
  max-width: 105px;
  font-size: 13px;
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
  width: 70%;
  margin-top: 10px;
  height: 160px;
  box-shadow: 0;
  position: relative;
  border-radius: 5px 5px 10px 5px;
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
  right: 180px;
}

.content-button {
  position: relative;
  left: 180px;
  box-shadow: 0;
}

.content-input {
  border-radius: 0 0 10px 10px;
  position: relative;
  height: 129px;
  left: 115px;
  width: 70%;
}

/deep/ textarea {
  height: 130px;
  border-radius: 0 0 10px 10px;
}

.clickable-link {
  cursor: pointer; /* 设置鼠标样式为手型，表示可以点击 */
}

.expressionIcon-class {
  position: relative;
  left: 170px;
  top: 3px;
}

.control-panel-class {
  width: 28%;
  height: 160px;
  margin-top: 10px;
  margin-right: 15px;
  border-radius: 5px 5px 5px 10px;
}

</style>