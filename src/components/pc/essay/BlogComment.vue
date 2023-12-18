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
				<div class="oneComment" v-for="(comment, index) in commentList" :key="index - 1">
					<el-avatar :size="40" :src="comment.img === null ? circleUrl : comment.img"></el-avatar>
					<a class="username">{{ comment.userName }}</a>
					<div class="content">
						<a>{{ comment.content }}</a>
					</div>
					<a class="createTime">{{ comment.createTime }}</a>
					<i class="el-icon-thumb common-icon clickable-link" @click="like"></i>
					<a class="common-num">{{ comment.like }}</a>
					<i class="el-icon-chat-dot-round common-icon clickable-link" @click="like"></i>
					<a class="common-num">{{ nextCommentPage[comment.commentId].total }}</a>
					<!-- 回复评论消息 -->
					<div class="nextCommentList">
						<div class="nextComment" v-for="(nextComment, index2) in nextCommentList[comment.commentId]" :key="index2 - 1">
							<el-avatar :size="40" :src="circleUrl"></el-avatar>
							<a class="username">{{ nextComment.userName }}</a>
							<div class="content">
								<a>{{ nextComment.content }}</a>
							</div>
							<a class="createTime">{{ nextComment.createTime }}</a>
							<i class="el-icon-thumb common-icon clickable-link" @click="like"></i>
							<a class="common-num">{{ nextComment.like }}</a>
							<i class="el-icon-chat-dot-round common-icon clickable-link" @click="like"></i>
							<a class="common-num">{{ nextComment.total }}</a>
						</div>
						<!-- 翻页选项 -->
						<el-pagination
						  @current-change="nextHandleCurrentChange($event, comment.commentId)"
									:page-size="5"
						  layout="prev, pager, next"
						  :total="nextCommentPage[comment.commentId].total"
						  small
						  class="nextPagination"
						  v-if="nextCommentPage[comment.commentId].total > 5">
						</el-pagination>
					</div>
				</div>
				<!-- 翻页选项 -->
				<el-pagination
				  @current-change="handleCurrentChange"
							:page-size="5"
				  layout="prev, pager, next"
				  :total="commentPage.total"
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
				commentPage: {},
				nextCommentList: [],
				nextCommentPage: [],
			}
		},
		created() {
			this.page(1);
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
			page: function(val) {
				axios.post("http://localhost:9000/essayComment/getcommentPage", {
					"orders": [
					    {
					      "asc": false,
					      "column": "createTime"
					    }
					  ],
					"current": val,
					"size": 5,
					"records": [
					  this.$route.params.essayId
					]
				}).then(
				(response) => {
					this.commentPage = response.data.data;
					console.log(this.commentPage);
					const records = this.commentPage.records;
					records.forEach((item) => {
						const date = new Date(item.createTIme);
						const year = date.getFullYear();
						const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1
						const day = date.getDate().toString().padStart(2, '0');
						item.createTIme = `${year}-${month}-${day}`;
					});
					this.commentList = records;
					for (let i = 0; i < this.commentList.length; i++) {
					  let commentId = this.commentList[i].commentId;
					  axios.post("http://localhost:9000/essayComment/getNextCommentPage", {
					  	"orders": [
					  	    {
					  	      "asc": false,
					  	      "column": "createTime"
					  	    }
					  	  ],
					  	"current": val,
					  	"size": 5,
					  	"records": [
					  	  commentId
					  	]
					  }).then(
					  (response) => {
					  	// this.nextCommentPage[commentId] = response.data.data;
						this.$set(this.nextCommentPage, commentId, response.data.data);
					  	const records = this.nextCommentPage[commentId].records;
					  	records.forEach((item) => {
							// 获取回复的回复总数
							axios.get("http://localhost:9000/essayComment/getDoubleNextCommentDoubleTotal?commentId=" + item.commentId).then(
							(response) => {
								if (response.data.code !== 200) {
									this.$message({
										message: response.data.data,
										type: 'error'
									});
								}
								// item.total = response.data.data;
								this.$set(item, 'total', 0);
							}).catch((err) => {
								console.error(err);
							})
					  	});
					  	// this.nextCommentList[commentId] = records;
						this.$set(this.nextCommentList, commentId, records);
					  }).catch((err) => {
					  	console.error(err);
					  })
					}
				}).catch((err) => {
					console.error(err);
				})
			},
			nextPage: function(val, commentId) {
				axios.post("http://localhost:9000/essayComment/getNextCommentPage", {
					"orders": [
					    {
					      "asc": false,
					      "column": "createTime"
					    }
					  ],
					"current": val,
					"size": 5,
					"records": [
					  commentId
					]
				}).then(
				(response) => {
					const temp = response.data.data;
					// this.nextCommentPage[temp.replyCommentId] = temp;
					this.$set(this.nextCommentPage, temp.replyCommentId, temp);
					console.log("test"+ temp[0]);
					const records = this.nextCommentPage[temp.replyCommentId].records;
					records.forEach((item) => {
						// 获取回复的回复总数
						axios.get("http://localhost:9000/essayComment/getDoubleNextCommentDoubleTotal?commentId=" + item.commentId).then(
						(response) => {
							if (response.data.code !== 200) {
								this.$message({
									message: response.data.data,
									type: 'error'
								});
							}
							// item.total = response.data.data;
							this.$set(item, 'total', 0);
						}).catch((err) => {
							console.error(err);
						})
					});
					// this.nextCommentList[commentId] = records;
					this.$set(this.nextCommentList, commentId, records);
				}).catch((err) => {
					console.error(err);
				})
			},
			like: function() {
				
			},
			handleCurrentChange(val) {
				this.page(val);
			},
			nextHandleCurrentChange(val, commentId) {
				this.nextPage(val, commentId);
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