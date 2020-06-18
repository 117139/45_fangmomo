<template>
	<view class="content_wrap"  :style="style0">
		<!-- <cu-custom bgColor="" class="cu-custom">
			<block slot="content">登录</block>
		</cu-custom> -->
		<view class="cu-custom" :style="style">
			我的
		</view>
		<view class="my_box">
			<view class="my_msg" v-if="!hasLogin">
				<image class="user_tx" src="../../static/img/tx_m.jpg" mode="aspectFill"></image>  
				<view class="user_jj">
					<button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
				</view>
			</view>
			<view class="my_msg" v-if="hasLogin"  @tap="jump" data-url="../my_set/my_set">
				<image class="user_tx" src="../../static/img/tx_m.jpg" mode="aspectFill"></image>  
				<view class="user_jj">
					<view class="user_name">陈女士（15858686868）</view>
					<view class="user_dw">
						<view class="d1">真厉害房产中介公司</view>
						<text class="iconfont iconnext"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="hx20"></view>
		<view class="my_list">
			<view class="my_li" @tap="jump"  data-url="../my_sc/my_sc" data-login='true'>
				<view class="my_icon">
					<image src="../../static/img/my/my1.png" mode=""></image>
				</view>
				<view class="my_li_msg">
					<view class="my_li_name">我的收藏</view>
					<text class="iconfont iconnext"></text>
				</view>
			</view>
			<view class="my_li" @tap="jump"  data-url="../my_fy/my_fy" data-login='true'>
				<view class="my_icon">
					<image src="../../static/img/my/my2.png" mode="" style="height: 46upx;"></image>
				</view>
				<view class="my_li_msg">
					<view class="my_li_name">我的房源</view>
					<view>已发布36个房源<text class="iconfont iconnext"></text></view>
				</view>
			</view>
			<view class="hx20"></view>
			<view class="my_li" @tap="jump" data-url="../xieyi/xieyi?type=2">
				<view class="my_icon">
					<image src="../../static/img/my/my3.png" mode="" style="height: 36upx;"></image>
				</view>
				<view class="my_li_msg">
					<view class="my_li_name">关于房嬷嬷</view>
					<text class="iconfont iconnext"></text>
				</view>
			</view>
			<view class="my_li" @tap="jump" data-url="../kefu/kefu" data-login='true'>
				<view class="my_icon">
					<image src="../../static/img/my/my4.png" mode=""></image>
				</view>
				<view class="my_li_msg">
					<view class="my_li_name">联系客服</view>
					<text class="iconfont iconnext"></text>
				</view>
			</view>
			<view class="my_li" @tap="jump" data-url="../xieyi/xieyi">
				<view class="my_icon">
					<image src="../../static/img/my/my5.png" mode=""></image>
				</view>
				<view class="my_li_msg">
					<view class="my_li_name">隐私协议</view>
					<text class="iconfont iconnext"></text>
				</view>
			</view>
			<view class="hx20"></view>
			<view class="my_li" @tap="jump" data-url="../my_set/my_set" data-login='true'>
				<view class="my_icon">
					<image src="../../static/img/my/my6.png" mode=""></image>
				</view>
				<view class="my_li_msg">
					<view class="my_li_name">设置</view>
					<text class="iconfont iconnext"></text>
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
				btnkg:0,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin']),
			style0() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var padd_top=CustomBar
				var style = `padding-top:${padd_top}px;`;
			
				return style
			},
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				
				return style
			}
		},
		methods: {
			...mapMutations(['logout']),
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
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
				
				var datas=e.currentTarget.dataset
				if(datas.login){
					if(!that.hasLogin){
						uni.navigateTo({
							url: '../login/login',
						});
						return
					}
				}
				console.log(e.currentTarget.dataset.url)
				console.log(datas.url)
				uni.navigateTo({
					url: e.currentTarget.dataset.url,
				});
			},
			
			bindLogout() {
				this.logout();
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../login/login',
					});
				}
			}
		}
	}
</script>

<style scoped>
	.content_wrap{
		background: #F3F4F6;
		padding-top: 200upx;
	}
	.cu-custom{
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
		background: #F3F4F6;
		font-weight: bold;
		color: #1A1A1A;
		font-size: 40upx;
	}
	.cu-bar .content{
		margin: 0!important;
	}
	.my_box{
		margin-top: 60px;
		width:100vw;
		height:120upx;
		padding: 0 28upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		background:rgba(255,255,255,1);
		border-radius:20upx 20upx 0 0 ;
	}
	.my_msg{
		position: relative;
		top: -50upx;
		display: flex;
	}
	.user_tx{
		width: 100upx;
		height: 100upx;
		border-radius: 5px;
		margin-right: 18upx;
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
		font-size: 36upx;
		line-height: 36upx;
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
	}
	.my_icon{
		width: 120upx;
		height: 120upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.my_icon image{
		width: 45upx;
		height: 42upx;
	}
	.my_li_msg{
		flex: 1;
		padding-right: 28upx;
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
		margin-left: 10upx;
	}
	.btn-row{
		padding: 10px 28upx;
	}
	button.default {
		background-color: rgba(49,113,245,.5);
		font-size: 18px;
		color: #fff;
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
