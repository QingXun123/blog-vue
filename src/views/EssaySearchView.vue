<template>
	<div id="search">
		<el-container>
		  <el-header>
			  <BlogMenu></BlogMenu>
		  </el-header>
		  <div style="width: 1200px; margin: auto;">
			  <el-container>
			  		<el-container>
			  		  <el-main>
			  			  <div style="float: right;">
			  				<BlogSearchDetails></BlogSearchDetails>
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
	import BlogSearchDetails from '../components/pc/search/BlogSearchDetails.vue'
	
	export default {
	  name: 'home',
	  components: {
		BlogSearchDetails,
	  },
	}
</script>

<style>
	#search {
	  color: #2c3e50;
	  min-width: 1200px; /* 最小宽度 */
	}
</style>