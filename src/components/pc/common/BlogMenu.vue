<template>
	<div id="BlogMenu">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<el-menu-item index="1"><a href="/" target="_self">首页</a></el-menu-item>
			<el-submenu index="2">
				<template slot="title">独立页面</template>
				<el-menu-item index="2-1"><a href="https://github.com/QingXun123" target="_blank">GitHub仓库</a></el-menu-item>
				<el-menu-item index="2-2" disabled>在线聊天室</el-menu-item>
			</el-submenu>
			<el-menu-item index="3" disabled>旗下站点</el-menu-item>
			<el-menu-item index="4" disabled>关于我们</el-menu-item>
			<el-menu-item index="5">
				<el-input
				    placeholder="请输入内容"
				    prefix-icon="el-icon-search"
				    v-model="input2"
					@keyup.enter.native="redirectToSearch()">
				  </el-input>
			</el-menu-item>
			<div v-if="this.userName === '未登录'">
				<el-menu-item index="6" style="position: relative; left: 100%; width: 150px;">
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
				<el-submenu index="6" style="position: relative; left: 100%; width: 200px;">
					<template slot="title">
						<el-button type="text">
							<el-col :span="2">
								  <div class="demo-basic--circle">
									<div class="block"><el-avatar :size="40" :src="circleUrl"></el-avatar></div>
								  </div>
							</el-col>
							<a style="padding-left: 20px; position: relative; top: 0.8vw; color: darkgray;">{{ truncateContent(userName, 7) }}</a>
						</el-button>
					</template>
					<el-menu-item index="6-1" @click="" disabled>个人中心</el-menu-item>
					<el-menu-item index="6-2" @click="exit">退出登录</el-menu-item>
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
			circleUrl: require('@/assets/headImg.png'),
			sizeList: ["large", "medium", "small"],
			user: {},
			userName: '未登录',
			// loginHtml: '<form id="login-form"><label for="email">邮箱：</label><input type="email" id="email" placeholder="Enter your email" required><br><label for="password">密码：</label><input type="password" id="password" placeholder="Enter your password" required></form>',
	      }
	    },
		created() {
			this.here();
			this.getUser();
		},
		watch: {
		    // 监听子组件数据变化
		    user(newVal, oldVal) {
		      this.$emit('update:user', newVal); // 通过事件向父组件同步数据
		    }
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
				
				if (subject === '') {
					  this.$message({
						  'type': 'warning',
						  'message': '搜索内容不能为空'
					  })
					  return;
				}

				// 构建跳转链接
				const searchLink = `/search/${subject}`;
				// 获取 URL 中的哈希部分
				const hashFragment = window.location.hash;
				// console.log(hashFragment);
				// 如果你想获取路径中的特定部分，比如 /#/essay/10 中的 "essay"
				const pathSegments = hashFragment.split('/');
				console.log(pathSegments);
				const specificSegment = pathSegments[1];
				if (specificSegment === 'search') {
					// 获取完整的 URL
					  const currentURL = window.location.href;
					  
					var modifiedURL = currentURL.replace(/\/#\/.*$/, "/#");
					window.location.replace(modifiedURL + searchLink);
					location.reload();
					return;
				}
				// 使用路由导航到搜索页面
				this.$router.push(searchLink);
			},
			login: function() {
				localStorage.setItem('lastVisitedPage', window.location.href);
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
			async getUser() {
				axios.get("http://api.blog.qxbase.com/user/info", {
				  withCredentials: true ,// 开启跨域携带 Cookie
				}).then(
				(response) => {
					// if (response.data.code !== 200) {
					// 	this.$message({
					// 		message: response.data.err,
					// 		type: 'error'
					// 	});
					// }
					this.user = response.data.data;
					if (this.user) {
						this.userName = this.user.userName;
						this.$emit("userEvent", this.user);
					}
				}).catch((err) => {
					console.error(err);
				})
			},
			exit: function() {
				axios.get("http://api.blog.qxbase.com/user/logout", {
					withCredentials: true
				}).then((response) => {
					if (response.data.code === 200) {
						this.$message({
							type: 'success',
							message: '注销登录'
						})
						location.reload();
					} else {
						this.$message({
							type: 'error',
							message: '注销失败'
						})
					}
				}).catch((err) => {
					console.error(err);
				})
			},
	    }
	  }
</script>

<style scoped>
	#BlogMenu {
		position: relative;
		max-width: none;
		min-width: 1200px; /* 最小宽度 */
	}
	
	/deep/ .el-menu-demo {
		display: flex;
		justify-content: center;
	}
	
	a {
		text-decoration: none;
	}
	
	a:link,
	a:visited {
	  color: inherit; /* 使用继承的颜色，保持和默认状态相同 */
	  /* text-decoration: none; */
	}
	
	el-col {
		float: right;
	}
</style>