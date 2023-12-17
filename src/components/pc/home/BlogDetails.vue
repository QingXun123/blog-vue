<template>
	<div id="BlogDetails">
		<div class="specialContent">
			<el-card :body-style="{ padding: '0px' }" style="width: 250px;">
			  <img style="width: 250px;" src="https://th.bing.com/th/id/OIP.bVb769JBdzVZYuksxZ2Y-AHaEo?pid=ImgDet&rs=1" class="details-image">
			  <div style="padding: 14px;">
				<span>精选优质文章</span>
			  </div>
			</el-card>
			<el-card :body-style="{ padding: '0px' }" style="width: 250px;">
			  <img style="width: 250px;" src="https://th.bing.com/th/id/R.b0ea268fa1be279d112489ce83ad4696?rik=qItsh%2fBiy33hlg&riu=http%3a%2f%2fwww.quazero.com%2fuploads%2fallimg%2f140303%2f1-140303215009.jpg&ehk=S6PLWamt%2bMzQV8uO9ugcU5d5M19BpXtCpNz2cRJ7q9M%3d&risl=&pid=ImgRaw&r=0" class="details-image">
			  <div style="padding: 14px;">
				<span>提供优质服务</span>
			  </div>
			</el-card>
			<el-card :body-style="{ padding: '0px' }" style="width: 250px;">
			  <img style="width: 250px;" src="https://th.bing.com/th/id/R.b61e85948514dde6c8f2997871c60766?rik=WSmrFRL1fzIM2A&riu=http%3a%2f%2fpic1.bbzhi.com%2ffengjingbizhi%2fdiqiuguibaodachicunziranfengjingbizhijingxuandiyiji%2fnature_2008_landscape_1680_desktop_01_20183_11.jpg&ehk=UHw5ouJjdlJ4utvTAdWd8UZTuIpkI%2fMSeyoP%2fjtTbpQ%3d&risl=&pid=ImgRaw&r=0" class="details-image">
			  <div style="padding: 14px;">
				<span>学习优质知识</span>
			  </div>
			</el-card>
		</div>
		<el-card class="box-card" style="width: 800px;">
		  <div slot="header" class="clearfix">
		    <span>【 置顶 】</span>
		  </div>
		  <div v-for="index in essayTopList.length" :key="index" class="textItem">
			<router-link :to="'/essay/' + essayTopList[index - 1].essayId" target="_self"> <!-- 设置跳转链接 -->
				<span class="custom-BlogDetails-link">{{ essayTopList[index - 1].subject }}</span>
			</router-link>
			<span  style="font-size: 12px; max-width: 70%; margin-left: 20px; color: gray;">
				<div v-html="truncateContent(essayTopList[index - 1].content, 150)" class="content"></div>
			</span>
		  </div>
		</el-card>
	</div>
</template>

<script>
import axios from 'axios';
	
	export default {
		data() {
			return {
				essayTopList: []
			};
		},
		created() {
			this.getFeaturedEssayList();
		},
		methods: {
			getFeaturedEssayList: function() {
				axios.get("http://api.blog.qxbase.com/essayInfo/getTopEssayList").then(
				(response) => {
					this.essayTopList = response.data.data;
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
	};
</script>

<style scoped>
	#BlogDetails {
		margin-top: 20px;
		border-radius: 5px;
		position: relative;
	}
	
	/deep/ .text {
	    font-size: 14px;
	  }
	  
	/deep/ .item {
	    margin-bottom: 18px;
	  }
	  
	/deep/ .details-image {
	  	width: 200px;
	  	height: 150px;
	  	display: block;
	  	position: relative;
	  	border-radius: 5px;
	  	object-fit: cover;
	    }
	
	/deep/ .clearfix:before,
	  .clearfix:after {
	    display: table;
	    content: "";
	  }
	/deep/ .clearfix:after {
	    clear: both
	  }
	
	/deep/ .specialContent {
		  display: flex; /* 使用Flex布局 */
		  gap: 25px;
		  padding-bottom: 10px;
	  }
	  
	  /* 自定义 router-link 样式 */
	/deep/ .custom-BlogDetails-link {
	    text-decoration: none; /* 移除默认的下划线 */
	    color: grey; /* 设置链接文本颜色 */
	    cursor: pointer; /* 将鼠标光标设置为手型 */
		font-size: 15px;
		max-width: 200px;
		color: black;
	  }
	  
	/deep/ .custom-BlogDetails-link:hover {
	    color: #0055aa; /* 鼠标悬停时的文本颜色 */
	    /* 可以添加其他悬停效果，比如下划线 */
	    /* text-decoration: underline; */
	  }
	  
	  .textItem:first-child {
	      padding-top: 0; /* 或者直接移除 padding-top 样式 */
	  }
	  .textItem {
	  		  padding-top: 20px;
			  line-height: 25px;
	  }
	  
	  a {
	  	text-decoration: none;
	  }
	  
	  el-col {
	  	float: right;
	  }
</style>