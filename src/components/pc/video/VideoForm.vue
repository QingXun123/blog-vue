<template>
	<div id="VideoForm">
		<video-player  
			class="video-player vjs-custom-skin video"
			ref="videoPlayer"
			:options="playerOptions"
			:playsinline="true">
		</video-player>
	</div>
</template>

<script>
	// 需要添加的配置
	// videojs -- videoPlayer 核心  
	import videojs from 'video.js'
	import 'vue-video-player/src/custom-theme.css';
	// 根据官方文档配置发现没有效果
	import 'video.js/dist/video-js.css'
	import { videoPlayer } from 'vue-video-player'
	export default {
	  components: {
	    videoPlayer
	  },
	  data() {
	  	return {
	  		playerOptions: {
			   // videojs options
			   muted: true,
			   preload: "auto",
			   language: 'zh-CN',
			   aspectRatio: '16:9',
			   playbackRates: [0.5, 1.0, 1.5, 2.0],
			   notSupportedMessage: '此视频暂时无法播放，请稍后再试',
			   sources: [{
			     type: "video/mp4",
			     src: ""
			   }],
			   poster: "/static/images/author.jpg",
			 }
	  	}
	  }
	}
</script>

<style scoped>
	#VideoForm {
		min-height: 600px;
	}
</style>