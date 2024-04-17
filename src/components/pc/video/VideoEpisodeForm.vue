<template>
	<div id="VideoEpisode">
		<el-card class="episode">
			
		</el-card>
	</div>
</template>

<script>
import backendUrls from '@/config/globalConfig'


export default {
	
}
</script>

<style scoped>

	#VideoEpisode {
	  background-size: cover;
	  background-repeat: no-repeat;
	  width: 100vw;
	  min-width: 1522px;
	  min-height: 200px;
	  display: grid;
	  place-items: center; /* 将子元素在容器中居中显示 */
	  background-color: whitesmoke;
	}
	
	#VideoEpisode::before {
	  content: '';
	  position: absolute;
	  width: 100vw;
	}
	
	.episode {
		
	}
</style>