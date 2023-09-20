<template>
	<div id="disclaimer">
		
		<el-container>
		  <el-header>
			  <BlogMenu></BlogMenu>
		  </el-header>
		  <div style="margin: auto;">
			  <el-container>
			  		<el-container>
			  		  <el-main>
			  			  <div>
			  				<DisclaimerInfo></DisclaimerInfo>
			  			  </div>
			  		  </el-main>
			  		</el-container>
			  </el-container>
		  </div>
		  <el-footer>
			  <BlogNavigation></BlogNavigation>
		  </el-footer>
		</el-container>
	</div>
</template>

<script>
	import DisclaimerInfo from '../components/pc/disclaimer/DisclaimerInfo.vue';
	
	export default {
		name: "disclaimer",
		components: {
			DisclaimerInfo
		},
	}
</script>

<style>
	#disclaimer {
	  color: #2c3e50;
	  min-width: 1200px; /* 最小宽度 */
	}
	
	.page-form {
	}
</style>