<template>
	<div id="BlogEssayDetails">
		<el-card class="box-card" style="min-height: 700px;">
		  <div slot="header" class="subject">
		    <span>{{ essay.subject }}</span>
		  </div>
		  <div v-html="essay.content"></div>
		</el-card>
	</div>
</template>

<script>
import axios from "axios"
	
	export default {
		data() {
			return {
				essayId: 1,
				essay: {},
			}
		},
		created() {
			this.info();
		},
		methods: {
			info: function() {
				axios.get("http://localhost:9000/essayInfo/info?essayId=" + this.$route.params.essayId)
				.then((response) => {
					this.essay = response.data.data;
				}).catch((err) => {
					console.error(err);
				})
			}
		}
	}
</script>

<style>
	#BlogEssayDetails {
		margin-left: 8%;
	}
	
	.subject {
		min-height: 50px;
		font-size: 30px;
		display: flex;
		align-items: center; /* 垂直居中对齐 */
	}
</style>