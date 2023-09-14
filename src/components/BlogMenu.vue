<template>
	<div id="BlogMenu">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
		    <el-menu-item index="1"><a href="http://localhost:8080/" target="_blank">首页</a></el-menu-item>
			<el-menu-item index="2">用户中心</el-menu-item>
			<el-menu-item index="3">关于我们</el-menu-item>
			<el-menu-item index="4">服务</el-menu-item>
			<el-menu-item index="5">
				<el-select
				    v-model="value"
				    multiple
				    filterable
				    remote
				    reserve-keyword
				    placeholder="请输入关键词"
				    :remote-method="remoteMethod"
				    :loading="loading">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
			</el-menu-item>
			<el-menu-item index="6">
				<el-col :span="12">
				      <div class="demo-basic--circle">
				        <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
				      </div>
				</el-col>  
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
	        options: [],
	        value: [],
	        list: [],
	        loading: false,
	        states: ["Alabama", "Alaska", "Arizona",
	        "Arkansas", "California", "Colorado",
	        "Connecticut", "Delaware", "Florida",
	        "Georgia", "Hawaii", "Idaho", "Illinois",
	        "Indiana", "Iowa", "Kansas", "Kentucky",
	        "Louisiana", "Maine", "Maryland",
	        "Massachusetts", "Michigan", "Minnesota",
	        "Mississippi", "Missouri", "Montana",
	        "Nebraska", "Nevada", "New Hampshire",
	        "New Jersey", "New Mexico", "New York",
	        "North Carolina", "North Dakota", "Ohio",
	        "Oklahoma", "Oregon", "Pennsylvania",
	        "Rhode Island", "South Carolina",
	        "South Dakota", "Tennessee", "Texas",
	        "Utah", "Vermont", "Virginia",
	        "Washington", "West Virginia", "Wisconsin",
	        "Wyoming"],
			circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
			squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
			sizeList: ["large", "medium", "small"]
	      }
	    },
	    mounted() {
	      this.list = this.states.map(item => {
	        return { value: `value:${item}`, label: `label:${item}` };
	      });
	    },
	    methods: {
	      remoteMethod(query) {
	        if (query !== '') {
	          this.loading = true;
	          setTimeout(() => {
	            this.loading = false;
	            this.options = this.list.filter(item => {
	              return item.label.toLowerCase()
	                .indexOf(query.toLowerCase()) > -1;
	            });
	          }, 200);
	        } else {
	          this.options = [];
	        }
	      }
	    }
	  }
</script>

<style>
	#BlogMenu {
		
	}
	
	.el-menu-item {
		transform: translate(500px, 0);
	}
	
	a {
		text-decoration: none;
	}
	
	el-col {
		float: right;
	}
</style>