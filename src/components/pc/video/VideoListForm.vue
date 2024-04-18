<template>
  <div id="videoList">
    <el-card class="videoListCard" :style="{ width: width }">
      <span style="margin-top: -12px; margin-left: -10px; position: absolute; font-size: 15px; color: #FC8BBB;"
            type="text">{{ title }}</span>
      <el-button style="float: right; top: -15px; left: 5px; position: relative; padding: 3px 0; font-size: 15px;"
                 type="text" disabled>更多
      </el-button>
      <div class="video-card-wrapper">
        <el-card v-for="(item, i) in videoPage.list" :key="i" class="videoCard" :body-style="{ padding: '0px' }">
          <img @click="videoCardOnClick(item.videoEpisodes[0].id)"
               :src="item.video.titleCoverUrl ? item.video.titleCoverUrl : 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'"
               class="image"/>
          <div style="padding: 2px;">
            <span>{{ truncateContent(item.video.title, 10) }}</span>
            <span style="font-size: 11px; opacity: 0.7; position: relative; float: right;">最新：第{{
                item.videoEpisodes[item.videoEpisodes.length - 1].episode
              }}集</span>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import backendUrls from '@/config/globalConfig'
import {videoPage} from '@/api/video/video'

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
      videoPage: {}
    }
  },
  created() {
    this.getPage({
      pageNum: 1,
      pageSize: 4,
      title: ''
    });
  },
  methods: {
    getPage(data) {
      videoPage(data).then((response) => {
        const data = response.data;
        this.videoPage = data;
      })
    },
    videoCardOnClick(videoEpisodeId) {
      this.$router.push({path: `/video/${videoEpisodeId}`});
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
#videoList {

}

.videoListCard {
  width: 800px;
  height: 260px;
}

.video-card-wrapper {
  position: relative;
  top: 25px;
  display: flex; /* 使用 Flexbox 布局 */
  flex-wrap: nowrap; /* 防止换行 */
  gap: 10px; /* 卡片之间的间距 */
}

.image {
  width: 136px;
  height: 189px !important;
  display: block;
  cursor: pointer;
}

.videoCard {
  box-shadow: none !important;
  border-radius: 0;
  border: none;
  font-size: 12px;
  position: relative;
  top: -15px;
  left: -10px;
  width: 136px;
  height: 220px;
}
</style>