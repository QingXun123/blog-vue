<template>
	<div id="BlogDetails">
		<div class="specialContent">
			<el-card :body-style="{ padding: '0px' }" style="width: 250px;">
			  <img style="width: 250px;" src="https://th.bing.com/th/id/OIP.bVb769JBdzVZYuksxZ2Y-AHaEo?pid=ImgDet&rs=1" class="image">
			  <div style="padding: 14px;">
				<span>文章一</span>
			  </div>
			</el-card>
			<el-card :body-style="{ padding: '0px' }" style="width: 250px;">
			  <img style="width: 250px;" src="https://th.bing.com/th/id/R.b0ea268fa1be279d112489ce83ad4696?rik=qItsh%2fBiy33hlg&riu=http%3a%2f%2fwww.quazero.com%2fuploads%2fallimg%2f140303%2f1-140303215009.jpg&ehk=S6PLWamt%2bMzQV8uO9ugcU5d5M19BpXtCpNz2cRJ7q9M%3d&risl=&pid=ImgRaw&r=0" class="image">
			  <div style="padding: 14px;">
				<span>文章二</span>
			  </div>
			</el-card>
			<el-card :body-style="{ padding: '0px' }" style="width: 250px;">
			  <img style="width: 250px;" src="https://th.bing.com/th/id/R.b61e85948514dde6c8f2997871c60766?rik=WSmrFRL1fzIM2A&riu=http%3a%2f%2fpic1.bbzhi.com%2ffengjingbizhi%2fdiqiuguibaodachicunziranfengjingbizhijingxuandiyiji%2fnature_2008_landscape_1680_desktop_01_20183_11.jpg&ehk=UHw5ouJjdlJ4utvTAdWd8UZTuIpkI%2fMSeyoP%2fjtTbpQ%3d&risl=&pid=ImgRaw&r=0" class="image">
			  <div style="padding: 14px;">
				<span>文章三</span>
			  </div>
			</el-card>
		</div>
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span>【 置顶 】</span>
		  </div>
		  <div v-for="index in essayTopList.length" :key="index" class="text item">
			<span style="font-size: 15px; max-width: 200px;">{{ essayTopList[index - 1].subject }}</span>
			<span  style="font-size: 12px; max-width: 70%; margin-left: 20px; color: gray"> {{ essayTopList[index - 1].content }}</span>
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
				axios.get("http://localhost:9000/essayInfo/getTopEssayList").then(
				(response) => {
					this.essayTopList = response.data.data;
				}).catch((err) => {
					console.error(err);
				})
			}
		}
	};
</script>

<style>
	#BlogDetails {
		margin-left: 8%;
		margin-top: 20px;
		border-radius: 5px;
	}
	
	.text {
	    font-size: 14px;
	  }
	
	  .item {
	    margin-bottom: 18px;
	  }
	
	  .clearfix:before,
	  .clearfix:after {
	    display: table;
	    content: "";
	  }
	  .clearfix:after {
	    clear: both
	  }
	
	  .box-card {
	    width: 500px;
	  }
	  
	  .specialContent {
		  display: flex; /* 使用Flex布局 */
		  gap: 25px;
	  }
	  
</style>