<template>
  <div id="BlogBanner" class="carousel-container">
    <el-carousel>
      <el-carousel-item v-for="item in imgArr.length" :key="item">
        <h3 class="small">
          <img :src="imgArr[item - 1]" alt="" class="imgArr"/>
        </h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getBanner } from '@/api/essay/essay'

export default {
  data() {
    return {
      imgArr: []
    };
  },
  created() {
    this.getBanner();
  },
  methods: {
    getBanner: function () {
      getBanner().then((response) => {
        // console.log(this.imgArr);
        const records = response.data.records;
        this.imgArr = records.map((record) => record.img);
      }).catch((err) => {
        console.error(err);
      })
    }
  }
};
</script>

<style scoped>

#BlogBanner {
  position: relative;
}

.carousel-container {
  width: 800px;
  heigth: 300px;
}

.imgArr {
  width: 100%;
  height: 94%;
  position: absolute; /* 图片自适应的关键 */
  border-radius: 5px;
}

</style>
