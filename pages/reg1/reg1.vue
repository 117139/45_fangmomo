<template>
	<view class="content_wrap">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content"></block>
		</cu-custom>
		<view class="wrap_main">
			<view class="reg_tit">账户信息</view>
			<view class="input-group">
				<view class="view_t">公司</view>
				<input class="view_i" type="number" v-model="account" placeholder="请输入公司名称"></input>
				<view class="view_t">称呼</view>
				<view class="input-row">
					<m-input class="view_i" type="text" v-model="code" placeholder="姓"></m-input>
					<radio-group @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd" >
							<view>
								<radio value="1" checked="true" style="transform:scale(0.7)"/>
							</view>
							<view>先生</view>
						</label>
						<label class="uni-list-cell uni-list-cell-pd" >
							<view>
								<radio value="0"  style="transform:scale(0.7)"/>
							</view>
							<view>女士</view>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="btn-row">
				<button type="primary" class="primary" @tap="register">同意协议并注册</button>
			</view>
			<view class="xieyi">已阅读并同意以下协议：<navigator url="../xieyi/xieyi?type=1">《房嬷嬷隐私协议》</navigator></view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';

	export default {
		components: {
			mInput
		},
		data() {
			return {
				account: '',
				code: '',
				password: '',
				gs_name: '',
				f_name: '',
				sex: 1,
				yzm_type: 0,
				yztime: 60,
			}
		},
		onLoad(option) {
			console.log(option)
			var that = this
			that.account = option.account
			that.password = option.password
			that.code = option.code
		},
		methods: {
			getCode() {
				let that = this

				if (that.account == '' || !(/^1\d{10}$/.test(that.account))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				// uni.showToast({
				// 	icon: 'none',
				// 	title: '发送成功'
				// })
				// that.codetime()
				// that.btnkg= 0
				// return
				var jkurl = '/sendCode'
				var data = {
					type: 1,
					phone: that.account
				}
				service.get(jkurl, data,
					function(res) {
						that.btnkg = 0
						if (res.data.code == 1) {

							uni.showToast({
								icon: 'none',
								title: '发送成功'
							})
							that.codetime()

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
					})

			},
			codetime() {
				let that = this
				let time = 60
				let st = setInterval(function() {
					if (time == 0) {
						that.yzm_type = 0
						clearInterval(st);
					} else {
						let news = time--;
						// console.log(news)
						that.yzm_type = 1
						that.yztime = news

					}
				}, 1000);
			},

			register() {
				var that =this
				if (that.account == '' || !(/^1\d{10}$/.test(that.account))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
				if (!that.code) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					});
					return;
				}

				if (that.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}

				const data = {
					account: this.account,
					password: this.password,
					code: this.code
				}
				service.addUser(data);
				uni.showToast({
					title: '注册成功'
				});
				// uni.navigateTo({
				// 	url:''
				// })
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style scoped>
	

	.wrap_main {
		width: 100%;
		padding: 0 68upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	

	uni-radio-group {
		flex: none;
		display: flex;
		align-items: center;
		justify-content: space-around;
		width:280upx;
		height:45px;
		border-radius:6px;
		font-size: 18px;
		color: #1A1A1A;
		margin-left: 14px;
	}
	.uni-label-pointer{
		display: flex;
		align-items: center;
	}
	.xieyi{
		color: #1A1A1A;
		font-size: 10px;
		display: flex;
		flex-wrap: wrap;
	}
	.xieyi navigator{
		color: #3171F5;
	}
</style>
