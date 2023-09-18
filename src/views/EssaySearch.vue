<template>
	<div id="search">
		<el-row>
		  <el-col :span="24"><div class="grid-content bg-purple-dark"><BlogMenu></BlogMenu></div></el-col>
		</el-row>
		<el-row :gutter="2">
		  <el-col :span="16">
					<div class="grid-content bg-purple">
						<BlogSearchDetails></BlogSearchDetails>
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
	import BlogHandpick from '../components/home/BlogHandpick.vue'
	import BlogDate from '../components/home/BlogDate.vue'
	import BlogIntroduction from '../components/home/BlogIntroduction.vue'
	import BlogSearchDetails from '../components/search/BlogSearchDetails.vue'
	
	export default {
	  name: 'home',
	  components: {
		BlogHandpick,
		BlogDate,
		BlogIntroduction,
		BlogSearchDetails,
	  },
	}
</script>

<style>
	#search {
	  color: #2c3e50;
	  min-width: 1350px; /* 最小宽度 */
	}
</style>