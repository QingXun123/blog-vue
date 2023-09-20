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
			<el-menu-item index="1">首页</el-menu-item>
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
				<el-button @click="openSearch" icon="el-icon-search" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 1em; border: none;"></el-button>
		  </div>
		  
		</el-drawer>
	</div>
</template>

<script>
	export default {
	    data() {
	        return {
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
	      },
	  }
</script>

<style>
	#MobileMenu {
		background-color: white;
		height: 60px;
		display: flex;
	}
</style>