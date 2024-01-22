<template>
	<div id="BlogEssayDetails">
		<el-card class="box-card" style="min-height: 700px;">
		  <div slot="header">
			  <el-skeleton :rows="3" animated :loading="loading" >
				<span class="subject">{{ essay.subject }}</span>
				<div class="details">
					<i class="el-icon-timer">{{ essay.releaseTime }}</i>
					<i class="el-icon-user-solid" style="margin-left: 10px;"> {{ author }}</i>
					<i class="el-icon-view" style="margin-left: 10px;"> 阅读({{ essay.readingQuantity }})</i>
					<!-- <i class="el-icon-chat-line-round">{{ chat }}</i> -->
				</div>
			</el-skeleton>
		  </div>
		  <el-skeleton :rows="10" animated :loading="loading" >
				<div v-html="essay.content" class="htmlText"></div>
			</el-skeleton>
		</el-card>
	</div>
</template>

<script>
import axios from "axios";
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css'; // 选择一个适合你项目的样式
	
	export default {
		data() {
			return {
				loading: true,
				essayId: 1,
				essay: {},
				author: "青旬",
			}
		},
		created() {
			this.readEssay(this.$route.params.essayId);
			this.info();
		},
		methods: {
			info: function() {
				axios.get("https://api.blog.qxbase.com/essayInfo/info?essayId=" + this.$route.params.essayId)
				.then((response) => {
					this.essay = response.data.data;
					this.loading = false;
				}).catch((err) => {
					console.error(err);
				})
			},
			readEssay: function(val) {
				axios.get("https://api.blog.qxbase.com/essayInfo/readEssay?essayId=" + val)
				.then((response) => {
					console.log("阅读成功");
				}).catch((err) => {
					console.error(err);
				})
			}
		}
	}
</script>

<style scoped>
	#BlogEssayDetails {
	}
	
	/deep/ .el-card {
		max-width: 800px;
		width: 100vw;
		margin-top: 10px;
	}
	
	/deep/ .subject {
		min-height: 50px;
		font-size: 30px;
		display: flex;
	}

	/deep/ .htmlText img {
		object-fit: scale-down;
	}
	
	/* 基本的表格样式 */
	/deep/ .table-box table {
	  border-collapse: collapse;
	  width: 100%;
	}
	
	/deep/ .table-box table, .table-box th, .table-box td {
	  border: 1px solid #ccc;
	}
	
	/* 表头样式 */
	/deep/ .table-box th {
	  background-color: #f2f2f2;
	  text-align: left;
	  padding: 8px;
	}
	
	/* 表格行样式（奇数行和偶数行） */
	/deep/ .table-box tr:nth-child(even) {
	  background-color: #f2f2f2;
	}
	
	/deep/ .table-box tr:nth-child(odd) {
	  background-color: #ffffff;
	}
	
	/* 单元格样式 */
	/deep/ .table-box td {
	  padding: 8px;
	  text-align: left;
	}
	
	/* 鼠标悬停时的行样式 */
	/deep/ .table-box tr:hover {
	  background-color: #e0e0e0;
	}
	
	/deep/ .htmlText ul {
	  list-style-type: none;
	  padding-left: 0;
	}
	
	/deep/ .htmlText ul li {
	  margin: 0 0 2px;
	  padding-left: 24px;
	}
	
	/deep/ .htmlText ul ul {
	  padding-left: 24px;
	}
	
	/deep/ .htmlText a {
	  text-decoration: none;
	  color: #0077cc;
	}
	
	/deep/ .htmlText a:hover {
	  /* text-decoration: underline; */
	  color: #0055aa;
	}
	
	/deep/ .htmlText img {
		max-width: 750px;
		height: auto;
	}

</style>