<template>
  <div id="home">
	<el-container>
	  <el-header>
		  <BlogMenu></BlogMenu>
	  </el-header>
	  <div style="width: 1200px; margin: auto;">
		  <el-container>
		  		<el-container>
		  		  <el-main>
		  			  <div style="float: right;">
		  				<BlogBanner></BlogBanner>
		  				<BlogDetails></BlogDetails>
		  				<BlogEssayList></BlogEssayList>
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
</template>

<script>
import BlogBanner from '../components/home/BlogBanner.vue'
import BlogDetails from '../components/home/BlogDetails.vue'
import BlogEssayList from '../components/home/BlogEssayList.vue'

export default {
  name: 'home',
  components: {
	BlogBanner,
	BlogDetails,
	BlogEssayList,
  }
}
</script>

<style>
#home {
  color: #2c3e50;
  min-width: 1200px; /* 最小宽度 */
}
    
    .el-aside {
	  width: 370px !important;
    }
    
</style>
