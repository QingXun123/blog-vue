<template>
	<div id="BlogNews" class="BlogNews">
		<el-table
		    :data="tableData"
		    stripe
		    style="width: 100%">
			  <el-table-column
			    prop="subject"
			    label="最新文章"
			    width="270">
			  </el-table-column>
		      <el-table-column
		        prop="date"
		        label="日期"
		        width="80">
		      </el-table-column>
		</el-table>
	</div>
</template>

<script>

export default {
  data() {
	  return {
		tableData: [{
			subject: '标题1',
			date: '05-02'
		}, {
			subject: '标题2',
			date: '05-03'
		}, {
			subject: '标题3',
			date: "05-03"
		}, {
			subject: '标题4',
			date: "05-04"
		}, {
			subject: '标题5',
			date: "05-05"
		}]
	  }
	}
  // 组件的其他代码
}
</script>

<style>
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