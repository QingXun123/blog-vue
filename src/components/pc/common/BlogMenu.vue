<template>
	<div id="BlogMenu">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<el-menu-item index="1"><a href="/" target="_self">首页</a></el-menu-item>
			<el-menu-item index="2" disabled>用户中心</el-menu-item>
			<el-menu-item index="3" disabled>关于我们</el-menu-item>
			<el-menu-item index="4" disabled>服务</el-menu-item>
			<el-menu-item index="5">
				<el-input
				    placeholder="请输入内容"
				    prefix-icon="el-icon-search"
				    v-model="input2"
					@keyup.enter.native="redirectToSearch()">
				  </el-input>
			</el-menu-item>
			<div v-if="!getUserData()">
				<el-menu-item index="6" style="position: absolute; right: 10%; width: 150px;">
					<el-button type="text" @click="login">
						<el-col :span="12">
							  <div class="demo-basic--circle">
								<div class="block"><el-avatar :size="40" :src="circleUrl"></el-avatar></div>
							  </div>
						</el-col>
						<a style="padding-left: 3px; position: relative; top: 0.8vw; color: darkgray;">未登录</a>
					</el-button>
				</el-menu-item>
			</div>
			<div v-else>
				<el-submenu index="6" style="position: absolute; right: 10%; width: 200px;">
					<template slot="title">
						<el-button type="text">
							<el-col :span="2">
								  <div class="demo-basic--circle">
									<div class="block"><el-avatar :size="40" :src="circleUrl"></el-avatar></div>
								  </div>
							</el-col>
							<a style="padding-left: 20px; position: relative; top: 0.8vw; color: darkgray;">{{ truncateContent(username, 7) }}</a>
						</el-button>
					</template>
					<el-menu-item index="6-1" @click="exit">退出登录</el-menu-item>
				</el-submenu>
			</div>
		</el-menu>
	</div>
</template>

<script>
import axios from 'axios'

	export default {
	    data() {
	      return {
			input2: "",
		    activeIndex: '',
			circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
			squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
			sizeList: ["large", "medium", "small"],
			username: '未登录',
			// loginHtml: '<form id="login-form"><label for="email">邮箱：</label><input type="email" id="email" placeholder="Enter your email" required><br><label for="password">密码：</label><input type="password" id="password" placeholder="Enter your password" required></form>',
	      }
	    },
		created() {
			this.here();
			this.getUser();
		},
	    methods: {
			here: function() {
				var path = this.$route.path.trim();
				if (path === '/') {
					this.activeIndex = '1';
				}
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			redirectToSearch: function() {
				// 获取用户输入的内容
				const subject = this.input2;

				// 构建跳转链接
				const searchLink = `/search/${subject}`;
				console.log(searchLink);
				// 使用路由导航到搜索页面
				this.$router.push(searchLink);
			},
			login: function() {
				window.location.href = '#/login';
				
				// this.$confirm(this.loginHtml, '登录', {
				//     dangerouslyUseHTMLString: true,
				//     confirmButtonText: '确认',
				//     cancelButtonText: '取消',
				//     showCancelButton: true,
				// 	center: true,
				//   }).then(({ value }) => {
				// 	  this.$message({
				// 		type: 'success',
				// 		message: '你的邮箱是: ' + value
				// 	  });
				// 	}).catch(() => {
				// 	  this.$message({
				// 		type: 'info',
				// 		message: '取消输入'
				// 	  });       
				// 	});
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
			getUser: function() {
				var user = this.getUserData();
				if (user) {
					this.username = user.userName;
				}
				console.log(user);
				console.log(user.userName);
			},
			exit: function() {
				this.clearUserData();
				location.reload();
			},
			// 从 localStorage 中获取用户数据
			getUserData: function() {
			  const storedUserData = localStorage.getItem('userData');
			  return storedUserData ? JSON.parse(storedUserData) : null;
			},
			// 在用户退出登录或其他需要清除用户数据的地方，清除 localStorage 中的数据
			clearUserData: function() {
			  localStorage.removeItem('userData');
			},
	    }
	  }
</script>

<style scoped>
	#BlogMenu {
		position: relative;
		max-width: none;
	}
	
	/deep/ .el-menu-demo {
		display: flex;
		justify-content: center;
	}
	
	a {
		text-decoration: none;
	}
	
	el-col {
		float: right;
	}
</style>