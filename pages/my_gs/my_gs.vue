<template>
	<view class="content_wrap_f3">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" >修改公司</block>
		</cu-custom>
		<view class="hx20"></view>
		<view class="my_list">
			<view class="my_li" >
				<view class="my_li_msg">
					<m-input class="m-input" type="text"  placeholder="请输入公司名" v-model="gongsi"></m-input>
				</view>
			</view>
			
		</view>
		
		<view class="btn-row">
			<button type="primary" class="primary" @tap="set_tel">确定</button>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue'
	export default {
		data() {
			return {
				gongsi: '',
			}
		},
		components: {
			mInput
		},
		methods: {
			
			set_tel(){
				var that =this
				
				if (!that.gongsi) {
					uni.showToast({
						icon: 'none',
						title: '请输入公司'
					});
					return;
				}
				
				const data = {
					gongsi: this.gongsi,
				}
				
				uni.showToast({
					title: '操作成功'
				});
				
				setTimeout(function (){
					uni.navigateBack({
						delta: 1
					});
				},1000)
			}
		}
	}
</script>

<style scoped>
	
.hx20{
		width: 100%;
		height: 20upx;
		background: #F3F4F6;
	}
	.my_list{
		width: 100%;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		background: #Fff;
	}
	.my_li{
		width: 100%;
		display: flex;
		height: 60px;
		padding: 0 28upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.my_li_msg{
		flex: 1;
		border-bottom: 1px solid #F3F4F6;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #1a1a1a;
		font-size: 18px;
	}
	.my_li_name{
		font-size: 18px;
		color: #1a1a1a;
	}
	.iconnext{
		color: #999;
		font-size: 14px;
		margin-left: 10upx;
	}
	.btn-row{
		padding: 10px 28upx;
	}
	input,.uni-input-input{
		flex: 1;
		text-align: right;
		min-width: 0;
	}
	.yzm{
		text-align: center;
	}
	.getyzm{
		width:160upx;
		height:40px;
		background:rgba(255,255,255,1);
		border:2upx solid rgba(49, 113, 245, 1);
		border-radius:12upx;
		font-size: 18px;
		color: #3171F5;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	uni-button.primary {
	    background-color: rgba(49,113,245,1);
	}
</style>
