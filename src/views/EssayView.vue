<template>
  <div id="essay">
	  <transition name="el-fade-in-linear">
		  <div v-show="show">
			  <div v-if="isMobile">
				  <el-container style="width: 100vw;">
					<el-header>
					  <MobileMenu></MobileMenu>
					</el-header>
					<div style="margin: auto;">
					  <el-container>
							<el-container>
							  <el-main style="padding: 0px 0px !important;">
									<MobileEssayDetails></MobileEssayDetails>
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
					  <BlogMenu @userEvent="userEvent"></BlogMenu>
					</el-header>
					<div style="width: 1200px; margin: auto;">
					  <el-container>
							<el-container>
							  <el-main>
								  <div style="float: right;">
									<BlogEssayDetails></BlogEssayDetails>
									<BlogComment :user="user"></BlogComment>
								  </div>
							  </el-main>
							</el-container>
							<el-aside>
								<div>
									<BlogHandpick></BlogHandpick>
									<BlogDate></BlogDate>
									<BlogIntroduction></BlogIntroduction>
								</div>
							</el-aside>
					  </el-container>
					</div>
					<el-footer>
					  <BlogNavigation></BlogNavigation>
					</el-footer>
				  </el-container>
			  </div>
		    </div>
		</transition>
  </div>
</template>

<script>
	import BlogEssayDetails from '../components/pc/essay/BlogEssayDetails.vue'
	import BlogComment from '../components/pc/essay/BlogComment.vue'
	import MobileEssayDetails from '../components/mobile/essay/MobileEssayDetails.vue'
	import MobileDetails from '../components/mobile/home/MobileDetails.vue'
	import MobileEssayList from '../components/mobile/home/MobileEssayList.vue'
	
	export default {
	  name: 'home',
	  components: {
		BlogEssayDetails,
		MobileDetails,
		MobileEssayList,
		MobileEssayDetails,
		BlogComment
	  },
	  data() {
	  	return {
	  	  isMobile: window.innerWidth < 768, // 假设小于768px的屏幕为手机设备
		  show: false,
		  user: { "userId": 1, "phone": "13682348336", "email": "947338658@qq.com", "userName": "青旬", "sex": 0 },
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
		userEvent(user) {
			this.user = user;
		}
	  },
    }
</script>

<style scoped>
	#essay {
	  color: #2c3e50;
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
	  .element {
	    /* 桌面样式 */
		min-width: 1200px; /* 最小宽度 */
	  }
	  
	  .el-aside {
	    width: 370px !important;
	  }
	}
	

</style>
