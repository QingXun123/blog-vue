<template>
	<div id="BlogEssayList">
		<el-row class="vertical-list">
			<el-col :span="8" v-for="index in essayList.length" :key="index">
				
				<el-card :body-style="{ padding: '0px'}">
				  <div class="card" style="padding: 14px;">
					  <router-link :to="'/essay/' + essayList[index - 1].essayId" target="_self"> <!-- 设置跳转链接 -->
						<img :src="essayList[index - 1].img ? essayList[index - 1].img : 'https://qxbase-1309929489.cos.ap-guangzhou.myqcloud.com/com/qxbase/blog/essay/thumbnail.png'" class="essay-image">
					  </router-link>
						<div class="essay">
							<router-link :to="'/essay/' + essayList[index - 1].essayId"> <!-- 设置跳转链接 -->
								<h3 class="custom-essay-link">{{ essayList[index-1].subject }}</h3>
							</router-link>
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
			</el-col>
		</el-row>
		<div class="block">
		  <el-pagination
		    @current-change="handleCurrentChange"
			:page-size="5"
		    layout="prev, pager, next"
		    :total="essayPage.total">
		  </el-pagination>
		</div>
	</div>
</template>

<script>
import { getPage } from '@/api/essay/essay'

	export default {
		data() {
			return {
				essayList: [],
				essayPage: {},
			}
		},
		created() {
			this.page(1);
		},
		methods: {
			page: function(val) {
        getPage({
					"orders": [
					    {
					      "asc": false,
					      "column": "releaseTime"
					    }
					  ],
					"current": val,
					"size": 5
				}).then(
				(response) => {
					this.essayPage = response.data;
					const records = this.essayPage.records;
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
			handleCurrentChange(val) {
				this.page(val);
			},
		}
	}
</script>

<style scoped>
	#BlogEssayList {
		position: relative;
	}
	
	/deep/ .el-pagination {
		margin-top: 20px;
		display: flex;
		justify-content: center; /* 水平居中 */
	}
	
	/deep/ .el-card {
		max-width: 800px;
		width: 100vw;
		margin-top: 10px;
	}
	
	/deep/ .essay-image {
		width: 200px;
		height: 150px;
		display: block;
		position: relative;
		border-radius: 5px;
		object-fit: cover;
	  }
	  
	/deep/ .details {
	  font-size: 13px;
	  color: #999;
	  white-space:nowrap;
	}
	
	/deep/ .content {
		font-size: 13px;
		color: #999;
		margin-top: 5px;
	}
	
	/deep/ .el-icon-user-solid,
	.el-icon-view,
	.el-icon-chat-line-round {
		margin-left: 15px;
	}
	
	/deep/ .card {
		display: flex;
	}
	
	/deep/ .card img {
		object-fit: contain;
	}
	
	/deep/ .essay {
		margin-left: 10px;
	}
	
	/deep/ .vertical-list {
	  display: flex;
	  flex-direction: column; /* 将子元素垂直排列 */
	}
	
	/* 自定义 router-link 样式 */
	/deep/ .custom-essay-link {
	  text-decoration: none; /* 移除默认的下划线 */
	  color: black; /* 设置链接文本颜色 */
	  cursor: pointer; /* 将鼠标光标设置为手型 */
	}
	
	/deep/ .custom-essay-link:hover {
	  color: #0055aa; /* 鼠标悬停时的文本颜色 */
	  /* 可以添加其他悬停效果，比如下划线 */
	  /* text-decoration: underline; */
	}
	
	a {
		text-decoration: none;
	}
	
	el-col {
		float: right;
	}
</style>