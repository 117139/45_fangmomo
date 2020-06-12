<template>
	<view class="content_wrap">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content"></block>
		</cu-custom>
		<view class="wrap_main">
			<view class="reg_tit">找回密码</view>
			<view class="input-group">
				<view class="view_t">手机号码</view>
				<input class="view_i" type="number" v-model="account" placeholder="请输入手机号码"></input>
				<view class="view_t">验证码</view>
				<view class="input-row">
				<m-input class="view_i" type="text"  v-model="code" placeholder="请输入验证码"></m-input>
				<view v-if="yzm_type==0" class="getyzm" @tap="getCode">发送</view>
				<view v-if="yzm_type==1" class="getyzm">{{yztime}}s</view>
				</view>
				<view class="view_t">重置密码</view>
				<view class="input-row">
				<m-input class="view_i" type="password" displayable v-model="password" placeholder="请输入新密码"></m-input>
				</view>
			</view>
			<view class="btn-row">
				<button type="primary" class="primary" @tap="register">确定</button>
			</view>
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
				code:'',
				password: '',
				yzm_type: 0,
				yztime: 60,
			}
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
						that.btnkg =0
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
						that.btnkg =0
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
					title: '操作成功'
				});
				
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>

	.wrap_main{
		width: 100%;
		padding: 0 68upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	
	.getyzm {
		flex: none;
		display: flex;
		align-items: center;
		justify-content: center;
		width:280upx;
		height:45px;
		background:rgba(49,113,245,1);
		border-radius:6px;
		font-size: 18px;
		color: #fff;
		margin-left: 14px;
	}
	uni-button.primary {
	    background-color: rgba(49,113,245,1);
	}
</style>
