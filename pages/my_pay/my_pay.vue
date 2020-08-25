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
				btnkg:0,
				pay_type:2,
				datas:'',
				token:'',
				account:'',
				password:'',
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
				this.account=option.account
				this.password=option.password
			}
			this.getpay()
		},
		onShow() {
			this.btnkg=0
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
					title: '正在发起支付',
					mask:true
				})
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
				service.post(jkurl, data,
					function(res) {
						
						if (res.data.code == 1) {
							var datas = res.data.data
							console.log(typeof datas)
							
							// if (typeof datas == 'string') {
							// 	datas = JSON.parse(datas)
							// }
							console.log(datas)
							// 支付宝
							if(that.pay_type==2){
								uni.requestPayment({
								    provider: 'alipay',
								    orderInfo: datas, //微信、支付宝订单数据
								    success: function (res) {
								        console.log('success:' + JSON.stringify(res));
												wx.showToast({
													title: '支付成功',
													icon: 'none',
													duration: 1000
												});
												setTimeout(function (){
													that.btnkg=0
													that.bindLogin()
												},1000)
								    },
								    fail: function (err) {
											that.btnkg=0
								        console.log('fail:' + JSON.stringify(err));
												uni.showModal({
												    content: "支付失败",
												    showCancel: false
												})
								    }
								});
							}
							//微信
							if(that.pay_type==1){
								uni.requestPayment({
								    provider: 'wxpay',
								    orderInfo: datas, //微信、支付宝订单数据
								    success: function (res) {
								        console.log('success:' + JSON.stringify(res));
												wx.showToast({
													title: '支付成功',
													icon: 'none',
													duration: 1000
												});
												setTimeout(function (){
													that.btnkg=0
													that.bindLogin()
												},1000)
								    },
								    fail: function (err) {
											that.btnkg=0
								        console.log('fail:' + JSON.stringify(err));
												uni.showModal({
												    content: "支付失败",
												    showCancel: false
												})
								    }
								});
							}
				
						} else {
							that.btnkg=0
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
						that.btnkg=0
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
				// uni.showToast({
				// 	title:'支付'
				// })
			},
			bindLogin() {
				var that = this
				const data = {
					phone: that.account,
					password: that.password
				}
				var jkurl = '/api/login/login'
				uni.showLoading({
					title:'正在重新登录...'
				})
				service.post(jkurl, data,
					function(res) {
						that.btnkg = 0
						if (res.data.code == 1) {
			
							uni.showToast({
								icon: 'none',
								title: '登录成功'
							})
							that.login(res.data.data.nickname);
							that.logindata(res.data.data)
							uni.setStorageSync('loginmsg', JSON.stringify(res.data.data))
							uni.setStorageSync('phone', that.account)
							var phone = uni.getStorageSync('phone')
							console.log(phone)
							uni.setStorageSync('password', that.password)
							setTimeout(() => {
								uni.reLaunch({
									url: '../main/main'
								})
								// uni.navigateBack()
							}, 1000)
						} else {
							if (res.data.code == 2) {
								setTimeout(() => {
									uni.navigateTo({
										url: '../my_pay/my_pay?token=' + res.data.token
									})
								}, 1500)
							}
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
						that.btnkg = 0
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
