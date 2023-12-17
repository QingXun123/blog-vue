<template>
	<div id="LoginForm">
		<el-card class="box-card loginCard" v-loading="loading">
			<div v-if="currentContent === 'login'">
				<div class="inputList">
					<h3>密码登录</h3>
					<el-input placeholder="请输入邮箱" v-model="email" style="top: 30px;" class="inputForm" clearable></el-input>
					<el-input placeholder="请输入密码" v-model="password" show-password style="top: 50px;" class="inputForm"></el-input>
					<el-button type="primary" style="top: 250px; position: absolute; width: 200px;" @click="login">登录</el-button>
				</div>
				<div class="extraList">
					<a style="font-size: 12px;" @click="changeContent('register')" class="clickable-link">账号注册</a>
					<a style="font-size: 12px;" class="clickable-link">找回密码</a>
				</div>
			</div>
			<div v-else-if="currentContent === 'register'">
				<div class="inputList2">
					<h3>账号注册</h3>
					<el-input placeholder="请输入昵称" v-model="username" class="inputForm" clearable></el-input>
					<el-input placeholder="请输入邮箱" v-model="email" style="top: 10px;" class="inputForm" clearable></el-input>
					<el-input placeholder="请输入密码" v-model="password" show-password style="top: 20px;" class="inputForm"></el-input>
					<div style="display: flex; align-items: center; justify-content: space-evenly; position: absolute; top: 240px;">
						<el-input placeholder="验证码" v-model="authCode" style="width: 100px; left: -25px;"></el-input>
						<img src="../../../assets/logo.png" style="width: 100px; height: 50px;"/>
					</div>
					<el-button type="primary" style="top: 300px; position: absolute; width: 200px;" @click="register">注册</el-button>
				</div>
				<div class="extraList">
					<a style="font-size: 12px;" @click="changeContent('login')" class="clickable-link">账号登录</a>
					<a style="font-size: 12px;" class="clickable-link">找回密码</a>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	import axios from 'axios'; // 导入axios库
	
	export default {
		data() {
			return {
				username: '',
				email: '',
				password: '',
				currentContent: 'login',
				loading: false,
				user: '',
				authCode: ''
			}
		},
		methods: {
			changeContent(content) {
				// 模拟加载状态，设置 loading 为 true，然后在一定时间后设为 false
				this.loading = true;
				setTimeout(() => {
					this.loading = false;
					// 点击按钮时修改状态变量
					this.currentContent = content;
				}, 500); // 2000 毫秒即 2 秒，你可以根据需要调整时间
			},
			login: function() {
				axios.post("http://42.193.243.59:9000/user/doLogin", {
					"email": this.email,
					"password": this.password,
				}, {
				  withCredentials: true // 开启跨域携带 Cookie
				}).then(
				(response) => {
					if (response.data.code !== 200) {
						this.$message({
						  message: response.data.message,
						  type: 'error'
						});
					} else {
						console.log(response);
						// 获取响应中的 Set-Cookie 头部信息
						const setCookieHeader = response.headers['set-cookie'];
						
						// 这里你可以对 setCookieHeader 进行处理，提取你需要的信息
						console.log(setCookieHeader);
						this.user = response.data.data;
						localStorage.setItem('userData', JSON.stringify(this.user));
						window.location.href = '#/';
						this.$message({
						  message: '登录成功',
						  type: 'success'
						});
					}
				}).catch((err) => {
					console.error(err);
				})
			},
			register: function() {
				axios.post("http://42.193.243.59:9000/user/register", {
					"userName": this.username,
					"email": this.email,
					"password": this.password,
				}).then(
				(response) => {
					if (response.data.data) {
						this.changeContent('login');
						this.$message({
						  message: '注册成功',
						  type: 'success'
						});
					} else {
						this.$message({
						  message: response.data.message,
						  type: 'error'
						});
					}
					this.user = response.data;
					console.log(this.user);
				}).catch((err) => {
					console.error(err);
				})
			}
		}
	};
</script>

<style scoped>
	#LoginForm {
		background-image: url('../../../assets/background.jpg');
		  background-size: cover;
		  background-repeat: no-repeat;
		  height: 100vh; /* 设置容器高度，保证背景图充满整个屏幕 */
		  width: 100vw;
	}
	
	#LoginForm::before {
	  content: '';
	  position: absolute;
	  height: 100vh; /* 设置容器高度，保证背景图充满整个屏幕 */
	  width: 100vw;
	  background-color: rgba(255, 255, 255, 0.5);
	}
	
	.loginCard {
		position: absolute;
		width: 350px;
		height: 400px;
		border-radius: 10px;
		top: 50%;
		right: 10%; /* 调整右边距 */
		transform: translateY(-50%); /* 上下居中 */
	}
	
	.inputList {
		height: 280px;
		display: flex;
		align-items: center; /* 垂直居中 */
		flex-direction:column;
	}
	
	.inputList2 {
		height: 330px;
		display: flex;
		align-items: center; /* 垂直居中 */
		flex-direction:column;
	}
	
	.inputForm {
		 width: 250px;
	}
	
	.extraList {
		display: flex;
		align-items: center; /* 垂直居中 */
		justify-content: space-evenly;
	}
	
	.clickable-link {
	  cursor: pointer; /* 设置鼠标样式为手型，表示可以点击 */
	}
	
	/* 鼠标悬浮时的效果 */
	.clickable-link:hover {
	  color: red; /* 可以根据需要修改悬浮时的颜色 */
	}
</style>