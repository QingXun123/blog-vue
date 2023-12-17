<template>
	<div id="BlogComment">
		<el-card class="box-card custom-card" style="margin-top: 20px;">
			<el-card class="box-card comment">
				评论
			</el-card>
				<el-avatar :size="40" :src="circleUrl" style="margin-top: 10px;"></el-avatar>
			<el-card class="box-card comment-window">
				<el-input
				  type="textarea"
				  placeholder="请输入内容"
				  v-model="content"
				  maxlength="150"
				  show-word-limit
				  resize="none"
				  class="comment-input">
				</el-input>
				<el-card class="box-card comment-window-checked">
					<el-checkbox v-model="checked" class="checked">匿名发布</el-checkbox>
					<el-button 
					size="mini"
					:loading="loading"
					@click="commentClick"
					class="comment-button">发布</el-button>
				</el-card>
			</el-card>
			<div class="commentList">
				<!-- 评论 -->
				<div class="oneComment" v-for="index in commentList.length" :key="index">
					<el-avatar :size="40" :src="commentList[index-1].img === null ? circleUrl : commentList[index-1].img"></el-avatar>
					<a class="username">{{ commentList[index-1].userName }}</a>
					<div class="content">
						<a>{{ commentList[index-1].content }}</a>
					</div>
					<a class="createTime">{{ commentList[index-1].createTime }}</a>
					<i class="el-icon-thumb common-icon clickable-link" @click="like"></i>
					<a class="common-num">{{ commentList[index-1].like }}</a>
					<i class="el-icon-chat-dot-round common-icon clickable-link" @click="like"></i>
					<a class="common-num">12</a>
					<!-- 回复评论消息 -->
					<div class="nextCommentList">
						<div class="nextComment" v-for="index2 in 2" :key="index2">
							<el-avatar :size="40" :src="circleUrl"></el-avatar>
							<a class="username">青旬</a>
							<div class="content">
								<a>hhh</a>
							</div>
							<a class="createTime">2020-01-01 00:00:00</a>
							<i class="el-icon-thumb common-icon clickable-link" @click="like"></i>
							<a class="common-num">12</a>
							<i class="el-icon-chat-dot-round common-icon clickable-link" @click="like"></i>
							<a class="common-num">12</a>
						</div>
						<!-- 翻页选项 -->
						<el-pagination
						  @current-change="handleCurrentChange"
									:page-size="5"
						  layout="prev, pager, next"
						  :total="10"
						  small
						  class="nextPagination">
						</el-pagination>
					</div>
				</div>
				<!-- 翻页选项 -->
				<el-pagination
				  @current-change="handleCurrentChange"
							:page-size="5"
				  layout="prev, pager, next"
				  :total="10"
				  background
				  class="pagination">
				</el-pagination>
			</div>
		</el-card>
		
	</div>
</template>

<script>
	import axios from 'axios'; // 导入axios库
	
	export default {
		data() {
			return {
				content: '',
				checked: false,
				loading: false,
				circleUrl: require('@/assets/headImg.png'),
				commentList: [],
			}
		},
		created() {
			this.getCommentList();
		},
		methods: {
			commentClick: function() {
				if (this.loading != false) {
					return;
				}
				this.loading = true;
				setTimeout(() => {
					this.loading = false;
				}, 1500); // 2000 毫秒即 2 秒，你可以根据需要调整时间
				axios.post("http://api.blog.qxbase.com/essayComment/addComment", {
					"essayId": this.$route.params.essayId,
					"content": this.content,
					"userId": this.getUserId(),
					"type": this.checked ? 1 : 0,
				}, {
				  withCredentials: true, // 设置为 true，携带凭证
				}).then(
				(response) => {
					if (response.data.code !== 200) {
						console.log(response.data);
						this.$message({
						  message: response.data.message,
						  type: 'error'
						});
					} else {
						this.user = response.data.data;
						localStorage.setItem('userData', JSON.stringify(this.user));
						this.$message({
						  message: '发布成功',
						  type: 'success'
						});
					}
				}).catch((err) => {
					console.error(err);
				})
			},
			// 从 localStorage 中获取用户数据
			getUserId: function() {
			  const storedUserData = JSON.parse(localStorage.getItem('userData'));
			  return storedUserData.userId;
			},
			getCommentList: function() {
				axios.get("http://api.blog.qxbase.com/essayComment/getCommentByEssayId?essayId=" + this.$route.params.essayId).then(
				(response) => {
					this.commentList = response.data.data;
					console.log(this.commentList);
				}).catch((err) => {
					console.error(err);
				})
			},
			like: function() {
				
			},
		}
	}
</script>

<style scoped>
	#BlogComment {
		
	}
	
	.custom-card {
		width: 800px;
		min-height: 350px;
	}
	
	.comment {
		background-color: #eaeaea;
		width: 750px;
		height: 50px;
		display: flex;
		align-items: center;
		border-radius: 2px;
		box-shadow: none;
	}
	
	.comment-window {
		width: 700px;
		height: 130px;
		margin-left: 50px;
		position: relative;
		box-shadow: none;
		border: 2px solid #eaeaea;
		top: -40px
	}
	
	.comment-window-checked {
		width: 700px;
		height: 30px;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius: 0;
		background-color: #f2f2f2;
	}
	
	.head-portrait {
		font-size: 30px; /* 根据需求调整字体大小 */
	}
	
	.checked {
		position: absolute;
		top: 5px;
	}
	
	.comment-input {
		min-width: 700px;
		max-width: 700px;
		position: absolute;
		left: 0;
		top: 0;
		border-radius: 0;
	}
	
	/deep/ .el-textarea__inner {
		height: 99px;
		border-radius: 0;
	}
	
	.comment-button {
		position: absolute;
		top: 2px;
		right: 5px;
	}
	
	.commentList {
		margin-left: 20px;
		margin-right: 20px;
		/* border: 1px solid black; */
	}
	
	.oneComment {
		margin-bottom: 20px;
		min-height: 100px;
		/* border: 1px solid black; */
	}
	
	.username {
		position: absolute;
		margin-top: 5px;
		margin-left: 10px;
		font-size: 12px;
		font-weight: 700;
		color: darkgray;
	}
	
	.content {
		margin-left: 40px;
		margin-top: -10px;
		/* border: 1px solid black; */
	}

	.createTime {
		color: darkgray;
		margin-left: 40px;
		font-size: 12px;
		font-weight: 500;
	}
	
	.common-icon {
		margin-left: 10px;
	}
	
	.common-num {
		color: darkgray;
		font-size: 12px;
		font-weight: 500;
	}
	
	.clickable-link {
	  cursor: pointer; /* 设置鼠标样式为手型，表示可以点击 */
	}
	
	/* 鼠标悬浮时的效果 */
	.clickable-link:hover {
	  color: red; /* 可以根据需要修改悬浮时的颜色 */
	}
	
	.nextCommentList {
		margin-top: 20px;
		/* border: 1px solid black; */
	}
	
	.nextComment {
		margin-left: 50px;
		min-height: 80px;
		/* border: 1px solid black; */
	}
	
	.pagination {
		margin-top: -20px;
		margin-left: 250px;
	}
	
	.nextPagination {
		margin-left: 50px;
	}
</style>