<template>
	<div id="MobileMenu">
		<!-- 菜单按钮 -->
		<el-button @click="openDrawer" icon="el-icon-menu" style="width: 60px; height: 100%; align-items: center; justify-content: center; font-size: 1em; border: none;"></el-button>
		<!-- 搜索按钮 -->
		<el-button @click="openSearch" icon="el-icon-search" style="width: 60px; height: 100%; align-items: center; justify-content: center; font-size: 1em; border: none; margin-left: auto;"></el-button>
		
		<!-- 左侧弹出菜单栏 -->
		<el-drawer
		  title="菜单栏"
		  :visible.sync="drawerVisible"
		  direction="ltr"
		  :size="200">
		  <!-- 菜单内容 -->
		  <el-menu default-active="1">
			<el-menu-item index="1"><a href="/" target="_self">首页</a></el-menu-item>
			<el-menu-item index="2" disabled>用户中心</el-menu-item>
			<el-menu-item index="3" disabled>关于我们</el-menu-item>
			<el-menu-item index="4" disabled>服务中心</el-menu-item>
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
			  	@keyup.enter.native="redirectToSearch()">
			    </el-input>
				<el-button @click="redirectToSearch()" icon="el-icon-search" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 1em; border: none;"></el-button>
		  </div>
		  
		</el-drawer>
	</div>
</template>

<script>
	export default {
	    data() {
	        return {
				input2: "",
			  drawerVisible: false, // 控制菜单栏的显示与隐藏
	          searchDrawerVisible: false, // 控制搜索抽屉的显示与隐藏
	        };
	      },
	      methods: {
	        openDrawer() {
	          // 打开菜单栏
	          this.drawerVisible = true;
	        },
			openSearch() {
			    // 打开搜索抽屉
			    this.searchDrawerVisible = true;
			  },
			  redirectToSearch: function() {
			  // 获取用户输入的内容
			  const subject = this.input2;
			  
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
</style>