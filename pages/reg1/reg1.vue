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
				<input class="view_i" type="text" v-model="gs_name" placeholder="请输入公司名称"></input>
				<view class="view_t">称呼</view>
				<view class="input-row">
					<m-input class="view_i" type="text" v-model="f_name" placeholder="姓"></m-input>
					<radio-group @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd" >
							<view>
								<radio value="先生" checked="true" style="transform:scale(0.7)"/>
							</view>
							<view>先生</view>
						</label>
						<label class="uni-list-cell uni-list-cell-pd" >
							<view>
								<radio value="女士"  style="transform:scale(0.7)"/>
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
	import {
		mapState,
		mapMutations
	} from 'vuex'
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
				verification_key:'',
				gs_name: '',
				f_name: '',
				sex: '先生',
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
			that.verification_key = option.verification_key
		},
		methods: {
			radioChange(e){
				console.log(e)
				this.sex=e.detail.value
			},
			register() {
				var that =this
				
				if (!that.gs_name) {
					uni.showToast({
						icon: 'none',
						title: '请输入公司名称'
					});
					return;
				}

				if (!that.f_name) {
					uni.showToast({
						icon: 'none',
						title: '请输入您的姓氏'
					});
					return;
				}

				const data = {
					phone: that.account,
					password: that.password,
					verification_code: that.code,
					verification_key: that.verification_key,
					company: that.gs_name,
					nickname: that.f_name+that.sex,
				}
				console.log(data)
				
				
				//selectSaraylDetailByUserCard
				var jkurl = '/api/login/register'
				uni.showLoading({
					title: '正在提交数据'
				})
				service.post(jkurl, data,
					function(res) {
						
						if (res.data.code == 1) {
							var datas = res.data.data
							console.log(typeof datas)
							
							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							uni.showToast({
								title: '注册成功'
							});
							console.log(datas)
							setTimeout(()=>{
								uni.reLaunch({
									url:'../login/login'
								})
							},1000)
				
				
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
				
				// uni.navigateTo({
				// 	url:''
				// })
				// uni.navigateBack({
				// 	delta: 1
				// });
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
		width:285upx;
		height:45px;
		border-radius:6px;
		font-size: 36upx;
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
