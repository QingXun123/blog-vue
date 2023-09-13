<template>
  <div id="BlogBanner" class="carousel-container">
    <div class="arrow left" @click="left">
      <button class="slideshow-button previous" @click="showSlides(-1)">&#8249;</button>
    </div>
    <div class="carousel">
      <img :src="imgArr[index]" alt="" class="imgArr" />
    </div>
    <div class="arrow right" @click="right">
      <button class="slideshow-button next" @click="showSlides(1)">&#8250;</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      imgArr: [
        "https://img0.baidu.com/it/u=3021883569,1259262591&fm=253&fmt=auto&app=120&f=JPEG?w=1140&h=641",
        "https://img0.baidu.com/it/u=1856123620,3576811447&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333",
        "https://img2.baidu.com/it/u=2537370952,3446004972&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
        "https://img2.baidu.com/it/u=638285213,1746517464&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800",
      ],
    };
  },
  methods: {
    left() {
      if (this.index <= 0) {
        this.index = 3;
      } else {
        this.index--;
      }
      console.log("index: " + this.index);
    },
    right() {
      if (this.index >= 3) {
        this.index = 0;
      } else {
        this.index++;
      }
      console.log("index: " + this.index);
    },
    showSlides(n) {
      // 可选的 showSlides 方法
      // 根据传入的参数 n，来切换图片
      // 您可以自定义该方法的行为
    },
  },
};
</script>

<style>
	.carousel-container {
		position: relative;
		width: 600px;
		height: 300px;
		left: 20%;
		margin-top: 20px;
	}

	.carousel {
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		position: relative;
		width: 100%;
		height: 100%;
		/* 设置元素的边框圆角半径为 5 像素，使边角变得圆滑 */
		border-radius: 5px;
	}

	.slideshow-button {
	  position: absolute;
	  top: 50%;
	  transform: translateY(-50%);
	  padding: 10px;
	  background-color: rgba(0, 0, 0, 0);
	  color: white;
	  font-size: 50px;
	  border: none;
	  cursor: pointer;
	  transition: opacity 0.3s, background-color 0.3s; /* 添加背景颜色过渡效果 */
	}
	
	.slideshow-button:hover {
	  background-color: rgba(0, 0, 0, 0.5);
	}
	
	.slideshow-button.previous {
	  left: 0%;
	  z-index: 1; /* 添加这行 */
	}
	.slideshow-button.next {
	  right: 0%;
	}

	.arrow img {
		width: 100%;
		height: 100%;
	}

</style>
