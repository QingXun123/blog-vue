<template>
	<div id="BlogComment">
		<el-card class="box-card custom-card" style="margin-top: 20px;">
			<el-card class="box-card comment">
				评论
			</el-card>
			<el-avatar icon="el-icon-user-solid" style="margin-top: 10px;"></el-avatar>
			<el-card class="box-card comment-window">
				<el-input
				  type="textarea"
				  placeholder="请输入内容"
				  v-model="textarea"
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
		</el-card>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				textarea: '',
				checked: false,
				loading: false
			}
		},
		methods: {
			commentClick: function() {
				if (this.loading != false) {
					return;
				}
				this.loading = true;
			},
		}
	}
</script>

<style scoped>
	#BlogComment {
		
	}
	
	.custom-card {
		width: 800px;
		height: 500px;
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
	
</style>