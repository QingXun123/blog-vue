<template>
  <div id="BlogBanner" class="carousel-container">
	<el-carousel>
	  <el-carousel-item v-for="item in imgArr.length" :key="item">
		<h3 class="small">
			<img :src="imgArr[item - 1]" alt="" class="imgArr" />
		</h3>
	  </el-carousel-item>
	</el-carousel>
  </div>
</template>

<script>
import axios from 'axios'; // 导入axios库
	
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
		axios.get("http://42.193.243.59:9000/essayBanner/getBanner").then
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
	
	#BlogBanner {
		position: relative;
	}
	
	.carousel-container {
		width: 800px;
		heigth: 300px;
	}
	
	  .imgArr {
		width: 100%;  
		height: 100%;  
		position: absolute; /* 图片自适应的关键 */
	  }
	  
</style>
