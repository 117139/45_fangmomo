<template>
	<view class="content_wrap">
		<view class="wrap_main">
			<view class="reg_tit">
				<image src="../../static/img/login_img.png" mode=""></image>
				欢迎使用房嬷嬷
			</view>
			<view class="input-group">
				<view class="view_t">手机号码</view>
				<input class="view_i" type="number" v-model="account" placeholder="请输入手机号码"></input>

				<view class="view_t">密码</view>
				<view class="input-row">
					<m-input class="view_i" type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
				</view>
			</view>
			<view class="btn-row">
				<button type="primary" class="primary" @tap="bindLogin">登录</button>
			</view>
		</view>
		<view class="action-row">
			<navigator url="../reg/reg">注册账号</navigator>
			<!-- <text>|</text> -->
			<navigator url="../pwd/pwd">忘记密码</navigator>
		</view>
		<view class="login_tip">登录代表您已同意房嬷嬷<text class="yhxy_box_xy" @tap="jump" data-url="/pages/xieyi/xieyi?type=3">《用户服务协议、隐私协议》</text></view>
		<!-- <view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
			<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
				<image :src="provider.image" @tap="oauth(provider.value)"></image>
				!-- #ifdef MP-WEIXIN --
				!-- <button v-if="!isDevtools" open-type="getUserInfo" @getuserinfo="getUserInfo"></button> --
				!-- #endif --
			</view>
		</view> -->

		<view v-show="yhxy" class="yhxy_box">
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
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'

	export default {
		components: {
			mInput,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		data() {
			return {
				yhxy: true,
				sheetshow: true,
				datas: {
					body: ''
				},
				xdxy_type: 1,

				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0,
				isDevtools: false,
				SystemInfo: '',
			}
		},
		onLoad() {
			this.SystemInfo = uni.getSystemInfoSync()
			console.log(this.SystemInfo.platform)
			var yhxy = uni.getStorageSync('yhxy')
			this.getdata()
			if (yhxy) {
				this.yhxy = false
			}
		},
		onShow() {

		},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login', 'logindata']),
			jump(e){
				service.jump(e)
			},
			getdata() {

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
			xy_on() {
				this.yhxy = false
				uni.setStorageSync('yhxy', 'true')
			},
			yx_off() {
				if (plus.os.name.toLowerCase() === 'android') {
					plus.runtime.quit();
				} else {
					const threadClass = plus.ios.importClass("NSThread");
					const mainThread = plus.ios.invoke(threadClass, "mainThread");
					plus.ios.invoke(mainThread, "exit");
				}
			},
			initProvider() {
				const filters = ['weixin', 'qq', 'sinaweibo'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									this.providerList.push({
										value: res.provider[i],
										image: '../../static/img/' + res.provider[i] + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			bindLogin() {
				var that = this
				if (that.account == '' || !(/^1\d{10}$/.test(that.account))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}

				if (!that.password) {
					uni.showToast({
						icon: 'none',
						title: '请输入密码'
					});
					return;
				}

				const data = {
					phone: that.account,
					password: that.password
				}
				var jkurl = '/api/login/login'

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
			oauth(value) {
				uni.login({
					provider: value,
					success: (res) => {
						uni.getUserInfo({
							provider: value,
							success: (infoRes) => {
								/**
								 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
								 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
								 */
								this.toMain(infoRes.userInfo.nickName);
							},
							fail() {
								uni.showToast({
									icon: 'none',
									title: '登陆失败'
								});
							}
						});
					},
					fail: (err) => {
						console.error('授权登录失败：' + JSON.stringify(err));
					}
				});
			},
			getUserInfo({
				detail
			}) {
				if (detail.userInfo) {
					this.toMain(detail.userInfo.nickName);
				} else {
					uni.showToast({
						icon: 'none',
						title: '登陆失败'
					});
				}
			},
			toMain(userName) {
				this.login(userName);
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../main/main',
					});
				} else {
					uni.navigateBack();
				}

			}
		},
		onReady() {
			this.initPosition();
			this.initProvider();
			// #ifdef MP-WEIXIN
			this.isDevtools = uni.getSystemInfoSync().platform === 'devtools';
			// #endif
		}
	}
</script>

<style scoped>
	.login_tip{
		font-size: 20upx;
		padding: 20upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.yhxy_box {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .5);
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
	}
.yhxy_box_xy{
	color: #007aff;
}
	.dyxy_box {
		width: 80%;
		/* min-height: 80%; */
		background-color: #fff;
		border-radius: 18upx;
		padding: 30upx 44upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.dyxy_tit {
		text-align: center;
		font-size: 36upx;
		color: #000;
		padding-bottom: 20upx;
		border-bottom: 1px solid #ddd;
		margin-bottom: 26upx;
	}

	.dyxy_inr {
		font-size: 28upx;
		color: #666;
		height: 800upx;
		overflow: scroll;
	}

	.next_btn {
		margin: 20px 10px 5px;
		font-size: 28upx;
		color: #fff;
		flex: 1;
		height: 80upx;
		background: rgba(244, 116, 22, 1);
		border-radius: 18upx;
		align-items: center;
		justify-content: center;
	}

	.next_btn_cal {
		background: #ddd;
	}

	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		position: fixed;
		bottom: 35px;
		width: 200px;
		left: 50%;
		margin-left: -100px;
	}

	.action-row navigator {
		color: #666;
		padding: 0 10px;
		font-size: 14px;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		position: relative;
		width: 50px;
		height: 50px;
		border: 1px solid #dddddd;
		border-radius: 50px;
		margin: 0 20px;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 30px;
		height: 30px;
		margin: 10px;
	}

	.oauth-image button {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	.wrap_main {
		width: 100%;
		padding: 0 68upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.reg_tit {
		font-weight: 500;
	}

	.reg_tit image {
		display: block;
		width: 45px;
		height: 54px;
		margin-bottom: 17px;
	}
</style>
