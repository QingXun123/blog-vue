<template>
	<div id="BlogEssayList">
		<el-row class="vertical-list">
			<el-col :span="8" v-for="index in essayList.length" :key="index">
				<router-link :to="'/essay/' + essayList[index - 1].essayId"> <!-- 设置跳转链接 -->
					<el-card :body-style="{ padding: '0px'}">
					  <div class="card" style="padding: 14px;">
						<img :src="essayList[index - 1].img" class="image" style="min-width: 200px; max-width: 200px; min-height: 150px; max-height: 150px;">
							<div class="essay">
								<h3>{{ essayList[index-1].subject }}</h3>
								<div class="details">
									<i class="el-icon-timer">{{ essayList[index-1].releaseTime }}</i>
									<i class="el-icon-user-solid"> {{ essayList[index-1].userName }}</i>
									<i class="el-icon-view"> 阅读({{ essayList[index-1].readingQuantity }})</i>
									<!-- <i class="el-icon-chat-line-round">{{ chat }}</i> -->
								</div>
								<div v-html="truncateContent(essayList[index-1].content, 170)" class="content"></div>
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
					const data = response.data.data;
					data.forEach((item) => {
						const date = new Date(item.releaseTime);
						const year = date.getFullYear();
						const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1
						const day = date.getDate().toString().padStart(2, '0');
						item.releaseTime = `${year}-${month}-${day}`;
					});
					this.essayList = data;
				}).catch((err) => {
					console.error(err);
				})
			},
			truncateContent(content, max) {
			  // 如果内容长度大于 max，则截取前 max 个字符并加上省略号
			  if (content.length > max) {
				  const plainText = content.replace(/<[^>]*>/g, '');
				  return plainText.substring(0, max) + '...';
			  }
			  // 否则返回原内容
			  return content;
			},
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
		margin-left: 15px;
	}
	
	.card {
		display: flex;
	}
	
	.card img {
		object-fit: contain;
	}
	
	.essay {
		margin-left: 10px;
	}
	
	.vertical-list {
	  display: flex;
	  flex-direction: column; /* 将子元素垂直排列 */
	}
	
</style>