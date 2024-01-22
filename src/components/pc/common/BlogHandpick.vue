<template>
	<div id="BlogHandpick" class="BlogNews">
		<el-table
		    :data="tableData"
		    stripe
		    style="width: 100%; empty-text='暂无数据';">
			  <el-table-column
			    prop="subject"
			    label="最新文章"
			    width="270">
				<!-- 使用 scoped-slot 渲染链接 -->
				<template slot-scope="scope">
				  <!-- 使用 router-link 渲染链接 -->
				  <router-link :to="'/essay/' + scope.row.essayId" class="custom-link">{{ scope.row.subject }}</router-link>
				</template>
			  </el-table-column>
		      <el-table-column
		        prop="releaseTime"
		        label="日期"
		        width="80">
		      </el-table-column>
		</el-table>
	</div>
</template>

<script>
import axios from "axios";

	export default {
		data() {
		  return {
			tableData: []
		  }
		},
		created() {
			this.getNewEssayList();
		},
		methods: {
			getNewEssayList: function() {
				axios.get("https://api.blog.qxbase.com/essayInfo/getNewEssayList").then(
				(response) => {
					const data = response.data.data;
					// 遍历数据，将 releaseTime 格式化为 MM-DD 格式
					data.forEach((item) => {
					  const date = new Date(item.releaseTime);
					  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1
					  const day = date.getDate().toString().padStart(2, '0');
					  item.releaseTime = `${month}-${day}`;
					});
					this.tableData = data;
				}).catch((err) => {
					console.error(err);
				})
			}
		}
	};
</script>

<style scoped>
	#BlogHandpick {
		position: relative;
	}
	
	.BlogNews {
		width: 350px;
		position: absolute;
		margin-top: 20px;
		/* 设置元素的边框圆角半径为 5 像素，使边角变得圆滑 */
		border-radius: 5px;
	}
	
	.el-table {
		border-radius: 5px;
	}
	
	.cell {
		line-height: 14px !important;
	}
	
	/* 自定义 router-link 样式 */
	.custom-link {
	  text-decoration: none; /* 移除默认的下划线 */
	  color: grey; /* 设置链接文本颜色 */
	  font-weight: bold; /* 设置链接文本粗体 */
	  cursor: pointer; /* 将鼠标光标设置为手型 */
	}
	
	.custom-link:hover {
	  color: #0055aa; /* 鼠标悬停时的文本颜色 */
	  /* 可以添加其他悬停效果，比如下划线 */
	  /* text-decoration: underline; */
	}
</style>