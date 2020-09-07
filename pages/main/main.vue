<template>
	<view class="content_wrap" :style="style0">
		<view class="cu-custom" :style="style">
			{{userName}},{{time_zz}}！
		</view>
		<view class="sousuo_box" :style="style1">
			<view class="ss_box"  @tap="jump" data-url="../search/search">
				<image class="ss_icon" src="../../static/img/index/search.png" mode=""></image>搜索房源
			</view>
		</view>
		<swiper class="swiper" :indicator-dots="indicatorDots"
			indicator-color="rgba(255,255,255,.6)" indicator-active-color="rgba(255,255,255,1)"
		 :autoplay="autoplay" :interval="interval" :duration="duration" circular='true'>
				<swiper-item v-if="item.body" v-for="(item,idx) in datas.banner">
						<!-- <image v-if="item.url" class="swi_img" :src="getimg(item.body)" mode="aspectFill"
						 @tap="jumpurl" :data-url="item.url"></image> -->
						<image v-if="item.url" class="swi_img" :src="getimg(item.body)" mode="aspectFill"
						 @tap="jump" :data-url="'../Turl/Turl?url='+item.url"></image>
						 <!-- /'../webview/webview?url='+datas.url -->
						<image v-else class="swi_img" :src="getimg(item.body)" mode="aspectFill"
						 @tap="jump" data-url="../ad_zz/ad_zz"></image>
				</swiper-item>
				<!-- <swiper-item>
						<image class="swi_img" src="../../static/img/index/banner.png" mode="aspectFill"
						 @tap="jump" data-url="../ad_zz/ad_zz"></image>
				</swiper-item>
				<swiper-item>
						<image class="swi_img" src="../../static/img/index/banner.png" mode="aspectFill"
						 @tap="jump" data-url="../ad_zz/ad_zz"></image>
				</swiper-item> -->
		</swiper>
		<view class="index_list">
			<view class="index_li" @tap="jump" data-url="../list/list?title=售房&type=1">
				<image class="indexli_img" src="../../static/img/index/indexbtn1.png" mode=""></image>
				<text class="indexli_text">售房</text>
			</view>
			<view class="index_li" @tap="jump" data-url="../list/list?title=租房&type=2">
				<image class="indexli_img" src="../../static/img/index/indexbtn4.png" mode=""></image>
				<text class="indexli_text">租房</text>
			</view>
			<view class="index_li" @tap="jump" data-url="../list/list?title=商铺&type=3">
				<image class="indexli_img" src="../../static/img/index/indexbtn2.png" mode=""></image>
				<text class="indexli_text">商铺</text>
			</view>
			<view class="index_li" @tap="jump" data-url="../list/list?title=写字楼&type=4">
				<image class="indexli_img" src="../../static/img/index/indexbtn3.png" mode=""></image>
				<text class="indexli_text">写字楼</text>
			</view>
		</view>
		<view class="gj_tit">房屋工具</view>
		<view class="gj_list">
			<view class="gj_li" @tap="jump" data-url="../jisuan/jisuan">
				<image class="gj_li" src="../../static/img/index/gjbtn1.png" mode=""></image>
			</view>
			<view class="gj_li"  @tap="jump" data-url="../ad_zz/ad_zz">
				<image class="gj_li" src="../../static/img/index/gjbtn2.png" mode=""></image>
			</view>
		</view>
		<view v-show="yhxy" class="yhxy_box">
			<view class="dyxy_box">
				<view class="dyxy_tit">用户协议</view>
				<scroll-view class="dyxy_inr" v-html="datas_xy.body">
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
				yhxy: false,
				datas_xy: {
					body: ''
				},
				btnkg: 0,
				time_zz:'你好',
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				datas: '',
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500
			};
		},
		onLoad() {
			var yhxy = uni.getStorageSync('yhxy')
			if (!yhxy) {
				this.yhxy = true
			}
			this.getdata()
			this.getyxdata()
			
		},
		onShow() {
			var that = this;
			var time = new Date();
			var year = time.getFullYear();
			var month = time.getMonth() + 1;
			var date = time.getDate();
			var hour = time.getHours();
			var minute = time.getMinutes();
			var second = time.getSeconds();
			month = month < 10 ? "0" + month : month;
			date = date < 10 ? "0" + date : date;
			hour = hour < 10 ? "0" + hour : hour;
			minute = minute < 10 ? "0" + minute : minute;
			second = second < 10 ? "0" + second : second;
			var now_time = hour + ":" + minute;
			console.log(now_time)
			// that.time_zz = '下午好'
			if (hour > 12) {
				that.time_zz = "下午好"
			} else if (hour < 12) {
				that.time_zz = "上午好"
			} else {
				that.time_zz = "中午好"
			}
			/*if (!this.hasLogin) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					
					showCancel: !this.forcedLogin,
					success: (res) => {
						if (res.confirm) {
							
							if (this.forcedLogin) {
								uni.reLaunch({
									url: '../login/login'
								});
							} else {
								uni.reLaunch({
									url: '../login/login'
								});
							}
						}
					}
				});
			}else{
				
			}*/
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName']),
			style0() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var padd_top = CustomBar+54
				var style = `padding-top:${padd_top}px;`;

				return style
			},
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;

				return style
			},
			style1() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var padd_top = CustomBar
				var style = `top:${padd_top}px;`;

				return style
			}
		},
		onPullDownRefresh() {
			console.log('下拉')
			this.getdata()
		},
		onReachBottom() {
			console.log('上拉')
		},
		methods: {
			...mapMutations(['login','logindata','logout','setplatform']),
			xy_on() {
				this.yhxy = false
				uni.setStorageSync('yhxy', 'true')
			},
			xy_off() {
				if (plus.os.name.toLowerCase() === 'android') {
					plus.runtime.quit() // Android
				} else {
					plus.ios.import("UIApplication").sharedApplication().performSelector("exit"); // IOS
				}
			},
			getyxdata() {
				///api/info/list
				var that = this
				var data = {
					keyword: 'Privacy_agreement'
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
							// console.log(datas)
							that.datas_xy = datas
			
			
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
			
			getimg(img){
				return service.getimg(img)
			},
			getdata(){
				///api/info/list
				var that =this
				var data = {
					keyword:'banner,'
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
			jumpurl(e){
				var that = this
				
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
					setTimeout(function() {
						that.btnkg = 0
					}, 1000)
				}
				var datas = e.currentTarget.dataset
				console.log('../webview/webview?url='+datas.url)
				uni.navigateTo({
					url:'../webview/webview'
				})
				uni.navigateTo({
					url:'../webview/webview?url='+datas.url
				})
				// window.location.href = datas.url
			},
			jump(e) {
				var that = this

				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
					setTimeout(function() {
						that.btnkg = 0
					}, 1000)
				}

				service.jump(e)
			},
			dblogin(){
				var that =this
				if(!uni.getStorageSync('phone')){
					// uni.reLaunch({
					// 	url:'../login/login'
					// })
					return
				}
				var account=uni.getStorageSync('phone')
				var password=uni.getStorageSync('password')
				console.log(account)
				const data = {
					phone: account,
					password: password
				}
				var jkurl='/api/login/login'
				
				service.post(jkurl, data,
					function(res) {
						that.btnkg=0
						if (res.data.code == 1) {
							that.login(res.data.data.nickname);
							that.logindata(res.data.data)
							uni.setStorageSync('loginmsg', JSON.stringify(res.data.data))
							uni.setStorageSync('phone', account)
							var phone=uni.getStorageSync('phone')
							console.log(phone)
							uni.setStorageSync('password', password)
							
								
							
							
						} else {
							if (res.data.msg) {
							  uni.showToast({
							    icon: 'none',
							    title: res.data.msg
							  })
							} else {
							  uni.showToast({
							    icon: 'none',
							    title: '请重新登录账号'
							  })
							}
							setTimeout(()=>{
								uni.hideToast()
								uni.navigateTo({
									url:'../login/login'
								})
							},2000)
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
			}
		}
	}
</script>

<style scoped>
	
	
	
	.content_wrap {
		padding-top: 200upx;
	}

	.cu-custom {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		padding: 0 28upx;
		position: fixed;
		top: 0;
		z-index: 9999;
		background: #fff;
		font-weight: bold;
		color: #1A1A1A;
		font-size: 40upx;
	}

	.sousuo_box {
		background: #fff;
		width: 100%;
		display: flex;
		align-items: stretch;
		justify-content: center;
		padding: 12upx 32upx 16px;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		font-size: 18px;
		color: #1A1A1A;
		position: fixed;
		z-index: 999;
	}
	.ss_box{
		width: 100%;
		height: 38px;
		background:rgba(235,239,242,1);
		border-radius:38px;
		padding: 0 38upx;
		font-size: 32upx;
		color: #999;
		display: flex;
		align-items: center;
	}
	.ss_icon{
		width: 32upx;
		height: 32upx;
		margin-right: 12px;
	}
	.swiper{
		
		width: 100%;
		height: 360upx;
	}
	.swi_img{
		width: 100%;
		height: 360upx;
	}
	.index_list{
		display: flex;
		padding: 24upx 0;
	}
	.index_li{
		width: 25%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 24upx 0;
	}
	.indexli_img{
		width: 100upx;
		height: 100upx;
		margin-bottom: 19upx;
	}
	.indexli_text{
		font-size: 28upx;
		color: #1A1A1A;
	}
	.gj_tit{
		width: 100%;
		height: 50px;
		padding: 0 32upx;
		box-sizing: border-box;
		font-size: 18px;
		font-weight: bold;
		display: flex;
		align-items: center;
	}
	.gj_list{
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0 32upx;
	}
	.gj_li{
		width: 327upx!important;
		height: 160upx!important;
	}
</style>
