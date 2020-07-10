<template>
	<view class="content_wrap_f3">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" >修改公司</block>
		</cu-custom>
		<view class="hx20"></view>
		<view class="my_list">
			<view class="my_li" >
				<view class="my_li_msg">
					<m-input class="m-input" type="text"  placeholder="请输入公司名" v-model="gongsi"></m-input>
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
	import mInput from '../../components/m-input.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				gongsi: '1',
			}
		},
		components: {
			mInput
		},
		onLoad() {
			var that =this
			if (!that.hasLogin) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					/**
					 * 如果需要强制登录，不显示取消按钮
					 */
					showCancel: !this.forcedLogin,
					success: (res) => {
						if (res.confirm) {
							/**
							 * 如果需要强制登录，使用reLaunch方式
							 */
							if (this.forcedLogin) {
								uni.reLaunch({
									url: '../login/login'
								});
							} else {
								uni.navigateTo({
									url: '../login/login'
								});
							}
						}
					}
				});
			}else{
				that.gongsi=that.loginDatas.company
				console.log(that.loginDatas.company)
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin','loginDatas']),
		},
		methods: {
			...mapMutations(['login','logout','logindata']),
			set_tel(){
				var that =this
				
				if (!that.gongsi) {
					uni.showToast({
						icon: 'none',
						title: '请输入公司名'
					});
					return;
				}
				
				
				
				const data = {
					company: that.gongsi,
					token: that.loginDatas.token,
				}
				var jkurl='/api/my/update'
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
								title: '操作成功'
							});
							that.dblogin()
							setTimeout(function (){
								uni.navigateBack({
									delta: 1
								});
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
				
				
			},
			dblogin(){
				var that =this
				if(!uni.getStorageSync('phone')){
					uni.navigateTo({
						url:'pages/main/main'
					})
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
