<template>
  <div id="videoList">
    <el-card class="videoListCard" :style="{ width: width }, { marginTop: marginTop }" v-if="videoPage.list.length > 0">
      <div>
        <span style="margin-top: -12px; margin-left: 10px; position: absolute; font-size: 15px; color: #FC8BBB;"
              type="text">{{ title }}</span>
        <el-button style="float: right; top: -15px; left: -5px; position: relative; padding: 3px 0; font-size: 15px;"
                   type="text" disabled>更多
        </el-button>
      </div>
      <div class="video-card-wrapper">
        <el-card v-for="(item, i) in videoPage.list" :key="i" class="videoCard" :body-style="{ padding: '0px' }">
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
    </el-card>
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
    marginTop: {
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
      newVideoList(data).then((response) => {
        const data = response.data;
        this.videoPage = data;
        console.log('data: ' + data);
      })
    },
    videoCardOnClick(videoId) {
      this.$router.push({path: `/video/play/${videoId}`});
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
  margin-top: 5px;
  display: flex;
  justify-content: center; /* 水平居中 */
}

.videoListCard {
  width: 99vw !important;
  height: 250px;
  display: flex;
  justify-content: center; /* 水平居中 */
}

.video-card-wrapper {
  width: 100vw;
  left: calc((100vw - 122px*3) / 4);
  position: relative;
  display: flex; /* 使用 Flexbox 布局 */
  flex-wrap: nowrap; /* 防止换行 */
  gap: calc((100vw - 122px*3) / 4);
}

.image {
  width: 122px;
  height: 174px;
  display: block;
  cursor: pointer;
}

.videoCard {
  box-shadow: none !important;
  border-radius: 0;
  border: none;
  font-size: 12px;
  position: relative;
  top: -10px;
  width: 122px;
  height: 210px;
}
</style>