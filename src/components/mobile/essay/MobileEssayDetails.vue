<template>
	<div id="MobileEssayDetails">
		<el-card class="box-card" style="min-height: 700px;;">
		  <div slot="header">
		    <span class="mobile-subject">{{ essay.subject }}</span>
			<div class="details">
				<i class="el-icon-timer">{{ essay.releaseTime }}</i>
				<i class="el-icon-user-solid"> {{ author }}</i>
				<i class="el-icon-view"> 阅读({{ essay.readingQuantity }})</i>
				<!-- <i class="el-icon-chat-line-round">{{ chat }}</i> -->
			</div>
		  </div>
		  <div v-html="essay.content" class="mobile-htmlText"></div>
		</el-card>
	</div>
</template>

<script>
import axios from "axios";
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css'; // 选择一个适合你项目的样式
import backendUrl from '@/config/globalConfig';
	
	export default {
		data() {
			return {
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
				axios.get(backendUrl + "/essayInfo/info?essayId=" + this.$route.params.essayId)
				.then((response) => {
					this.essay = response.data.data;
				}).catch((err) => {
					console.error(err);
				})
			},
			readEssay: function(val) {
				axios.get(backendUrl + "/essayInfo/readEssay?essayId=" + val)
				.then((response) => {
					console.log(response);
				}).catch((err) => {
					console.error(err);
				})
			}
		}
	}
</script>

<style scoped>
	#MobileEssayDetails {
	}
	
	/deep/ .el-card {
		margin-top: 10px;
	}
	
	/deep/ .mobile-subject {
		min-height: 50px;
		font-size: 25px;
		display: flex;
	}
	
	/deep/ .mobile-htmlText {
		font-size: 3vw;
		max-width: 100%;
	}

	/deep/ .mobile-htmlText img {
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
	
	/deep/ .mobile-htmlText ul {
	  list-style-type: none;
	  padding-left: 0;
	}
	
	/deep/ .mobile-htmlText ul li {
	  margin: 0 0 2px;
	  padding-left: 24px;
	}
	
	/deep/ .mobile-htmlText ul ul {
	  padding-left: 24px;
	}
	
	/deep/ .mobile-htmlText a {
	  text-decoration: none;
	  color: #0077cc;
	}
	
	/deep/ .mobile-htmlText a:hover {
	  /* text-decoration: underline; */
	  color: #0055aa;
	}
	
	/deep/ .mobile-htmlText img {
		max-width: 90vw;
		height: auto;
	}
	
</style>