<template>
	<div class="BlogMenu">
		<nav>
		    <ul>
				<li><a href="/">首页</a></li>
				<li><a href="/user">用户中心</a></li>
				<li><a href="/about">关于我们</a></li>
				<li><a href="/services">服务</a></li>
			</ul>
		</nav>
	</div>
</template>

<script>
</script>

<style>
	.BlogMenu {
		/* 设置元素的高度为 10 像素 */
		height: 30px;
		/* 设置元素的行高为 10 像素，影响文本的垂直居中和行间距 */
		line-height: 25px;
		/* 设置元素的左右内边距为 20 像素，上下内边距为 0（不添加垂直内边距） */
		padding: 10px 10px;
		background-position: top center;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		display: flex;
		background-color: white;
	}
	
	nav ul {
	  list-style: none; /* 去除列表样式 */
		transform: translate(50%, 0px);
	}
	
	nav ul li {
	  display: inline; /* 设置列表项水平排列 */
	  margin-right: 20px; /* 设置右外边距为20像素，增加列表项之间的间距 */
	}
	
	nav ul li:last-child {
	  margin-right: 0; /* 最后一个列表项去除右外边距，避免多余的间距 */
	}
	
	nav ul li a {
	  text-decoration: none; /* 去除链接的下划线 */
	  font-weight: bold; /* 设置链接文字加粗 */
	}
	
	nav ul li a:hover {
	  text-decoration: underline; /* 鼠标悬停时显示下划线 */
	}
</style>