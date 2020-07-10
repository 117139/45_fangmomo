<template>
	<view class="content_wrap_f3">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" >修改密码</block>
		</cu-custom>
		<view class="hx20"></view>
		<view class="my_list">
			<view class="my_li" >
				<view class="my_li_msg">
					<view class="my_li_name">原密码</view>
					<m-input class="m-input" type="password"  placeholder="请输入原密码" v-model="password"></m-input>
				</view>
			</view>
			<view class="my_li" >
				<view class="my_li_msg">
					<view class="my_li_name">新密码</view>
					<m-input class="m-input" type="password"  placeholder="请输入新密码" v-model="password1"></m-input>
				</view>
			</view>
			<view class="my_li" >
				<view class="my_li_msg">
					<view class="my_li_name">确认密码</view>
					<m-input class="m-input" type="password"  placeholder="再次填写确认" v-model="password2"></m-input>
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
				btnkg:0,
				password: '',
				password1:'',
				password2: '',
			}
		},
		onShow() {
			this.btnkg=0
			if(!this.hasLogin){
				uni.reLaunch({
					url:'../main/main'
				})
			}
		},
		components: {
			
			mInput
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin','userName','loginDatas']),
			
		},
		methods: {
			set_tel(){
				var that =this
				if (!that.password) {
					uni.showToast({
						icon: 'none',
						title: '请输入原密码'
					});
					return;
				}
				if (that.password1.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				if (that.password1!=that.password2) {
					wx.showToast({
						icon: 'none',
						title: '两次密码不一致'
					})
					return
				}
				console.log(this.loginDatas)
				const data = {
					password: that.password,
					new_password: that.password1,
					re_new_password: that.password2,
					token:that.loginDatas.token
				}
				var jkurl='/api/login/changePassword'
				if(that.btnkg==0){
					that.btnkg=1
				}else{
					return
				}
				service.post(jkurl, data,
					function(res) {
						that.btnkg=0
						if (res.data.code == 1) {
				
							uni.showToast({
								icon: 'none',
								title: '操作成功'
							})
							
							uni.setStorageSync('password', that.password1)
							var password=uni.getStorageSync('password')
							console.log(password)
							setTimeout(() => {
								uni.navigateBack()
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
	input,.m-input{
		text-align: right;
		
	}
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
		width: 5em;
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
