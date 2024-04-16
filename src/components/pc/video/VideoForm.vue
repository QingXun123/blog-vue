<template>
	<div id="VideoForm">
		<div class="video-container">
			<vue-dplayer ref="dplayerRef" class="dplayer" :options="options"></vue-dplayer>
		</div>
		<el-button @click="onclick">123</el-button>
	</div>
</template>

<script>
import { getVideoBarrage } from '@/api/video/dplayer'
import WebSocketClient from 'websocket'
import axios from 'axios'
import backendUrls from '@/config/globalConfig';
import VueDPlayer from 'vue-dplayer';

export default {
  send: (endpoint, danmakuData) => {
	  //send 一样处理这里就不写了
	  console.log('假装通过 WebSocket 发送数据', danmakuData, endpoint.data);
  },
  read: (options) => {
	  console.log('read is running');
	  getVideoBarrage(1).then((response) => {
		  if (!response || response.code !== 200) {
			  options.error && options.error(response && response.msg);
			  return;
		  }
		  options.success(response.data);
	  }).catch((e) => {
		  console.error(e);
		  options.error && options.error();
	  });
  },
  components: {
    VueDPlayer
  },
  data() {
    return {
      user: {userId: 1},
      options: {
        lang: "zh-cn",
        preload: 'auto',
        video: {
          type: 'auto',
          url: 'http://minio.qxbase.com/qxbase-bucket/2024-04/07/7f5c1e77-eb1e-4323-8043-ed18ea7a113b.mp4',
		  pic: '123',
          // pic: 'http://minio.qxbase.com/qxbase-bucket/image.jpg'
        },
		danmaku: {
			id: 1,
			api: ['http://localhost:19000/dplayer/'],
		},
		apiBackend: {
			read: (options) => {
				  console.log('read is running');
				  getVideoBarrage(1).then((response) => {
					  if (!response || response.code !== 0) {
						  options.error && options.error(response && response.msg);
						  return;
					  }
					  console.log(options);
					  options.success(response.data);
				  }).catch((e) => {
					  console.error(e);
					  options.error && options.error();
				  });
			},
		},
      }
    }
  },
  created() {
    this.setupWebSocket();
  },
  beforeDestroy() {
    // 关闭 WebSocket 连接
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      this.socket.close();
    }
  },
  methods: {
    onclick() {
      console.log('当前播放状态: ' + this.$refs['danmakuRef'].getPlayState());
	  window.dp6 = new DPlayer({
		  container: document.getElementById('dplayer6'),
		  preload: 'none',
		  live: true,
		  danmaku: true,
		  apiBackend: {
			  read: function (endpoint, callback) {
				  console.log('假装 WebSocket 连接成功');
				  callback();
			  },
			  send: function (endpoint, danmakuData, callback) {
				  console.log('假装通过 WebSocket 发送数据', danmakuData);
				  callback();
			  }
		  },
		  video: {
			  url: 'https://s-sh-17-dplayercdn.oss.dogecdn.com/hikarunara.m3u8',
			  type: 'hls'
		  }
	  });
      // const message = {
      //  "msg": '123',
      //  "to":"2",
      //  "userId": 1,
      //  "type":"2002",
      //  'status': "2",
      // }
      // this.sendMessage(message);
    },
    setupWebSocket() {
      // 创建 WebSocket 实例
      const socket = new WebSocket(`${backendUrls.wsUrl}/websocket/2/${this.user.userId}`);
      // 创建 WebSocket 实例
      this.socket = socket;
      
      // 监听连接建立事件
      this.socket.onopen = () => {
        console.log('WebSocket 连接已建立');
        this.$notify({
          title: '成功',
          message: '影院已连接',
          type: 'success'
        });
        // this.getOnlineUserCount();
        // this.sendMessage({'msg': "123", "to": "1", "userId": "1", "type": "2001"});
      };
            
      // 监听消息事件
      this.socket.onmessage = (event) => {
        console.log('接收到消息:', event.data);
        // this.userData.push(event.data.userName);
        const data = JSON.parse(event.data);
      };
            
      // 监听连接关闭事件
      this.socket.onclose = (event) => {
        console.log('WebSocket 连接已关闭:', event.code, event.reason);
        this.$notify.error({
          title: '错误',
          message: '您与影院的连接似乎断开了哦~',
        });
      };
            
      // 监听错误事件
      this.socket.onerror = (error) => {
        console.error('WebSocket 发生错误:', error);
        this.$notify.error({
          title: '错误',
          message: '您与影院的连接似乎断开了哦~ 正在尝试重连',
        });
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
	onclick() {
		// this.$refs['dplayerRef'].dp.play();
		this.$refs['dplayerRef'].dp.danmaku.draw(
		    {
		        text: 'dplayer is amazing',
		        color: '#b7daff',
		        type: 'right', // should be `top` `bottom` or `right`
				speedRate: 1
		    }
		);
	}
  }
}
</script>

<style scoped>
#VideoForm {
  min-height: 600px;
}

.video-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
}

.dplayer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
