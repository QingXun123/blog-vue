<template>
	<div id="BlogEssayList">
		<el-row>
		    <el-card :body-style="{ padding: '0px'}">
		      <div class="card" style="padding: 14px;">
				<img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
					<div class="essay">
						<h3>好吃的汉堡</h3>
						<div class="details">
							<i class="el-icon-timer">{{ currentDate }}</i>
							<i class="el-icon-user-solid"> {{ author }}</i>
							<i class="el-icon-view"> 阅读({{ view }})</i>
							<i class="el-icon-chat-line-round">{{ chat }}</i>
						</div>
						<a class="content">博客内容捏~</a>
					</div>
			  </div>
		    </el-card>
		</el-row>
		<div class="block">
		  <el-pagination
		    layout="prev, pager, next"
		    :total="100">
		  </el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentDate: "2022-01-01",
				total: 1,
				author: "青旬",
				view: 10,
				chat: 2
			}
		}
	}
</script>

<style>
	#BlogEssayList {
		margin-left: 8%;
		position: relative;
	}
	
	.el-pagination {
		margin-top: 20px;
		margin-left: 25%;
	}
	
	.el-card {
		width: 800px;
		margin-top: 10px;
	}
	
	.image {
		width: 200px;
		height: 150px;
		display: block;
		position: relative;
		border-radius: 5px;
	  }
	  
	.details {
	  font-size: 13px;
	  color: #999;
	  white-space:nowrap;
	}
	
	.content {
		font-size: 13px;
		color: #999;
		margin-top: 5px;
	}
	
	.el-icon-user-solid,
	.el-icon-view,
	.el-icon-chat-line-round {
		margin-left: 8px;
	}
	
	.card {
		display: flex;
	}
	
	.essay {
		margin-left: 10px;
	}
	
</style>