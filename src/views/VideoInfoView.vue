<template>
  <div id="videoInfo">
    <transition name="el-fade-in-linear">
      <div v-show="show">
        <div v-if="isMobile">
          <el-container>
            <el-header>
              <MobileMenu></MobileMenu>
            </el-header>
            <div style="margin: auto;">
              <el-container>
                <el-container>
                  <el-main style="padding: 0px 0px !important;">
                    <MobileVideoInfoForm></MobileVideoInfoForm>
                  </el-main>
                </el-container>
              </el-container>
            </div>
            <el-footer>
              <MobileNavigation></MobileNavigation>
            </el-footer>
          </el-container>
        </div>
        <div v-else>
          <el-container>
            <el-header>
              <BlogMenu></BlogMenu>
            </el-header>
            <div style="margin: auto; min-width: 1200px;">
              <VideoInfoForm></VideoInfoForm>
            </div>
            <el-footer id="footer">
              <BlogNavigation></BlogNavigation>
            </el-footer>
          </el-container>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import VideoInfoForm from "@/components/pc/video/VideoInfoForm.vue";
import MobileVideoInfoForm from "@/components/mobile/video/MobileVideoInfoForm.vue";

export default {
  name: 'videoInfo',
  components: {
    VideoInfoForm,
    MobileVideoInfoForm,
  },
  data() {
    return {
      isMobile: window.innerWidth < 768, // 假设小于768px的屏幕为手机设备
      show: false,
    };
  },
  created() {
    window.addEventListener('resize', this.checkDeviceType);
    setTimeout(() => {
      this.show = true;
    }, 500); // 2000 毫秒即 2 秒，你可以根据需要调整时间
  },
  destroyed() {
    window.removeEventListener('resize', this.checkDeviceType);
  },
  methods: {
    checkDeviceType() {
      this.isMobile = window.innerWidth < 768;
    },
  },
}
</script>

<style scoped>

#video {
  //background-color: rgb(36 36 36 / 1);
}

/* 默认样式 */
.element {
  /* 通用样式 */
  color: #2c3e50;
}

/* 重置页面的内外边距 */
body, html {
  margin: 0;
  padding: 0;
}

.el-header,
.el-container,
.el-footer {
  padding: 0 !important;
}

/* 响应式样式 */
@media (max-width: 768px) {
  .element {
    /* 手机样式 */
  }

  .el-header {
    padding: 0 0px !important;
  }

}

@media (min-width: 769px) and (max-width: 1024px) {
  .element {
    /* 平板样式 */
  }
}

@media (min-width: 1025px) {

  #video {
  }

  .element {
    /* 桌面样式 */
    min-width: 1200px; /* 最小宽度 */
  }

  .el-aside {
    width: 370px !important;
  }
}

</style>