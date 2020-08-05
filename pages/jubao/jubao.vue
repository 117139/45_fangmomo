<template>
	<view class="content_wrap">
		<cu-custom bgColor="bg-white" :isBack="true" class="cu-custom">
			<block slot="backText"></block>
			<block slot="content">举报</block>
		</cu-custom>
		<picker @change="bindPickerChange" range-key="title" data-type="0" :value="index" :range="array">
			<view class="fb_li">
				<view>内容违规</view>
				<view>{{array[index]}}</view>
				<text class="iconfont iconnext"></text>
			</view>
		</picker>
		<view class="fb_li">
			<textarea class="jb_text" value="" placeholder="请输入" />
		</view>
		<view class="jubao_btn" @tap="jubao">提交</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	// import simpleAddress from '@/components/simple-address/simple-address.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				array: [
					'色情低俗',
					'政治敏感',
					'违法犯罪',
					'造谣传谣',
					'垃圾广告',
				],
				index: 0,
			}
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				console.log(e)
				var datas = e.currentTarget.dataset
				this.index=e.target.value
			},
			jubao(){
				uni.showLoading({
				    title: '正在提交...'
				});
				setTimeout(function (){
					uni.hideLoading()
					uni.showToast({
					    title: '提交成功',
					    duration: 2000
					});
					setTimeout(function (){
						uni.navigateBack()
					},1500)
				},1500)
			}
		}
	}
</script>

<style>
	.fb_li{
		width: 100%;
		padding: 0 28rpx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		min-height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26rpx;
		color: #666;
	}
	.jb_text{
		background: #eee;
		border-radius: 10rpx;
		padding: 20rpx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		font-size: 24rpx;
	}
	.iconnext{
		font-size: 24rpx;
	}
	.jubao_btn{
		width: 80%;
		height: 80rpx;
		border-radius: 8rpx;
		margin: 200rpx auto 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #3171F5;
		color: #fff;
		font-size: 25rpx;
	}
</style>
