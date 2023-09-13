<template>
  <div id="app">
		<BlogMenu></BlogMenu>
		<BlogBanner></BlogBanner>
		<BlogNews></BlogNews>
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
}
</style>
