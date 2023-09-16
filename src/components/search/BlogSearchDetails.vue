<template>
	<div id="BlogSearchDetails">
		<el-row class="vertical-list">
			<el-col :span="8" v-for="index in essayList.length" :key="index">
				
				<el-card :body-style="{ padding: '0px'}">
				  <div class="card" style="padding: 14px;">
					  <router-link :to="'/essay/' + essayList[index - 1].essayId"> <!-- 设置跳转链接 -->
						<img :src="essayList[index - 1].img" class="image" style="min-width: 200px; max-width: 200px; min-height: 150px; max-height: 150px;">
					  </router-link>
						<div class="essay">
							<router-link :to="'/essay/' + essayList[index - 1].essayId"> <!-- 设置跳转链接 -->
								<h3 style="color: black;">{{ essayList[index-1].subject }}</h3>
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
	import axios from "axios";
	
	export default {
		data() {
			return {
				essayList: [],
				essayPage: {},
			}
		},
		created() {
			this.getEssayListLikeSubject(this.$route.params.subject);
		},
		methods: {
			getEssayListLikeSubject: function(val) {
				axios.post("http://localhost:9000/essayInfo/getEssayListLikeSubject", {
					  "current": 1,
					  "records": [
					    "ysql"
					  ],
					  "size": 5,
				})
				.then((response) => {
					this.essayPage = response.data.data;
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

<style>
	#BlogSearchDetails {
		margin-left: 8%;
	}
</style>