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
<!-- 			<el-menu-item index="6">
				<el-col :span="12">
				      <div class="demo-basic--circle">
				        <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
				      </div>
				</el-col>  
			</el-menu-item> -->
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
	      }
	    },
		created() {
			this.here();
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
			console.log(subject);
			// 使用路由导航到搜索页面
			this.$router.push(searchLink);
			},
	    }
	  }
</script>

<style>
	#BlogMenu {
		position: relative;
		max-width: none;
	}
	
	.el-menu-demo {
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