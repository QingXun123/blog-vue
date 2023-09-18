<template>
	<div id="BlogDate">
		<el-calendar v-model="value" style="border-radius: 5px; width: 100%;" class="calendar">
		</el-calendar>
	</div>
</template>

<script>
	 export default {
		data() {
		  return {
			value: new Date()
		  }
		}
	  }
</script>

<style>
	#BlogDate {
		margin-top: 20px;
		width: 350px;
		position: relative;
	}
	
	.el-calendar-table .el-calendar-day {
		box-sizing: border-box !important;
		padding: 4px !important;
		height: 30px !important;
	}
</style>