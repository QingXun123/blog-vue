<template>
  <div id="essay">
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
		  	  <BlogMenu></BlogMenu>
		    </el-header>
		    <div style="width: 1200px; margin: auto;">
		  	  <el-container>
		  	  		<el-container>
		  	  		  <el-main>
		  	  			  <div style="float: right;">
		  	  				<BlogEssayDetails></BlogEssayDetails>
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
</template>

<script>
	import MobileEssayDetails from '../components/mobile/essay/MobileEssayDetails.vue'
	import MobileDetails from '../components/mobile/home/MobileDetails.vue'
	import MobileEssayList from '../components/mobile/home/MobileEssayList.vue'
	
	
	export default {
	  name: 'home',
	  components: {
		MobileDetails,
		MobileEssayList,
		MobileEssayDetails,
	  },
	  data() {
	  	return {
	  	  isMobile: window.innerWidth < 768, // 假设小于768px的屏幕为手机设备
	  	};
	  },
	  created() {
	    window.addEventListener('resize', this.checkDeviceType);
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

<style>
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
