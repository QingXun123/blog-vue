<template>
	<div id="BlogNavigation">
		<el-card style="width: 100%; background-color: dimgray; color: white; text-align: center; height: 200px; font-size: 30px;">
			<p>关注我们，获取更多精彩内容！</p>
			<el-button type="info" plain>关注我们</el-button>
			<el-button type="info" plain>了解更多</el-button>
		</el-card>	
		<div class="record">
			<div style="text-align: center; margin-top: 20px; position: relative;"><a href="http://blog.qxbase.com/" target="_self" class="reference-link">© qxBase博客 | 软件分享 | 技术教程 | 致力于互联网行业 | qxBase.com</a></div>
			<p><a href="https://beian.miit.gov.cn/" target="_blank" class="reference-link">粤ICP备2023104763号</a><a href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030902004114" target="_blank" class="reference-link"><img src="https://qxbase-1309929489.cos.ap-guangzhou.myqcloud.com/logo01.6189a29f.png" style="width: 15px; height: 15px;"/>粤公网安备44030902004114号</a></p>
			<p>本站部分图片、文章来源于网络，版权归原作者所有，如有侵权，请联系我们删除。</p>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	
	#BlogNavigation {
		position: relative;
		max-width: none;
		min-width: 1200px; /* 最小宽度 */
	}
	
	#BlogNavigation .el-card {
		max-width: none;
	}
	
	#BlogNavigation .el-card.is-always-shadow {
	  box-sizing: border-box;
	}
	
	.record {
		width: 100%;
		height: 300px;
		background-color: white;
		text-align: center;
		font-size: 10px;
		position: absolute;
		line-height: 10px;
	}
	
	/* 自定义 router-link 样式 */
	.reference-link {
	  text-decoration: none; /* 移除默认的下划线 */
	  color: grey; /* 设置链接文本颜色 */
	  cursor: pointer; /* 将鼠标光标设置为手型 */
	  margin-left: 15px;
	}
	
	.reference-link:hover {
	  color: #0055aa; /* 鼠标悬停时的文本颜色 */
	  /* 可以添加其他悬停效果，比如下划线 */
	  /* text-decoration: underline; */
	}
</style>