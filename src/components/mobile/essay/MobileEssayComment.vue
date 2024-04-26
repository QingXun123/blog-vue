<template>
	<div id="MobileEssayComment">
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
					<el-checkbox v-model="checked" class="checked" disabled>匿名发布</el-checkbox>
					<el-button 
					size="mini"
					:loading="loading"
					@click="commentClick"
					class="comment-button">发布</el-button>
				</el-card>
			</el-card>
			<div class="commentList">
				<div>
					<!-- 评论 -->
					<div class="oneComment" v-for="(comment, index) in commentList" :key="index - 1">
						<el-avatar :size="40" :src="comment.img === null ? circleUrl : comment.img"></el-avatar>
						<a class="username">{{ comment.userName }}</a>
						<div class="content">
							<a>{{ comment.content }}</a>
						</div>
						<a class="createTime">{{ comment.createTime }}</a>
						<i class="el-icon-thumb common-icon clickable-link" @click="like(comment)" :style="{ color: comment.likeId ? 'red' : 'initial' }"></i>
						<a class="common-num">{{ comment.like }}</a>
						<i class="el-icon-chat-dot-round common-icon clickable-link" @click="replyCommentClick(comment.commentId, null)"></i>
						<a class="common-num">{{ nextCommentPage[comment.commentId].total }}</a>
						<el-dropdown v-if="isLogin() && user.userId === comment.userId" @command="dialogVisible = true; tempDeleteCommentId = comment.commentId;" trigger="click" size="mini" class="moreForm">
							<i class="el-icon-more-outline"></i>
						  <el-dropdown-menu slot="dropdown">
							<el-dropdown-item icon="el-icon-delete">删除</el-dropdown-item>
						  </el-dropdown-menu>
						</el-dropdown>
						<!-- 回复评论消息 -->
						<div class="nextCommentList">
							<div class="nextComment" v-for="(nextComment, index2) in nextCommentList[comment.commentId]" :key="index2 - 1">
								<el-avatar :size="40" :src="circleUrl"></el-avatar>
								<a class="username">{{ nextComment.userName }}<a> {{ nextComment.replyCommentId ? '' : '' }}</a></a>
								<div class="content">
									<a>{{ nextComment.content }}</a>
								</div>
								<a class="createTime">{{ nextComment.createTime }}</a>
								<i class="el-icon-thumb common-icon clickable-link" @click="like(nextComment)" :style="{ color: nextComment.likeId ? 'red' : 'initial' }"></i>
								<a class="common-num">{{ nextComment.like }}</a>
								<i class="el-icon-chat-dot-round common-icon clickable-link" @click="replyCommentClick(comment.commentId, nextComment.commentId)"></i>
								<a class="common-num">{{ nextComment.total }}</a>
								<el-dropdown v-if="isLogin() && user.userId === nextComment.userId" @command="dialogVisible = true; tempDeleteCommentId = nextComment.commentId;" trigger="click" size="mini" class="moreForm">
									<i class="el-icon-more-outline"></i>
								  <el-dropdown-menu slot="dropdown">
									<el-dropdown-item icon="el-icon-delete">删除</el-dropdown-item>
								  </el-dropdown-menu>
								</el-dropdown>
							</div>
							<!-- 翻页选项 -->
							<el-pagination
							  @current-change="nextPage($event, comment.commentId)"
										:page-size="5"
							  layout="prev, pager, next"
							  :total="nextCommentPage[comment.commentId].total"
							  small
							  class="nextPagination"
							  hide-on-single-page>
							</el-pagination>
						</div>
					</div>
					<div v-if="!commentPage.total" class="voidComment">
						<a style="color: darkgray; font-weight: 300;">暂无评论</a>
					</div>
					<!-- 翻页选项 -->
					<el-pagination
					  @current-change="page"
								:page-size="5"
					  layout="prev, pager, next"
					  :total="commentPage.total"
					  background
					  hide-on-single-page
					  class="pagination">
					</el-pagination>
				</div>
			</div>
		</el-card>
		 <el-dialog
		   title="提示"
		   :visible.sync="dialogVisible"
		   width="90%"
		   top="25vh">
		   <span>此操作将永久删除该评论, 是否继续?</span>
		   <span slot="footer" class="dialog-footer">
		     <el-button @click="dialogVisible = false">取 消</el-button>
		     <el-button type="primary" @click="deleteComment()">确 定</el-button>
		   </span>
		 </el-dialog>
		<el-drawer
		  title="回复评论"
		  :visible.sync="drawer"
		  direction="btt"
		  size="30%">
		  <div class="center-div">
			  <el-card class="box-card reply-comment-window">
			  	<el-input
			  	  type="textarea"
			  	  placeholder="请输入内容"
			  	  v-model="nextContent"
			  	  maxlength="150"
			  	  show-word-limit
			  	  resize="none"
			  	  class="comment-input">
			  	</el-input>
			  	<el-card class="box-card reply-comment-window-checked">
			  		<el-checkbox v-model="nextChecked" class="checked" disabled>匿名发布</el-checkbox>
			  		<el-button 
			  		size="mini"
			  		:loading="loading"
			  		@click="nextCommentClick"
			  		class="comment-button">发布</el-button>
			  	</el-card>
			  </el-card>
		  </div>
		</el-drawer>
		
	</div>
