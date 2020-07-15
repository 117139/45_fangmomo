<template>
	<view class="content_wrap_f3" :style="style0">
		<view  class="cu-bar fixed bg-white" :style="style">
			<view class="action" style="width: 2em;">
				<text class="cuIcon-back iconfont iconicon-test" @tap="back_fuc"><span></span></text>
			</view>
			<view class="content1" style="">联系客服</view>
			<view class="nav_right" style="width: 2em;"></view>
		</view>
		<!-- <cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">联系客服</block>
		</cu-custom> -->
		<view class="hx20"></view>
		<view class="my_list">
			<view class="my_li" @tap="jump"  data-url="" data-login='true'>
				<view class="my_li_msg">
					<view class="my_li_name">微信</view>
					<view>{{datas.Customer_service_wechat[0].body}}<text class="iconfont iconnext"></text></view>
				</view>
			</view>
			<view class="my_li" @tap="call_tel"  :data-tel="datas.Customer_service_phone[0].body" data-login='true'>
				<view class="my_li_msg">
					<view class="my_li_name">电话</view>
					<view>{{datas.Customer_service_phone[0].body}}<text class="iconfont iconnext"></text></view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				datas:''
			}
		},
		onLoad() {
			this.getdata()
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin','userName','loginDatas']),
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
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
			
				return style
			},
		},
		methods: {
			back_fuc() {
				uni.navigateBack()
			},
			getdata(){
				
				///api/info/list
				var that =this
				var data = {
					keyword:'Customer_service_wechat,Customer_service_phone'
				}
				
				//selectSaraylDetailByUserCard
				var jkurl = '/api/info/list'
				uni.showLoading({
					title: '正在获取数据'
				})
				service.get(jkurl, data,
					function(res) {
						
						if (res.data.code == 1) {
							var datas = res.data.data
							console.log(typeof datas)
							
							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							console.log(datas)
							that.datas = datas
				
				
						} else {
							if (res.data.msg) {
								uni.showToast({
									icon: 'none',
									title: res.data.msg
								})
							} else {
								uni.showToast({
									icon: 'none',
									title: '操作失败'
								})
							}
						}
					},
					function(err) {
						
						if (err.data.msg) {
							uni.showToast({
								icon: 'none',
								title: err.data.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				)
			},
			call_tel(e) {
				service.call_tel(e)
			},
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
		height: 120upx;
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
</style>
