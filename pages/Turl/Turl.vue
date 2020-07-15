<template>
	<view  class="content_wrap_f3" :style="style0">
		<view  class="cu-bar fixed bg-white" :style="style">
			<view class="action" style="width: 2em;">
				<text class="cuIcon-back iconfont iconicon-test" @tap="back_fuc"><span></span></text>
			</view>
			<view class="content1" style="">房嬷嬷</view>
			<view class="nav_right" style="width: 2em;"></view>
		</view>
		<!-- <cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" >房嬷嬷</block>
		</cu-custom> -->
		<view style="height: 100%;overflow: hidden;">
				<web-view :webview-styles="webviewStyles" :src="url"></web-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'',
				webviewStyles: {
						progress: {
								color: '#FF3333'
						}
				}
			}
		},
		onLoad(option) {
			this.url=option.url
			// #ifdef APP-PLUS  
			plus.navigator.setFullscreen(true);
			// #endif
		},
		
		onUnload(){
			// #ifdef APP-PLUS  
			plus.navigator.setFullscreen(false);
			// #endif
		},
		computed: {
			
			style0() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var padd_top = CustomBar
				var style = `padding-top:${padd_top}px;`;
				
				return style
			},
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;z-index:99999`;
			
				return style
			},
		},
		methods: {
			back_fuc() {
				uni.navigateBack()
			},
		}
	}
</script>

<style>

</style>
