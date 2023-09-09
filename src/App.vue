<template>
  <div id="app">
		<BlogMenu></BlogMenu>
  </div>
</template>

<script>
import BlogMenu from './components/BlogMenu.vue'

export default {
  name: 'App',
  components: {
	BlogMenu
  }
}
</script>

<style>
#app {
  color: #2c3e50;
}
</style>
