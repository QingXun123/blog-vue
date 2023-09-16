<template>
	<div id="BlogEssayList">
		<el-row class="vertical-list">
			<el-col :span="8" v-for="index in essayList.length" :key="index">
				<router-link :to="'/article/' + essayList[index - 1].id"> <!-- 设置跳转链接 -->
					<el-card :body-style="{ padding: '0px'}">
					  <div class="card" style="padding: 14px;">
						<img :src="essayList[index - 1].img" class="image">
							<div class="essay">
								<h3>{{ essayList[index-1].subject }}</h3>
								<div class="details">
									<i class="el-icon-timer">{{ essayList[index-1].releaseTime }}</i>
									<i class="el-icon-user-solid"> {{ author }}</i>
									<i class="el-icon-view"> 阅读({{ essayList[index-1].readingQuantity }})</i>
									<!-- <i class="el-icon-chat-line-round">{{ chat }}</i> -->
								</div>
								<a class="content">{{ essayList[index-1].content }}</a>
							</div>
					  </div>
					</el-card>
				</router-link>
			</el-col>
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
import axios from 'axios';

	export default {
		data() {
			return {
				essayList: [],
				currentDate: "2022-01-01",
				total: 1,
				author: "青旬",
				view: 10,
				chat: 2
			}
		},
		created() {
			this.page();
		},
		methods: {
			page: function() {
				axios.post("http://localhost:9000/essayInfo/page", {
					"current": 1,
					"size": 5
				}).then(
				(response) => {
					const records = response.data.data.records
					records.forEach((item) => {
						const date = new Date(item.releaseTime);
						const year = date.getFullYear();
						const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1
						const day = date.getDate().toString().padStart(2, '0');
						item.releaseTime = `${year}-${month}-${day}`;
					});
					this.essayList = records;
					
				}).catch((err) => {
					console.error(err);
				})
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
		object-fit: cover;
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
	
	.vertical-list {
	  display: flex;
	  flex-direction: column; /* 将子元素垂直排列 */
	}
	
</style>