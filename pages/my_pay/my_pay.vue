<template>
	<view class="content_wrap">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content"></block>
		</cu-custom>
		<view v-if="platform =='ios'">
			<view class="wrap_main">
				<view class="reg_tit">审核</view>
				<view class="kfwx">客服微信 <text>{{datas.applePay?datas.applePay[0].body:''}}</text></view>
			</view>
		</view>
		<view v-else>
			<view class="wrap_main">
				<view class="reg_tit">支付</view>
				<view class="kfwx">会员费 <text>￥</text><text class="hy_money">{{datas.vip?datas.vip[0].body:'0'}}</text></view>
				<view class="dis_flex aic ju_a pay_list">
					<view class="pay_type" @tap="pay_fuc(2)">
						<image v-if="pay_type==1" class="pay_type" src="../../static/img/pay11.png" mode=""></image>
						<image v-if="pay_type==2" class="pay_type" src="../../static/img/pay12.png" mode=""></image>
					</view>
					<view  class="pay_type" @tap="pay_fuc(1)">
						<image  v-if="pay_type==2" class="pay_type" src="../../static/img/pay21.png" mode=""></image>
						<image  v-if="pay_type==1" class="pay_type" src="../../static/img/pay22.png" mode=""></image>
					</view>
				</view>
				<view class="btn-row">
					<button type="primary" class="primary" @tap="pay">确认支付</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				pay_type:2,
				datas:'',
				token:'',
			}
		},
		computed: mapState(['platform', 'hasLogin', 'userName']),
		onLoad(option) {
			// platform
			uni.getSystemInfo({
			    success: function (res) {
			        
			        console.log(res.platform);
			    }
			});
			if(option.token){
				this.token=option.token
				
			}
			this.getpay()
		},
		methods: {
			getpay(){
				var that =this
				var data = {
					keyword:'vip,applePay'
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
			pay_fuc(num){
				if(this.pay_type==num){
					return
				}
				this.pay_type=num
				console.log(this.pay_type)
			},
			pay(){
				var that =this
				var data = {
					type:that.pay_type,
					id:that.datas.vip[0].id,
					token:that.token
				}
				
				//selectSaraylDetailByUserCard
				var jkurl = '/api/order/createOrder'
				uni.showLoading({
					title: '正在发起支付'
				})
				service.post(jkurl, data,
					function(res) {
						
						if (res.data.code == 1) {
							var datas = res.data.data
							console.log(typeof datas)
							
							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							console.log(datas)
							// that.datas = datas
							if(that.pay_type==2){
								uni.requestPayment({
								    provider: 'alipay',
								    orderInfo: datas.datas, //微信、支付宝订单数据
								    success: function (res) {
								        console.log('success:' + JSON.stringify(res));
								    },
								    fail: function (err) {
								        console.log('fail:' + JSON.stringify(err));
								    }
								});
							}
				
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
				uni.showToast({
					title:'支付'
				})
			}
		}
	}
</script>

<style scoped>
.wrap_main{
		width: 100%;
		padding: 0 68upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.kfwx{
		color: #1A1A1A;
		font-size: 14px;
	}
	.kfwx text{
		color: #3171F5;
		font-size: 16px;
		margin-left: 20px;
	}
	.kfwx .hy_money{
		margin-left: 0;
		font-size: 30px;
		font-weight: bold;
	}
	uni-button.primary {
		margin-top: 70px;
	    background-color: rgba(49,113,245,1);
	}
	.pay_list{
		margin-top: 80px;
	}
	.pay_type{
		width: 278upx;
		height: 118upx;
	}
</style>
