<template>
  <div id="VideoForm">
    <vue-dplayer id="dplayer" ref="dplayerRef" class="dplayer" :options="options"></vue-dplayer>
    <el-card class="episodeList" v-loading="episodeListLoading">
      <div slot="header">
        <span>{{ videoInfo.video.title }}</span>
        <span style="float: right; padding: 3px 0; opacity: 0.5;">{{
            videoInfo.video.type === 0 ? '待上映' : videoInfo.video.type === 1 ? '连载中' : '已完结'
          }}</span>
      </div>
      <div class="episodeMiddleWare"></div>
      <div class="episodeButton">
        <el-button :autofocus="item.id === videoEpisode.id" @click="eposodeOnClick(item.id)"
                   v-for="(item, i) in videoInfo.videoEpisodes" :key="i" class="row-button"><span
            style="top: -5px; position: relative;">{{ item.episode }}</span></el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import {getDanmuList, addDanmu} from '@/api/video/videoDanmu'
import {getVideoEpisodeById, getVideoById} from '@/api/video/videoEpisode'
import WebSocketClient from 'websocket'
import backendUrls from '@/config/globalConfig'
import VueDPlayer from 'vue-dplayer'

export default {
  components: {
    VueDPlayer
  },
  data() {
    return {
      episodeListLoading: true,
      container: document.getElementById('dplayer'),
      videoInfo: {
        video: {}
      },
      videoEpisode: {},
      options: {
        lang: "zh-cn",
        preload: 'auto',
        video: {
          type: 'auto',
          url: '',
          // url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
          // url: 'http://minio.qxbase.com/qxbase-bucket/2024-04/07/7f5c1e77-eb1e-4323-8043-ed18ea7a113b.mp4',
          pic: '',
          // pic: 'http://minio.qxbase.com/qxbase-bucket/image.jpg'
        },
        danmaku: true,
        apiBackend: {
          send: (url, data, cb) => {
            console.log('url: ' + url);
            // data: {"player":1,"author":1,"time":0,"text":"123123","color":"#fff","type":"right"}
            console.log('data: ' + JSON.stringify(data));
            console.log('cb: ' + cb);
            const danmu = {
              // userId: data.author,
              videoEpisodeId: this.videoEpisode.id,
              color: data.color,
              type: data.type === 'right' ? 0 : data.type === 'top' ? 1 : 2,
              text: data.text,
              time: data.time
            }
            addDanmu(danmu).then((response) => {
              this.$notify({
                title: '弹幕发送成功',
                message: danmu.text,
                type: 'success'
              });
              cb();
            }).catch((error) => {
              this.$notify.error({
                title: '失败',
                message: '弹幕发送失败 ' + error,
              });
            })
          },
          read: (endpoint, callback) => {
            getDanmuList(this.videoEpisode.id).then((response) => {
              if (!response || response.code !== 0) {
                endpoint.error && endpoint.error(response && response.msg);
                return;
              }
              callback('', response.data);
              // endpoint.success(response.data);
            }).catch((e) => {
              console.error(e);
              endpoint.error && endpoint.error();
            });
          },
        },
      }
    }
  },
  created() {
    this.videoEpisode.id = this.$route.params && this.$route.params.videoEpisodeId;
    if (this.videoEpisode.id) {
      this.switchVideo(this.videoEpisode.id);
    }
    // this.setupWebSocket();
  },
  watch: {
    'videoEpisode.videoId'(newVal, oldVal) {
      this.getEpisodeList(newVal);
    },
  },
  beforeDestroy() {
    // 关闭 WebSocket 连接
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      this.socket.close();
    }
  },
  methods: {
    setupWebSocket() {
      // 创建 WebSocket 实例
      const socket = new WebSocket(`${backendUrls.wsUrl}/websocket/2/${1}`);
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
    switchVideo(videoEpisodeId) {
      getVideoEpisodeById(videoEpisodeId).then((response) => {
        const data = response.data;
        this.videoEpisode = data;
        this.$refs['dplayerRef'].dp.switchVideo(
            {
              type: 'auto',
              url: data.videoUrl,
              pic: data.videoCoverUrl,
            }, {}
        );
      })
    },
    getEpisodeList(videoId) {
      this.episodeListLoading = true;
      getVideoById(videoId).then((response) => {
        this.episodeListLoading = false;
        const data = response.data;
        this.videoInfo = data;
      })
    },
    eposodeOnClick(id) {
      this.switchVideo(id);
    },
  }
}
</script>

<style scoped>
#VideoForm {
  min-height: 200px;
  display: flex;
  flex-direction: column; /* 垂直排列 */
  align-items: center; /* 垂直居中 */
}

.dplayer {
  width: 100vw;
  height: 300px;
}

.episodeList {
  width: 99vw;
  height: 200px;
}

.episodeMiddleWare {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.episodeButton {
  height: 300px;
  overflow-y: auto;
}

.row-button {
  margin-left: 10px;
  width: calc(100% / 4 - 10px); /* 每行卡片的宽度 */
  height: 30px;
  margin-bottom: 10px; /* 卡片之间的间距 */
}
</style>
