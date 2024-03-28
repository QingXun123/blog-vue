<template>
  <div id="MobileBanner">
	<el-carousel style="width: 100vw;" height="250px">
	  <el-carousel-item v-for="item in imgArr.length" :key="item">
		<h3 class="small">
			<img :src="imgArr[item - 1]" alt="" class="MImgArr" />
		</h3>
	  </el-carousel-item>
	</el-carousel>
  </div>
</template>

<script>
import axios from 'axios'; // 导入axios库
import backendUrls from '@/config/globalConfig';
	
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
    getBanner: function() {
		axios.get(backendUrls.url + "/essayBanner/getBanner").then
		((response) => {
			// console.log(this.imgArr);
			const records = response.data.data.records;
			this.imgArr = records.map((record) => record.img);
		}).catch((err) => {
			console.error(err);
		})
	}
  }
};
</script>

<style scoped>
	
	#MobileBanner {
		position: relative;
		margin: auto;
	}
	
	  .MImgArr {
		width: 100%;  
		height: 100%;  
		position: absolute; /* 图片自适应的关键 */
	  }
	  
</style>
