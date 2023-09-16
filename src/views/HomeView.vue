<template>
  <div id="home">
	  <el-row>
	    <el-col :span="24"><div class="grid-content bg-purple-dark"><BlogMenu></BlogMenu></div></el-col>
	  </el-row>
	  <el-row :gutter="2">
	    <el-col :span="16">
			<div class="grid-content bg-purple">
				<BlogBanner></BlogBanner>
				<BlogDetails></BlogDetails>
				<BlogEssayList></BlogEssayList>
			</div>
		</el-col>
	    <el-col :span="8">
			<div class="grid-content bg-purple-light">
				<BlogHandpick></BlogHandpick>
				<BlogDate></BlogDate>
				<BlogIntroduction></BlogIntroduction>
			</div>
		</el-col>
	  </el-row>
	  <el-row>
	    <el-col :span="24"><div class="grid-content bg-purple-dark"><BlogNavigation></BlogNavigation></div></el-col>
	  </el-row>

  </div>
</template>

<script>
import BlogBanner from '../components/home/BlogBanner.vue'
import BlogHandpick from '../components/home/BlogHandpick.vue'
import BlogDate from '../components/home/BlogDate.vue'
import BlogDetails from '../components/home/BlogDetails.vue'
import BlogEssayList from '../components/home/BlogEssayList.vue'
import BlogIntroduction from '../components/home/BlogIntroduction.vue'

export default {
  name: 'home',
  components: {
	BlogBanner,
	BlogHandpick,
	BlogDate,
	BlogDetails,
	BlogEssayList,
	BlogIntroduction,
  }
}
</script>

<style>
#home {
  color: #2c3e50;
  min-width: 1350px; /* 最小宽度 */
}
</style>
