<template>
	<div id="MobileMenu">
		<!-- 菜单按钮 -->
		<el-button @click="openDrawer" icon="el-icon-menu" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; font-size: 1em; border: none;"></el-button>
	
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
	</div>
</template>

<script>
	export default {
	    data() {
	        return {
	          drawerVisible: false, // 控制菜单栏的显示与隐藏
	        };
	      },
	      methods: {
	        openDrawer() {
	          // 打开菜单栏
	          this.drawerVisible = true;
	        },
	      },
	  }
</script>

<style>
	#MobileMenu {
		background-color: white;
		height: 60px;
	}
</style>