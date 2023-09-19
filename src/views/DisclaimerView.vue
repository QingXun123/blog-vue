<template>
	<div id="disclaimer">
		<div class='page-form'>
			<el-row>
			  <el-col :span="24"><div class="grid-content bg-purple-dark"><BlogMenu></BlogMenu></div></el-col>
			</el-row>
			<el-row :gutter="2">
			  <el-col :span="24"><div class="grid-content bg-purple-dark"><DisclaimerInfo></DisclaimerInfo></div></el-col>
			</el-row>
			<el-row>
			  <el-col :span="24"><div class="grid-content bg-purple-dark"><BlogNavigation></BlogNavigation></div></el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import DisclaimerInfo from '../components/disclaimer/DisclaimerInfo.vue';
	
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
	  min-width: 1350px; /* 最小宽度 */
	}
	
	.page-form {
	}
</style>