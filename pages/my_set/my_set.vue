<template>
	<view class="content_wrap_f3">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" >设置</block>
		</cu-custom>
		
		<view class="hx20"></view>
		<view class="my_list">
			<view class="my_li" >
				<view class="my_li_msg">
					<view class="my_li_name">头像</view>
					<view class="dis_flex aic">
						<!-- <image v-if="!tximg" class="user_tx" :src="getimg(loginDatas.avatar)" mode="aspectFill"></image> -->
						<!-- <image v-if="tximg" class="user_tx" :src="imgurl+tximg" mode="aspectFill"></image> -->
						<!-- <image v-if="tximg" class="user_tx" :src="tximg" mode="aspectFill"></image> -->
						<avatar stretch="short" 
						       selWidth="400upx" selHeight="400upx" @upload="myUpload" :avatarSrc="tximg?getimg(tximg):getimg(loginDatas.avatar)"
						       avatarStyle="width: 100upx; height: 100upx; border-radius: 100%;">
						   </avatar>
						<text class="iconfont iconnext"></text>
					</view>
				</view>
			</view>
			<view class="my_li" @tap="jump"  data-url="../my_gs/my_gs" data-login='true' :data-haslogin='hasLogin'>
				<view class="my_li_msg">
					<view class="my_li_name">公司</view>
					<view>{{loginDatas.company?loginDatas.company:''}}<text class="iconfont iconnext"></text></view>
				</view>
			</view>
			<view class="my_li" @tap="jump"  data-url="../my_name/my_name" data-login='true' :data-haslogin='hasLogin'>
				<view class="my_li_msg">
					<view class="my_li_name">称呼</view>
					<view>{{loginDatas.nickname}}<text class="iconfont iconnext"></text></view>
				</view>
			</view>
			<view class="my_li" @tap="jump"  data-url="../my_tel/my_tel" data-login='true' :data-haslogin='hasLogin'>
				<view class="my_li_msg">
					<view class="my_li_name">手机</view>
					<view>{{loginDatas.phone}}<text class="iconfont iconnext"></text></view>
				</view>
			</view>
			<view class="my_li" @tap="jump"  data-url="../my_pwd/my_pwd" data-login='true' :data-haslogin='hasLogin'>
				<view class="my_li_msg">
					<view class="my_li_name">密码</view>
					<view>修改密码<text class="iconfont iconnext"></text></view>
				</view>
			</view>
			 
		</view>
		<view class="btn-row">
			
			<button v-if="hasLogin" type="default" class="default" @tap="bindLogout">退出登录</button>
		</view>
	</view>
</template>

<script>
	import avatar from "../../components/yq-avatar/yq-avatar.vue";
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				btnkg:0,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				tximg:'',
			};
		},
		onLoad() {
			var that =this
			
		},
		
		onShow() {
			if(!this.hasLogin){
				uni.reLaunch({
					url:'../main/main'
				})
			}
		},
		components: {
				avatar
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin','userName','loginDatas']),
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				
				return style
			}
		},
		methods: {
			...mapMutations(['login','logout','logindata']),
			getimg(img){
				return service.getimg(img)
			},
			myUpload(rsp) {
				var that =this
					var tximg = rsp.path; //更新头像方式一
					uni.uploadFile({
						url: service.IPurl+'/api/upload', //仅为示例，非真实的接口地址
						filePath:tximg,
						name: 'file',
						formData: {
							token: that.loginDatas.token
						},
						success: (uploadFileRes) => {
							console.log(uploadFileRes.data);
							var ndata = JSON.parse(uploadFileRes.data)
							if(ndata.code==1){
								that.tximg= ndata.data
								that.set_tel()
							}
						}
					});
					//rsp.avatar.imgSrc = rsp.path; //更新头像方式二
			},
			set_tel(){
				var that =this
				
				const data = {
					avatar: that.tximg,
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
			uptx() {
				var that = this
				// 从相册选择1张图
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: function(res) {
						console.log(res.tempFiles[0])
						var tximg = res.tempFilePaths[0]
						var tximg_h5 = res.tempFiles[0]
						that.tximg=tximg
						return
						uni.uploadFile({
							url: service.IPurl+'/api/upload', //仅为示例，非真实的接口地址
							
							filePath:tximg,
							name: 'file',
							formData: {
								token: that.loginDatas.token
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
								var ndata = JSON.parse(uploadFileRes.data)
								if(ndata.code==1){
									that.tximg=ndata.msg
								}
							}
						});
					}
				});
			},
			
			dblogin(){
				var that =this
				if(!uni.getStorageSync('phone')){
					uni.reLaunch({
						url:'pages/login/login'
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
			
			bindLogout() {
				this.logout();
				uni.setStorageSync('phone','')
				
				uni.removeStorageSync('phone')
				uni.removeStorageSync('lahei')
				uni.showToast({
					icon:'none',
					title:'正在退出'
				})
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				// if (this.forcedLogin) {
					setTimeout(()=>{
						uni.reLaunch({
							url: '/pages/main/main',
						});
					},1000)
				// }
			}
		}
	}
</script>

<style scoped>
	
	
	.my_msg{
		position: relative;
		top: -50upx;
		display: flex;
	}
	.user_tx{
		width: 100upx;
		height: 100upx;
		border-radius: 5px;
	}
	.user_jj{
		flex: 1;
		height: 100upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.user_name{
		color: #1A1A1A;
		font-size: 18px;
		line-height: 18px;
	}
	.user_dw{
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #999;
		font-size: 14px;
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
		height: 120upx;
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
		color: #999;
		font-size: 14px;
	}
	.my_li_name{
		font-size: 18px;
		color: #1a1a1a;
	}
	.iconnext{
		color: #999;
		font-size: 14px;
		margin-left: 30upx;
	}
	.btn-row{
		padding: 10px 0;
	}
	button.default {
		background-color: #fff;
		font-size: 18px;
		color: #1A1A1A;
	}
	button.primary{
		width: 100px;
		height: 60upx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(49,113,245,.5);
		font-size: 18px;
		color: #fff;
		border-radius: 60upx;
		margin-top: 20upx;
		margin-left: 0;
	}
</style>
