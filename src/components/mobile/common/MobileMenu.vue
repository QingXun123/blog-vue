<template>
	<div id="MobileMenu">
		<!-- 菜单按钮 -->
		<!-- <el-button @click="home" icon="el-icon-menu" class="menu"></el-button> -->
		<el-button @click="home" icon="el-icon-s-home" class="menu"></el-button>
		<!-- 搜索按钮 -->
		<el-button @click="openSearch" icon="el-icon-search" class="search"></el-button>
		<el-button type="text" @click="openDrawer" style="margin-right: 3vw;">
			<el-col :span="12">
				  <div class="demo-basic--circle">
					<el-avatar :size="40" :src="circleUrl"></el-avatar>
				  </div>
			</el-col>
		</el-button>
		<!-- 左侧弹出菜单栏 -->
		<el-drawer
		  title="菜单栏"
		  :visible.sync="drawerVisible"
		  direction="rtl"
		  :with-header="false"
		  :size="200">
		  <!-- 菜单内容 -->
		  <el-menu default-active="1">
			<el-menu-item index="1" @click="login" v-if="!isLogin()" style="height: 100px; display: flex; justify-content: center; align-items: center;">
				<a style="color: darkgray;">未登录</a>
				<el-col :span="12">
					  <div class="demo-basic--circle el-menu-head">
						<el-avatar :size="50" :src="circleUrl"></el-avatar>
					  </div>
				</el-col>
			</el-menu-item>
			<el-menu-item index="1" v-else style="height: 100px; display: flex; justify-content: center; align-items: center;">
				<a style="color: darkgray; margin-right: 5px;">{{ truncateContent(user.userName, 8) }}</a>
				<el-col :span="12">
					  <div class="demo-basic--circle el-menu-head">
						<el-avatar :size="50" :src="circleUrl"></el-avatar>
					  </div>
				</el-col>
			</el-menu-item>
			<el-menu-item index="2"><a href="/" target="_self">首页</a></el-menu-item>
			<el-submenu index="3">
				<template slot="title">独立页面</template>
				<el-menu-item index="3-1"><a href="https://github.com/QingXun123" target="_blank">GitHub仓库</a></el-menu-item>
				<el-menu-item index="3-2"><a @click="gotoChat">在线聊天室</a></el-menu-item>
			</el-submenu>
			<el-menu-item index="4" disabled>旗下站点</el-menu-item>
			<el-menu-item index="5" disabled>关于我们</el-menu-item>
			<el-menu-item index="6" v-if="isLogin()" @click="exit">退出登录</el-menu-item>
		  </el-menu>
		</el-drawer>
		
		<!-- 搜索抽屉 -->
		<el-drawer
		  title="搜索"
		  :visible.sync="searchDrawerVisible"
		  direction="ttb"
		  :with-header="false"
		  :size="70">
		  <div style="justify-content: space-between; display: flex; padding: 15px 0px; justify-content: center;">
			  <el-input
			      placeholder="请输入内容"
			      prefix-icon="el-icon-search"
			      v-model="input2"
			  			  style=" width: 80%; flex-direction: row; align-items: center;"
			  	@keyup.enter.native="redirectToSearchPhone()">
			    </el-input>
				<el-button v-if="thi" @click="redirectToSearchPhone()" icon="el-icon-search" class="intoSearch"></el-button>
		  </div>
		  
		</el-drawer>
	</div>
</template>

<script>
	import axios from 'axios'
	import backendUrls from '@/config/globalConfig';
	
	export default {
	    data() {
	        return {
				input2: "",
			  drawerVisible: false, // 控制菜单栏的显示与隐藏
	          searchDrawerVisible: false, // 控制搜索抽屉的显示与隐藏
			  circleUrl: require('@/assets/headImg.png'),
			  user: {},
	        };
	      },
		  created() {
		  	this.getUser();
		  },
		  watch: {
		      // 监听子组件数据变化
		      user(newVal, oldVal) {
		        this.$emit('update:user', newVal); // 通过事件向父组件同步数据
		      }
		  },
	      methods: {
			  home: function() {
				  window.location.href = '#/';
			  },
			  gotoChat() {
			  	window.location.href = '#/chat';
			  },
			  isLogin() {
				  return !(this.user === undefined || this.user === null || Object.keys(this.user).length === 0);
			  },
			  async getUser() {
			  	axios.get(backendUrls.url + "/user/info", {
			  	  withCredentials: true ,// 开启跨域携带 Cookie
			  	}).then(
			  	(response) => {
			  		// if (response.data.code !== 0) {
			  		// 	this.$message({
			  		// 		message: response.data.err,
			  		// 		type: 'error'
			  		// 	});
			  		// }
			  		this.user = response.data.data;
			  		if (this.user) {
			  			this.$emit("userEvent", this.user);
			  		}
			  	}).catch((err) => {
			  		console.error(err);
			  	})
			  },
			  login: function() {
				  localStorage.setItem('lastVisitedPage', window.location.href);
			  	window.location.href = '#/login';
			  },
			  exit: function() {
			  	axios.get(backendUrls.url + "/user/logout", {
			  		withCredentials: true
			  	}).then((response) => {
			  		if (response.data.code === 0) {
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
			  truncateContent(content, max) {
			    // 如果内容长度大于 max，则截取前 max 个字符并加上省略号
			    if (content.length > max) {
			  	  const plainText = content.replace(/<[^>]*>/g, '');
			  	  return plainText.substring(0, max) + '...';
			    }
			    // 否则返回原内容
			    return content;
			  },
	        openDrawer() {
	          // 打开菜单栏
	          this.drawerVisible = true;
	        },
			openSearch() {
			    // 打开搜索抽屉
			    this.searchDrawerVisible = true;
			  },
			  redirectToSearchPhone: function() {
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
			  // console.log(searchLink);
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
	      },
	  }
</script>

<style scoped>
	#MobileMenu {
		background-color: white;
		height: 60px;
		display: flex;
	}
	
	.el-menu-item a {
		text-decoration: none;
		color: black;
	}
	
	.el-menu-item a:hover {
	  color: #0055aa;
	}
	
	.menu, .search {
		width: 60px;
		height: 100%;
		align-items: center;
		justify-content: center;
		font-size: 1em;
		border: none;
	}
	
	.search {
		margin-left: auto;
	}
	
	.intoSearch {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1em;
		border: none;
	}
	
	.el-menu-head {
		float: right;
	}
</style>