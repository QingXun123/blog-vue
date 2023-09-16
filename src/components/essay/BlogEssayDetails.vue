<template>
	<div id="BlogEssayDetails">
		<el-card class="box-card" style="min-height: 700px;">
		  <div slot="header">
		    <span class="subject">{{ essay.subject }}</span>
			<div class="details">
				<i class="el-icon-timer">{{ essay.releaseTime }}</i>
				<i class="el-icon-user-solid"> {{ author }}</i>
				<i class="el-icon-view"> 阅读({{ essay.readingQuantity }})</i>
				<!-- <i class="el-icon-chat-line-round">{{ chat }}</i> -->
			</div>
		  </div>
		  <div v-html="essay.content" class="htmlText"></div>
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
				essayId: 1,
				essay: {},
				author: "青旬",
			}
		},
		created() {
			this.info();
		},
		methods: {
			info: function() {
				axios.get("http://localhost:9000/essayInfo/info?essayId=" + this.$route.params.essayId)
				.then((response) => {
					this.essay = response.data.data;
				}).catch((err) => {
					console.error(err);
				})
			}
		}
	}
</script>

<style>
	#BlogEssayDetails {
		margin-left: 8%;
	}
	
	.subject {
		min-height: 50px;
		font-size: 30px;
		display: flex;
	}

	.htmlText img {
		object-fit: scale-down;
	}
</style>