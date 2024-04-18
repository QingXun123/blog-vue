<template>
	<div id="MobileDetails">
<!--		<div class="mobileContent">-->
<!--			<el-card :body-style="{ padding: '0px' }" style="width: 30vw;">-->
<!--			  <img src="https://img1.baidu.com/it/u=3893389324,4043822814&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800" class="mobile-image">-->
<!--			  <div style="padding: 0px 10px;">-->
<!--				<span>精选优质文章</span>-->
<!--			  </div>-->
<!--			</el-card>-->
<!--			<el-card :body-style="{ padding: '0px' }" style="width: 30vw;">-->
<!--			  <img src="https://th.bing.com/th/id/R.b0ea268fa1be279d112489ce83ad4696?rik=qItsh%2fBiy33hlg&riu=http%3a%2f%2fwww.quazero.com%2fuploads%2fallimg%2f140303%2f1-140303215009.jpg&ehk=S6PLWamt%2bMzQV8uO9ugcU5d5M19BpXtCpNz2cRJ7q9M%3d&risl=&pid=ImgRaw&r=0" class="mobile-image">-->
<!--			  <div style="padding: 0px 10px;">-->
<!--				<span>提供优质服务</span>-->
<!--			  </div>-->
<!--			</el-card>-->
<!--			<el-card :body-style="{ padding: '0px' }" style="width: 30vw;">-->
<!--			  <img src="https://th.bing.com/th/id/R.b61e85948514dde6c8f2997871c60766?rik=WSmrFRL1fzIM2A&riu=http%3a%2f%2fpic1.bbzhi.com%2ffengjingbizhi%2fdiqiuguibaodachicunziranfengjingbizhijingxuandiyiji%2fnature_2008_landscape_1680_desktop_01_20183_11.jpg&ehk=UHw5ouJjdlJ4utvTAdWd8UZTuIpkI%2fMSeyoP%2fjtTbpQ%3d&risl=&pid=ImgRaw&r=0" class="mobile-image">-->
<!--			  <div style="padding: 0px 10px;">-->
<!--				<span>学习优质知识</span>-->
<!--			  </div>-->
<!--			</el-card>-->
<!--		</div>-->
		<el-card class="mobile-box-card">
		  <div slot="header" class="clearfix">
		    <span>【 置顶 】</span>
		  </div>
		  <div v-for="index in essayTopList.length" :key="index" class="textItem">
			<router-link :to="'/essay/' + essayTopList[index - 1].essayId" target="_self"> <!-- 设置跳转链接 -->
				<span class="custom-BlogDetails-link">{{ essayTopList[index - 1].subject }}</span>
			</router-link>
			<span  style="font-size: 12px; max-width: 70%; margin-left: 20px; color: gray;">
				<div v-html="truncateContent(essayTopList[index - 1].content, 120)" class="content"></div>
			</span>
		  </div>
		</el-card>
	</div>
</template>

<script>
import axios from 'axios';
import backendUrls from '@/config/globalConfig';
	
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
				axios.get(backendUrls.url + "/essayInfo/getTopEssayList").then(
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
	#MobileDetails {
		margin-top: 10px;
		border-radius: 5px;
		position: relative;
		line-height: 25px;
	}
	
	.mobileContent {
		display: flex; /* 使用Flex布局 */
		gap: 3vw;
		justify-content: center;
		padding-bottom: 10px;
	}
	
	.mobileContent span {
		font-size: 12px;
	}
	
	.mobile-image {
		width: 100%;
		height: 100%;
		position: relative;
	}
	
	/* 自定义 router-link 样式 */
	/deep/ .custom-BlogDetails-link {
	    text-decoration: none; /* 移除默认的下划线 */
	    color: grey; /* 设置链接文本颜色 */
	    cursor: pointer; /* 将鼠标光标设置为手型 */
		font-size: 15px;
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
		  padding-top: 10px;
	  }
	
	a {
		text-decoration: none;
	}
	
	el-col {
		float: right;
	}

</style>