<template>
	<view class="content_wrap_f3">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" >修改手机</block>
		</cu-custom>
		<view class="hx20"></view>
		<view class="my_list">
			<view class="my_li" >
				<view class="my_li_msg">
					<view class="my_li_name">当前手机</view>
					<view>{{loginDatas.phone}}</view>
				</view>
			</view>
			<view class="my_li" >
				<view class="my_li_msg">
					<view class="my_li_name">短信验证码</view>
					<input type="text" placeholder="6位数验证码" v-model="code" class="yzm"></input>
					<view v-if="yzm_type==0" class="getyzm" @tap="getCode">发送</view>
					<view v-if="yzm_type==1" class="getyzm">{{yztime}}s</view>
				</view>
			</view>
			<view class="my_li" >
				<view class="my_li_msg">
					<view class="my_li_name">新手机</view>
					<input type="number" placeholder="请输入新手机号" v-model="account"></input>
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
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				account: '',
				code:'',
				yzm_type: 0,
				yztime: 60,
				verification_key:''
			}
		},
		onShow() {
			if(!this.hasLogin){
				uni.reLaunch({
					url:'../main/main'
				})
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin','userName','loginDatas']),
			
		},
		methods: {
			...mapMutations(['logout']),
			getCode() {
				let that = this
			
				
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
				var jkurl = '/api/login/changePhone'
				var data = {
					phone: that.loginDatas.phone,
					token:that.loginDatas.token
				}
				service.post(jkurl, data,
					function(res) {
						that.btnkg =0
						if (res.data.code == 1) {
			
							uni.showToast({
								icon: 'none',
								title: '发送成功'
							})
							that.verification_key=res.data.data.key
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
			set_tel(){
				var that =this
				
				if (!that.code) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					});
					return;
				}
				if (that.account == '' || !(/^1\d{10}$/.test(that.account))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
				
				const data = {
					phone:that.loginDatas.phone,
					verification_key:that.verification_key,
					verification_code: that.code,
					new_phone: that.account,
					token: that.loginDatas.token,
				}
				var jkurl='/api/login/changePhone'
				service.post(jkurl, data,
					function(res) {
						
						if (res.data.code == 1) {
							var datas = res.data.data
							console.log(typeof datas)
							
							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							uni.showToast({
								icon:'none',
								title: '操作成功,请重新登录账号'
							});
							that.logout()
							uni.setStorageSync('phone','')
							uni.removeStorageSync('phone')
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
