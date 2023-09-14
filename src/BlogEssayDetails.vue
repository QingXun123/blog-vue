<template>
	<div id="BlogEssayDetails">
		  <el-row>
		    <el-col :span="24"><div class="grid-content bg-purple-dark"><BlogMenu></BlogMenu></div></el-col>
		  </el-row>
		  <el-row :gutter="2">
		    <el-col :span="16"><div class="grid-content bg-purple"><BlogBanner></BlogBanner></div></el-col>
		    <el-col :span="8"><div class="grid-content bg-purple-light"><BlogNews></BlogNews></div></el-col>
		  </el-row>
		  <el-row :gutter="4">
			<el-col :span="8"><div class="grid-content bg-purple-light"><BlogDate></BlogDate></div></el-col>
		  </el-row>
		  <el-row :gutter="2">
		    <el-col :span="8"><div class="grid-content bg-purple-light"><BlogIntroduction></BlogIntroduction></div></el-col>
		  </el-row>
		  <el-row>
		    <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
		  </el-row>
	
	</div>
</template>

<script>
import BlogMenu from './components/BlogMenu.vue'
import BlogBanner from './components/BlogBanner.vue'
import BlogNews from './components/BlogNews.vue'
import BlogDate from './components/BlogDate.vue'
import BlogDetails from './components/BlogDetails.vue'
import BlogEssayList from './components/BlogEssayList.vue'
import BlogIntroduction from './components/BlogIntroduction.vue'

export default {
  name: 'BlogEssayDetails',
  components: {
	BlogMenu,
	BlogBanner,
	BlogNews,
	BlogDate,
	BlogDetails,
	BlogEssayList,
	BlogIntroduction
  }
}
</script>

<style>
</style>