<template>
	<div id="BlogIntroduction">
		<el-card class="Introduction-card">
		  <div slot="header" class="clearfix">
		    <span style="font-size: 20px; color: red;">欢迎来到 qxBase博客</span>
		  </div>
		  <div class="text item">
		    我们的目标是为您提供有关计算机科学和实用业务问题的清晰、实用和有趣的信息。请随时浏览我们的博客，参与我们的社区，与我们分享您的想法和反馈。我们致力于计算机和实用业务解决方案的分享
		  </div>
		</el-card>
	</div>
</template>

<script>
</script>

<style scoped>
	#BlogIntroduction {
		padding-top: 10px;
		position: relative;
	}
	
	/deep/ .Introduction-card {
		width: 350px;
	}
	
	.text {
		line-height: 25px;
	}
	
	.item {
	    margin-bottom: 18px;
		font-size: 15px;
		font-weight: lighter;
	  }
</style>