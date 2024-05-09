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
            <span style="margin: 5px 10px 5px 10px; float: left; width: 50%">作者: {{
                video.video.author ? video.video.author : '暂无'
              }}</span>
            <span style="margin: 5px 10px 5px 10px; float: right; padding-right: 100px; width: auto;">地区: {{
                video.video.country ? video.video.country : '暂无'
              }}</span>
          </div>
          <div style="width: 100%; display: block;">
            <span style="margin: 5px 10px 5px 10px; float: left; width: 30%">更新时间: {{
                video.video.updateDay ? updateDays[video.video.updateDay] : '暂无'
              }}</span>
            <span style="margin: 5px 10px 5px 10px; float: right; padding-right: 100px; width: auto;">发布状态: {{
                video.video.status !== null ? status[video.video.status] : '暂无'
              }}</span>
          </div>
          <div style="width: 100%; display: block;">
            <span style="margin: 5px 10px 5px 10px; float: left; width: 20%">最新集: 第{{
                video.videoEpisodes[video.videoEpisodes.length - 1].episode
              }}集</span>
          </div>
        </div>
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
        <div class="handleIntroduction">
          <el-tabs v-model="introductionName" type="card">
            <el-tab-pane label="简介" name="1">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ video.video.introduction }}
            </el-tab-pane>
            <!--            <el-tab-pane label="线路二" name="2">线路二</el-tab-pane>-->
            <!--            <el-tab-pane label="线路三" name="3">线路三</el-tab-pane>-->
            <!--            <el-tab-pane label="线路四" name="4">线路四</el-tab-pane>-->
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="videoHotListCard">
      <span style="color: #FC8BBB; margin-top: 10px; margin-left: 10px">热门动漫</span>
      <div class="videoHot" v-for="(item, i) in videoHotPage.list" :key="i">
        <img
            :src="item.titleCoverUrl ? item.titleCoverUrl : 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'"
            class="imageHot"/>
        <div>
          <h2 class="titleHot">{{ truncateContent(item.title, 12) }}</h2>
          <span style="font-size: 12px; display: block; margin: 0px 0px 2px 5px; font-weight: 300;">状态: {{
              status[item.status]
            }}</span>
          <span style="font-size: 12px; display: block; width: 100%; margin: 0px 0px 2px 5px; font-weight: 300;">最新集: 第{{
              item.maxVideoEpisode
            }}集</span>
          <span style="font-size: 12px; display: block; width: 100%; margin: 0px 0px 2px 5px; opacity: 0.7;">简介: {{
              truncateContent(item.introduction, 28)
            }}</span>
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
        pageSize: 5,
        title: '',
      });
    }
  },
  methods: {
    getPage(data) {
      videoPage(data).then((response) => {
        const res = response.data;
        const data = res.data;
        this.video = data.list[0];
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
  width: 198px;
  height: 275px;
}

.videoInfoCard {
  width: 645px;
  max-height: 1200px;
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
  width: 100%;
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
  padding-bottom: 50px;
  //background-color: chartreuse;
}

.row-button {
  margin: 5px 5px 5px 5px;
  width: calc(100% / 6 - 10px); /* 每行卡片的宽度 */
  height: 30px;
}

.videoHotListCard {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 800px;
  margin-left: 20px;
  //background-color: blue;
}

.videoHot {
  display: flex;
  width: 100%;
  height: 102px;
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px solid #ccc; /* 上边框 */
  //background-color: darkorange;
}

.videoHot:first-of-type {
  border-top: none;
}

.imageHot {
  height: 100%;
  width: auto;
}

.titleHot {
  font-size: 15px;
  font-weight: 600;
  height: 20px;
  width: 100%;
  unicode-bidi: isolate;
  display: block; /* 设置该标签占有所在位置的一行，其它标签只能换行 */
  margin: 2px 0px 2px 5px;
  //background-color: bisque;
}

</style>