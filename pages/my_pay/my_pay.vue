<template>
	<view class="content_wrap">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">房嬷嬷年度会员</block>
		</cu-custom>
		<!-- <view v-if="platform =='ios'">
			<view class="wrap_main">
				<view class="reg_tit">审核</view>
				<view class="kfwx">客服微信 <text>{{datas.applePay?datas.applePay[0].body:''}}</text></view>
			</view>
		</view> -->
		<!-- <view v-else> -->
		<view>
			<view class="wrap_main">
				<view class="reg_tit">支付</view>
				<!-- <view class="kfwx">会员费 <text>￥</text><text class="hy_money">{{datas.vip?datas.vip[0].body:'0'}}/年</text></view> -->
				<view class="kfwx">年度会员<text>￥</text><text class="hy_money">{{datas.vip?datas.vip[0].body:'0'}}</text>/年</view>
				<view class="reg_tit_tip">加入会员即可享受一年房嬷嬷APP房源信息浏览联系</view>
				<view class="dis_flex aic ju_a pay_list">
					<!-- <view class="pay_type" @tap="pay_fuc(2)">
						<image v-if="pay_type!=2" class="pay_type" src="../../static/img/pay11.png" mode=""></image>
						<image v-if="pay_type==2" class="pay_type" src="../../static/img/pay12.png" mode=""></image>
					</view>
					<view class="pay_type" @tap="pay_fuc(1)">
						<image v-if="pay_type!=1" class="pay_type" src="../../static/img/pay21.png" mode=""></image>
						<image v-if="pay_type==1" class="pay_type" src="../../static/img/pay22.png" mode=""></image>
					</view>
					<view v-if="iapChannel" class="pay_type" @tap="pay_fuc(3)">
						<image v-if="pay_type!=3" class="pay_type" src="../../static/img/pay31.png" mode=""></image>
						<image v-if="pay_type==3" class="pay_type" src="../../static/img/pay32.png" mode=""></image>
					</view>
					<view v-if="iapChannel" class="pay_type"></view> -->
				</view>
				<view class="btn-row w100">
					<button v-if="btnkg==0" type="primary" class="primary" @tap="pay">确认支付</button>
					<!-- <button v-if="btnkg==0&&pay_type==3" type="primary" class="primary" @tap="requestPayment_ios">确认支付</button> -->
					<button v-if="btnkg==1" type="primary" class="primary">确认支付</button>
				</view>
				
				<view class="zf_tip">开通前阅读<text class="yhxy_box_xy" @tap="jump" data-url="/pages/xieyi/xieyi?type=3"
					>《用户服务协议》</text>和<text class="yhxy_box_xy" @tap="jump" data-url="/pages/xieyi/xieyi?type=4"
					>《自动续费服务规则》</text>
				</view>
				<view v-show="zfxy" class="yhxy_box">
					<view class="dyxy_box">
						<view class="dyxy_tit">用户协议</view>
						<scroll-view class="dyxy_inr" v-html="datas.body">
							<!-- {{datas.body}} -->
							<!-- <view v-if="datas" class="xieyi_main" v-html="datas.body"></view> -->
						</scroll-view>
						<!-- <view class="dis_flex ydxy_btn" :class="xdxy_type==1?'cur':''" @tap="xdxy_type_fuc"><view class="d1 dis_flex"><image  v-if="xdxy_type==1" src="../../static/images/duigou.png"></image></view>我已阅读并同意该协议</view> -->
						<view class="dis_flex">
							<view class="next_btn next_btn_cal dis_flex" @tap="xy_off">拒绝</view>
							<view class="next_btn dis_flex" @tap="xy_on">同意</view>
						</view>
					</view>
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
	// var iapChannel = null
	var productId = 198802137211
	var productIds = ['198802137211']
	export default {
		data() {
			return {
				btnkg: 0,
				// pay_type: 2,
				pay_type: 3,
				datas: '',
				token: '',
				account: '',
				password: '',

				iapChannel: null,
				loading: false,
				disabled: true,
				
				no_id:'', 
				
				zfxy:'',
			}
		},
		computed: mapState(['platform', 'hasLogin', 'userName']),
		onLoad(option) {
			var zfxy = uni.getStorageSync('zfxy')
			var that = this
			// uni.showLoading({
			// 	title: '获取到channel'
			// })
			if (option.token) {
				that.token = option.token
				that.account = option.account
				that.password = option.password
			}
			plus.payment.getChannels((channels) => {
				console.log("获取到channel" + JSON.stringify(channels))
				for (var i in channels) {
					var channel = channels[i];
					if (channel.id === 'appleiap') {
						that.iapChannel = channel;
						that.requestOrder();
					}
				}
				if (!that.iapChannel) {
					that.errorMsg()
				}
			}, (error) => {
				that.errorMsg()
			});

			that.getpay()
		},
		onShow() {
			console.log('onshow')
			this.btnkg = 0
		},
		computed: mapState(['forcedLogin', 'loginDatas']),
		methods: {
			...mapMutations(['login', 'logindata']),
			jump(e){
				service.jump(e)
			},
			getpay() {
				var that = this
				var data = {
					keyword: 'vip,applePay'
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
							// console.log(typeof datas)

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
			pay_fuc(num) {
				if (this.pay_type == num) {
					return
				}
				this.pay_type = num
				console.log(this.pay_type)
			},
			pay() {
				var that = this
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				/*if(that.pay_type==3){
				
					that.requestPayment_ios()
					return
				}*/
				var data = {
					type: that.pay_type,
					id: that.datas.vip[0].id,
					token: that.token
				}

				//selectSaraylDetailByUserCard
				var jkurl = '/api/order/createOrder'
				uni.showLoading({
					title: '正在发起支付',
					mask: true
				})

				service.post(jkurl, data,
					function(res) {

						if (res.data.code == 1) {
							var datas = res.data.data
							console.log(typeof datas)

							// if (typeof datas == 'string') {
							// 	datas = JSON.parse(datas)
							// }
							console.log(datas)
							if (that.pay_type == 3) {
								console.log(datas.no)
								that.no_id=datas.no
								that.requestPayment_ios()
							}
							// 支付宝
							if (that.pay_type == 2) {
								uni.requestPayment({
									provider: 'alipay',
									orderInfo: datas, //微信、支付宝订单数据
									success: function(res) {
										console.log('success:' + JSON.stringify(res));
										wx.showToast({
											title: '支付成功',
											icon: 'none',
											duration: 1000
										});
										setTimeout(function() {
											that.btnkg = 0
											that.bindLogin()
										}, 1000)
									},
									fail: function(err) {
										that.btnkg = 0
										console.log('fail:' + JSON.stringify(err));
										uni.showModal({
											content: "支付失败",
											showCancel: false
										})
									}
								});
							}
							//微信
							if (that.pay_type == 1) {
								uni.requestPayment({
									provider: 'wxpay',
									orderInfo: datas, //微信、支付宝订单数据
									success: function(res) {
										console.log('success:' + JSON.stringify(res));
										wx.showToast({
											title: '支付成功',
											icon: 'none',
											duration: 1000
										});
										setTimeout(function() {
											that.btnkg = 0
											that.bindLogin()
										}, 1000)
									},
									fail: function(err) {
										that.btnkg = 0
										console.log('fail:' + JSON.stringify(err));
										uni.showModal({
											content: "支付失败",
											showCancel: false
										})
									}
								});
							}

						} else {
							that.btnkg = 0
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
					title: '正在重新登录...'
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
			iap_fuc(paymsg) {
				var that = this
				const data = {
					receipt_data: paymsg,
					no: that.no_id
				}
				uni.showLoading({
					title: '正在进行校验'
				})
				var jkurl = '/api/order/checkApplePay'
				console.log('开始校验')
				service.post(jkurl, data,
					function(res) {
						uni.hideLoading()
						that.btnkg = 0
						if (res.data.code == 1) {
							wx.showToast({
								title: '支付成功',
								icon: 'none',
								duration: 1000
							});
							setTimeout(function() {
								that.btnkg = 0
								that.bindLogin()
							}, 1000)
						}
					},
					function(err) {
						uni.hideLoading()
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
			requestOrder() {
				var that = this
				uni.showLoading({
					title: '检测支付环境...'
				})
				console.log('productId===>' + productId)
				console.log('productIds===>' + productIds)
				that.iapChannel.requestOrder(productIds, (orderList) => { //必须调用此方法才能进行 iap 支付
					this.disabled = false;

					console.log('requestOrder success666: ' + JSON.stringify(orderList));
					uni.hideLoading();
					// for (var index in orderList) {
					// 	var OrderItem = orderList[index];
					// 	console.log("Title:" + OrderItem.title + "Price:" + OrderItem.price + "Description:" + OrderItem.description +
					// 		"ProductID:" + OrderItem.productid);
					// }
				}, (e) => {
					console.log('requestOrder failed: ' + JSON.stringify(e));
					uni.showModal({
						content: JSON.stringify(e),
						showCancel: false
					})
					uni.hideLoading();
					this.errorMsg();
				});
			},
			requestPayment_ios() {
				var that = this
				// console.log('正在进行苹果支付')
				uni.showLoading({
					title: '正在进行支付,请勿进行其他操作'
				})
				// return
				// uni.showToast({
				// 	icon: 'none',
				// 	title: '正在发起支付'
				// });
				uni.requestPayment({
					provider: 'appleiap',
					orderInfo: {
						productid: productIds[0]
					},
					success: (e) => {
						uni.hideLoading()
						console.log(e)
						that.btnkg = 0
						console.log(JSON.stringify(e))
						console.log('苹果支付成功')
						that.iap_fuc(JSON.stringify(e))
						// uni.showModal({
						// 	content: "感谢您的赞助" + JSON.stringify(e),
						// 	showCancel: false
						// })
					},
					fail: (e) => {
						console.log(JSON.stringify(e))
						that.btnkg = 0
						uni.hideLoading()
						uni.showModal({
							icon: 'none',
							content: "支付失败,原因为: " + e.errMsg,
							showCancel: false
						})
					},
					complete: (e) => {
						console.log(e)
						console.log("payment结束")
						that.loading = false;
					}
				})

			},
			applePriceChange(e) {
				productId = e.detail.value;
			},
			errorMsg() {
				// uni.showModal({
				// 	content: "暂不支持苹果 iap 支付",
				// 	showCancel: false
				// })
				console.log('暂不支持苹果 iap 支付')
			}
		}
	}
</script>

<style scoped>
	.wrap_main {
		width: 100%;
		padding: 0 60upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.kfwx {
		color: #1A1A1A;
		font-size: 14px;
	}

	.kfwx text {
		color: #3171F5;
		font-size: 16px;
		margin-left: 20px;
	}

	.kfwx .hy_money {
		margin-left: 0;
		font-size: 30px;
		font-weight: bold;
	}

	uni-button.primary {
		margin-top: 70px;
		background-color: rgba(49, 113, 245, 1);
	}

	.pay_list {
		margin-top: 80px;
		flex-wrap: wrap;
	}

	.pay_type {
		width: 278upx;
		height: 118upx;
		margin-bottom: 20upx;
	}
	.reg_tit_tip{
		margin-top: 20px;
		font-size: 12px;
	}
	.zf_tip{
		margin-top: 20px;
		font-size: 12px;
	}
</style>
