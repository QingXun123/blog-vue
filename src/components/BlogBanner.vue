<template>
  <div id="BlogBanner" class="carousel-container">
	<el-carousel>
	  <el-carousel-item v-for="item in 4" :key="item">
		<h3 class="small">
			<img :src="imgArr[item]" alt="" class="imgArr" />
		</h3>
	  </el-carousel-item>
	</el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgArr: [
        "https://img0.baidu.com/it/u=3021883569,1259262591&fm=253&fmt=auto&app=120&f=JPEG?w=1140&h=641",
        "https://img0.baidu.com/it/u=1856123620,3576811447&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333",
        "https://img2.baidu.com/it/u=2537370952,3446004972&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
        "https://img2.baidu.com/it/u=638285213,1746517464&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800",
      ],
    };
  },
  methods: {
    
  },
};
</script>

<style>
	
	.carousel-container {
		margin-left: 8%;
		width: 800px;
		heigth: 300px;
	}
	
	  .imgArr {
		width: 100%;  
		height: 100%;  
		object-fit: contain; /* 图片自适应容器，保持纵横比 */
		position: absolute; /* 图片自适应的关键 */
	  }
	  
</style>
