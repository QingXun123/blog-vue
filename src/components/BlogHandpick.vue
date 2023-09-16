<template>
	<div id="BlogHandpick" class="BlogNews">
		<el-table
		    :data="tableData"
		    stripe
		    style="width: 100%">
			  <el-table-column
			    prop="subject"
			    label="精选文章"
			    width="270">
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
			this.getFeaturedEssayList();
		},
		methods: {
			getFeaturedEssayList: function() {
				axios.get("http://localhost:9000/essayInfo/getFeaturedEssayList").then(
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
					console.log(this.tableData);
				}).catch((err) => {
					console.error(err);
				})
			}
		}
	};
</script>

<style>
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
</style>