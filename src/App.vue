<template>
  <div id="app">
	  <el-row>
	    <el-col :span="24"><div class="grid-content bg-purple-dark"><BlogMenu></BlogMenu></div></el-col>
	  </el-row>
	  <el-row :gutter="2">
	    <el-col :span="14"><div class="grid-content bg-purple"><BlogBanner></BlogBanner></div></el-col>
	    <el-col :span="10"><div class="grid-content bg-purple-light"><BlogNews></BlogNews></div></el-col>
	  </el-row>
	  <el-row>
	    <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
	    <el-col :span="8"><div class="grid-content bg-purple-light"></div></el-col>
	  </el-row>
	  <el-row>
	    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
	    <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
	    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
	    <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
	  </el-row>
	  <el-row>
	    <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
	    <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
	    <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
	    <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
	    <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
	    <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
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

export default {
  name: 'App',
  components: {
	BlogMenu,
	BlogBanner,
	BlogNews
  }
}
</script>

<style>
#app {
  color: #2c3e50;
  min-width: 1350px; /* 最小宽度 */
}
</style>