</template>

<script>
import {
  addComment, deleteComment,
  getCommentPage, getNextCommentPage,
  getCommentTotalByReplyCommentId,
  getDoubleNextCommentDoubleTotal, like
} from "@/api/essay/essay";
	
	export default {
		props: ['user'],
		data() {
			return {
				content: '',
				nextContent: '',
				checked: false,
				nextChecked: false,
				loading: false,
				circleUrl: require('@/assets/headImg.png'),
				commentList: [],
				commentPage: {},
				nextCommentList: [],
				nextCommentPage: [],
				drawer: false,
				tempCommentId: '',
				tempNextCommentId: '',
				tempDeleteCommentId: '',
				dialogVisible: false,
			}
		},
		created() {
			// this.page(1);
		},
		watch: {
			user: {
				immediate: true, // 立即执行一次
				handler(newVal, oldVal) {
					this.page(1);
				}
			}
		},
		methods: {
			isLogin: function() {
				return !(this.user === undefined || this.user === null || Object.keys(this.user).length === 0);
			},
			deleteComment: function() {
				deleteComment({
					"commentId": this.tempDeleteCommentId,
					"userId": this.user.userId,
				}, {
					withCredentials: true, // 设置为 true，携带凭证
				}).then((response) => {
					if (response.data.code !== 0) {
						this.$message({
							message: response.data,
							type: 'error'
						});
					}
					if (response.data) {
						this.$message({
							'type': 'success',
							'message': '删除成功'
						})
						this.tempDeleteCommentId = '';
						this.dialogVisible = false;
						this.page(1);
					} else {
						this.$message({
							'type': 'error',
							'message': '删除失败'
						})
					}
				}).catch((error) => {
					console.log(error);
				});
			},
			commentClick: function() {
				this.hint();
				if (this.loading != false) {
					return;
				}
				this.loading = true;
				setTimeout(() => {
					this.loading = false;
				}, 1500); // 2000 毫秒即 2 秒，你可以根据需要调整时间
				addComment({
					"essayId": this.$route.params.essayId,
					"content": this.content,
					"userId": this.user.userId,
					"type": this.checked ? 1 : 0,
				}, {
				  withCredentials: true, // 设置为 true，携带凭证
				}).then(
				(response) => {
					if (response.data.code !== 0) {
						console.log(response.data);
						this.$message({
						  message: response.data.message,
						  type: 'error'
						});
					} else {
						// const comment = response.data;
						// localStorage.setItem('userData', JSON.stringify(comment));
						this.content = '';
						// this.commentList.unshift({
						// 	'content': comment.content,
						// 	'createTime': comment.createTime,
						// 	'essayId': comment.essayId,
						// 	'like': comment.like,
						// 	'userId': comment.userId,
						// 	'type': comment.type,
						// 	'replyCommentId': comment.replyCommentId,
						// 	'replySuperCommentId':comment.replySuperCommentId,
						// })
						this.page(1);
						this.$message({
						  message: '发布成功',
						  type: 'success'
						});
					}
				}).catch((err) => {
					console.error(err);
				})
			},
			nextCommentClick: function() {
				if (this.loading != false) {
					return;
				}
				this.loading = true;
				setTimeout(() => {
					this.loading = false;
				}, 1500); // 2000 毫秒即 2 秒，你可以根据需要调整时间
				addComment({
					"essayId": this.$route.params.essayId,
					"content": this.nextContent,
					"userId": this.user.userId,
					"type": this.nextChecked ? 1 : 0,
					'replySuperCommentId': this.tempCommentId,
					'replyCommentId': this.tempNextCommentId,
				}, {
				  withCredentials: true, // 设置为 true，携带凭证
				}).then(
				(response) => {
					if (response.data.code !== 0) {
						console.log(response.data);
						this.$message({
						  message: response.data.message,
						  type: 'error'
						});
					} else {
						// const comment = response.data;
						// localStorage.setItem('userData', JSON.stringify(comment));
						this.nextContent = '';
						this.page(1);
						this.$message({
						  message: '发布成功',
						  type: 'success'
						});
						this.drawer = false;
						this.replySuperCommentId = '';
						this.replyCommentId = '';
					}
				}).catch((err) => {
					console.error(err);
				})
			},
			page: function(val) {
				console.log("nnn");
        getCommentPage({
					"orders": [
						{
						  "asc": false,
						  "column": "createTime"
						}
					  ],
					"current": val,
					"size": 5,
					"records": [
					  this.$route.params.essayId,
					  this.user.userId
					]
				}).then(
				(response) => {
					this.commentPage = response.data;
					console.log(this.commentPage);
					const records = this.commentPage.records;
					this.commentList = records;
					for (let i = 0; i < this.commentList.length; i++) {
					  let commentId = this.commentList[i].commentId;
            getNextCommentPage({
						"orders": [
							{
							  "asc": true,
							  "column": "createTime"
							}
						  ],
						"current": 1,
						"size": 5,
						"records": [
						  commentId,
						  this.user.userId
						]
					  }).then(
					  (response) => {
						// this.nextCommentPage[commentId] = response.data;
						this.$set(this.nextCommentPage, commentId, response.data);
						const records = this.nextCommentPage[commentId].records;
						records.forEach((item) => {
							// 获取回复的回复总数
              getCommentTotalByReplyCommentId(item.commentId).then(
							(response) => {
								if (response.data.code !== 0) {
									this.$message({
										message: response.data,
										type: 'error'
									});
								}
								// item.total = response.data;
								this.$set(item, 'total', response.data);
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
        getNextCommentPage({
					"orders": [
					    {
					      "asc": true,
					      "column": "createTime"
					    }
					  ],
					"current": val,
					"size": 5,
					"records": [
					  commentId,
					  this.user.userId
					]
				}).then(
				(response) => {
					const temp = response.data;
					// this.nextCommentPage[temp.replySuperCommentId] = temp;
					this.$set(this.nextCommentPage, temp.replySuperCommentId, temp);
					console.log("test"+ temp[0]);
					const records = this.nextCommentPage[temp.replySuperCommentId].records;
					records.forEach((item) => {
						// 获取回复的回复总数
            getDoubleNextCommentDoubleTotal(item.commentId).then(
						(response) => {
							if (response.data.code !== 0) {
								this.$message({
									message: response.data,
									type: 'error'
								});
							}
							// item.total = response.data;
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
			like: function(comment) {
				if (this.hint()) {
					return;
				}
				if (!comment.likeId) {
          like({
						'userId': this.user.userId,
						'commentId': comment.commentId
					}, {
						withCredentials: true, // 设置为 true，携带凭证
					}).then((response) => {
						// console.log(response.data);
						this.$message({
							'type': 'success',
							'message': "点赞成功",
						})
						comment.like++;
						comment.likeId = !comment.likeId;
					}).catch((error) => {
						console.log(error);
						this.$message({
							'type': 'error',
							'message': response.data
						})
					})
				} else {
          dislike({
						'userId': this.user.userId,
						'commentId': comment.commentId
					}).then((response) => {
						// console.log(response.data);
						this.$message({
							'type': 'success',
							'message': "取消点赞",
						})
						comment.like--;
						comment.likeId = !comment.likeId;
					}).catch((error) => {
						console.log(error);
						this.$message({
							'type': 'error',
							'message': response.data
						})
					})
				}
			},
			hint: function() {
				console.log(this.user.userName);
				if (this.user.userName != null || this.user.userName != undefined) {
					return false;
				}
				this.$message({
					'type': 'warning',
					'message': '您还未登录'
				});
				setTimeout(() => {
					localStorage.setItem('lastVisitedPage', window.location.href);
					window.location.href = '#/login';
				}, 1500);
				return true;
			},
			replyCommentClick: function(tempCommentId, tempNextCommentId) {
				if (this.hint()) {
					return;
				}
				this.drawer = true;
				this.tempCommentId = tempCommentId;
				this.tempNextCommentId = tempNextCommentId;
			}
		}
	}
</script>

<style scoped>
	#MobileEssayComment {
		
	}
	
	.custom-card {
		min-height: 350px;
	}
	
	.comment {
		background-color: #eaeaea;
		height: 50px;
		display: flex;
		align-items: center;
		border-radius: 2px;
		box-shadow: none;
	}
	
	.comment-window {
		height: 130px;
		margin-left: 50px;
		position: relative;
		box-shadow: none;
		border: 2px solid #eaeaea;
		top: -40px
	}
	
	.comment-window-checked {
		width: 75vw;
		height: 30px;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius: 0;
		background-color: #f2f2f2;
	}
	
	.reply-comment-window-checked {
		width: 100vw;
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
/* 	.clickable-link:hover {
	  color: red;
	} */
	
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
	
	.center-div {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.reply-comment-window {
		width: 700px;
		height: 130px;
		position: relative;
		box-shadow: none;
		border: 2px solid #eaeaea;
	}
	
	.voidComment {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.moreForm {
		float: right;
		cursor: pointer; /* 设置鼠标样式为手型，表示可以点击 */
	}
</style>