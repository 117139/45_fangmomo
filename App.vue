<script>	
	import Vue from 'vue'
	import service from './service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				btnkg:0,
				
			};
		},
		onLaunch: function() {
			var that=this
			console.log('App Launch');
			uni.getSystemInfo({
				success: function(e) {
					console.log(e.platform);
					that.setplatform(e.platform)
					// #ifndef MP
					console.log(e.statusBarHeight)
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
			
					// #ifdef MP-WEIXIN || MP-QQ
					Vue.prototype.StatusBar = e.statusBarHeight;
					let capsule = wx.getMenuButtonBoundingClientRect();
					if (capsule) {
						Vue.prototype.Custom = capsule;
						// Vue.prototype.capsuleSafe = uni.upx2px(750) - capsule.left + uni.upx2px(750) - capsule.right;
						Vue.prototype.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					}
					// #endif		
				
			
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
			that.dblogin()
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {
				...mapMutations(['login','logindata','logout','setplatform']),
				dblogin(){
					var that =this
					if(!uni.getStorageSync('phone')){
						uni.showToast({
						    icon: 'none',
						    title: '请重新登录账号'
						  })
						
						setTimeout(()=>{
							uni.reLaunch({
								url:'./pages/login/login'
							},2000)
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
								var phone=uni.getStorageSync('phone')
								console.log(phone)
								uni.setStorageSync('password', password)
								
									uni.switchTab({
										url: './pages/main/main'
									})
								
								
								
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

<style>
	/* 头条小程序需要把 iconfont 样式放到组件外 */
	@import "components/m-icon/m-icon.css";
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "static/iconfont.css";
	/*每个页面公共css */
	.nav_right{
		color: #3171F5;
	}
	page {
		min-height: 100%;
		display: flex;
		font-size: 16px;
		
	}
	.content1{
		font-weight: bold;
		color: #666;
	}
	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* #ifdef MP-ALIPAY */
	page {
		min-height: 100vh;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		/* min-height: 100%; */
		display: flex;
		flex: 1;
	}

	.content_wrap {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #fff;
		/* padding: 10px; */
	}
	.content_wrap_f3{
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #F3F4F6;
	}
	.input-group {
		background-color: #ffffff;
		position: relative;
	}

	.dis_flex{
		display: flex;
	}
	.aic{
		align-items: center;
	}
	.ju_a{
		justify-content: space-around;
	}
	.ju_b{
		justify-content: space-between;
	}
	.ju_c{
		justify-content: center;
	}
	
	.oh1 {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 1;
	    -webkit-box-orient: vertical;
	}
	
	.oh2 {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	}
	
	.oh3 {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 3;
	    -webkit-box-orient: vertical;
	}
	
	.oh4 {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-line-clamp: 4;
	    -webkit-box-orient: vertical;
	}
	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
		font-size: 18px;
		line-height: 40px;
	}

	.input-row .title {
		width: 72px;
		padding-left: 15px;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 8px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		padding: 10px 0;
	}

	button.primary {
		background-color: rgba(49,113,245,.5);
		font-size: 36upx;
	}
	.reg_tit {
		padding-top: 100upx;
		font-size: 48upx;
		line-height: 48upx;
		padding-bottom: 26px;
		color: #1A1A1A;
	}
	.view_t{
		color: #1A1A1A;
		font-size: 24upx;
		padding: 14px 0 0;
	}
	.view_i{
		height: 45px;
		font-size: 36upx;
		border-bottom: 1px solid #DBDBDB;
	}
	.view_i input,.view_i .uni-input-input{
		font-size: 36upx!important;
	}
	.m-input-view{
		padding-left: 0!important;
	}
	.c1a{
		color: #1a1a1a;
	}
	.cu-bar .content{
		font-weight: bold;
	}
	.zanwu{
		width: 100%;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32upx;
		color: #999;
	}
	
	.xieyi_main image{
			 max-width: 100%!important;
	}
	.xieyi_main img{
			 max-width: 100%!important;
	}
	.cf00{
		color: #f00;
	}
</style>
