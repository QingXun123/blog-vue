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

<style scoped>
	#BlogDate {
		margin-top: 20px;
		width: 350px;
		position: relative;
	}
	
	/deep/ .el-calendar-table .el-calendar-day {
		box-sizing: border-box;
		padding: 4px;
		height: 30px;
	}
</style>