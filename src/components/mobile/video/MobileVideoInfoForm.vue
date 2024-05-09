<template>
  <div id="videoInfo">
    <div class="videoInfoCard">
      <div class="videoImgInfo">
        <img
            :src="video.video.titleCoverUrl ? video.video.titleCoverUrl : 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'"
            class="image"/>
        <div class="videoTextInfo">
          <h1 class="titleClass">{{ video.video.title }}</h1>
          <div style="width: 100%; display: block;">
            <span style="margin: 5px 0px 5px 10px; float: left; width: 30%">作者: {{
                video.video.author ? video.video.author : '暂无'
              }}</span>
            <span style="margin: 5px 0px 5px 0px; float: right; padding-right: 60px; width: auto;">地区: {{
                video.video.country ? video.video.country : '暂无'
              }}</span>
          </div>
          <div style="width: 100%; display: block;">
            <span style="margin: 5px 0px 5px 10px; float: left; width: 40%">更新时间: {{
                video.video.updateDay ? updateDays[video.video.updateDay] : '暂无'
              }}</span>
            <span style="margin: 5px 0px 5px 10px; float: right; padding-right: 20px; width: auto;">发布状态: {{
                video.video.status !== null ? status[video.video.status] : '暂无'
              }}</span>
          </div>
          <div style="width: 100%; display: block;">
            <span style="margin: 5px 10px 5px 10px; float: left; width: 50%">最新集: 第{{
                video.videoEpisodes[video.videoEpisodes.length - 1].episode
              }}集</span>
          </div>
        </div>
      </div>
      <div class="handleIntroduction">
        <el-tabs v-model="introductionName" type="card">
          <el-tab-pane label="简介" name="1" style="font-size: 12px">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ video.video.introduction }}
          </el-tab-pane>
          <!--            <el-tab-pane label="线路二" name="2">线路二</el-tab-pane>-->
          <!--            <el-tab-pane label="线路三" name="3">线路三</el-tab-pane>-->
          <!--            <el-tab-pane label="线路四" name="4">线路四</el-tab-pane>-->
        </el-tabs>
      </div>
      <div class="videoEpisodeInfo">
        <div class="handleEpisode">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="线路一" name="1" class="videoEpisodeTab">
              <el-button @click="eposodeOnClick(item.id)"
                         v-for="(item, i) in video.videoEpisodes" :key="i" class="row-button"><span
                  style="top: -5px; position: relative;">{{ item.episode }}</span></el-button>
            </el-tab-pane>
            <!--            <el-tab-pane label="线路二" name="2">线路二</el-tab-pane>-->
            <!--            <el-tab-pane label="线路三" name="3">线路三</el-tab-pane>-->
            <!--            <el-tab-pane label="线路四" name="4">线路四</el-tab-pane>-->
          </el-tabs>
        </div>
      </div>
      <div class="videoHotListCard">
        <span style="color: #FC8BBB; margin-top: 10px; margin-left: 10px">热门动漫</span>
        <div class="video-card-wrapper">
          <el-card v-for="(item, i) in videoHotPage.list" :key="i" class="videoCard" :body-style="{ padding: '0px' }">
            <img @click="videoCardOnClick(item.firstVideoEpisodeId)"
                 :src="item.titleCoverUrl ? item.titleCoverUrl : 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'"
                 class="image"/>
            <div style="padding: 2px;">
              <span>{{ truncateContent(item.title, 10) }}</span>
              <span style="font-size: 11px; opacity: 0.7; position: relative; float: right;">最新：第{{
                  item.maxVideoEpisode
                }}集</span>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import backendUrls from '@/config/globalConfig'
import {videoPage, newVideoList} from '@/api/video/video'

export default {
  props: {
    width: {
      type: String,
    },
    title: {
      default: '热门动漫',
      type: String,
    },
  },
  data() {
    return {
      activeName: '1',
      introductionName: '1',
      video: {},
      videoHotPage: {},
      updateDays: ['无', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      status: ['待上映', '连载中', '已完结'],
    }
  },
  created() {
    const videoId = this.$route.params && this.$route.params.videoId;
    if (videoId) {
      this.getPage({
        pageNum: 1,
        pageSize: 1,
        title: '',
        videoId: videoId,
      });
      this.getHotList({
        pageNum: 1,
        pageSize: 6,
        title: '',
      });
    }
  },
  methods: {
    getPage(data) {
      videoPage(data).then((response) => {
        const res = response.data;
        this.video = res.data.list[0];
      })
    },
    getHotList(data) {
      newVideoList(data).then((response) => {
        const res = response.data;
        this.videoHotPage = res.data;
      })
    },
    eposodeOnClick(videoEpisodeId) {
      this.$router.push({path: `/video/play/${videoEpisodeId}`});
    },
    truncateContent(content, max) {
      // 如果内容长度大于 max，则截取前 max 个字符并加上省略号
      if (content.length > max) {
        const plainText = content.replace(/<[^>]*>/g, '');
        return plainText.substring(0, max) + '...';
      }
      // 否则返回原内容
      return content;
    },
  }
}
</script>

<style scoped>
#videoInfo {
  margin-top: 5px;
  display: flex;
  justify-content: center; /* 水平居中 */
}

.image {
  width: 120px;
  height: 172px;
}

.videoInfoCard {
  width: 100%;
  //background-color: red;
}

.videoImgInfo {
  //background-color: #FC8BBB;
  display: flex;
}

.videoTextInfo {
  width: 100%;
  //background-color: #999999;
  font-size: 13px;
}

.titleClass {
  width: auto;
  font-size: 20px;
  font-weight: bold;
  unicode-bidi: isolate;
  display: block; /* 设置该标签占有所在位置的一行，其它标签只能换行 */
  margin: 0px 0px 5px 10px;
}

.videoEpisodeInfo {
  display: flex;
  justify-content: center; /* 水平居中 */
  flex-direction: column;
}

.handleEpisode {
  width: 100%;
  max-height: 300px;
  //background-color: chartreuse;
}

.videoEpisodeTab {
  gap: 10px;
  max-height: 200px;
  margin-bottom: 20px;
  overflow-y: auto; /* 添加垂直滚动条 */
}

.handleIntroduction {
  width: 100%;
  max-height: 1000px;
  padding-bottom: 10px;
  //background-color: chartreuse;
}

.row-button {
  margin: 5px 5px 5px 5px;
  width: calc(100% / 4 - 10px); /* 每行卡片的宽度 */
  height: 30px;
}

.videoHotListCard {
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-height: 500px;
  padding-bottom: 10px;
  //background-color: blue;
}

.video-card-wrapper {
  width: 97vw;
  left: calc((100vw - 122px * 3) / 4);
  position: relative;
  display: flex; /* 使用 Flexbox 布局 */
  gap: calc((100vw - 122px * 3) / 4);
  flex-wrap: wrap;
}

.image {
  width: 122px;
  height: 174px;
  display: block;
  cursor: pointer;
  border-radius: 5px;
}

.videoCard {
  box-shadow: none !important;
  border-radius: 5px;
  border: none;
  font-size: 12px;
  position: relative;
  width: 122px;
  height: 210px;
}

</style>