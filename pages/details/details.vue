<template>
	<view class="content_wrap" :style="style0">
		<!-- <cu-custom bgColor="bg-white" :isBack="true" class="cu-custom">
			<block slot="backText"></block>
			<block slot="content" >房源详情</block>
		</cu-custom> -->
		<view  class="cu-bar fixed bg-white" :style="style">
			<view class="action" style="width: 2em;">
				<text class="cuIcon-back iconfont iconicon-test" @tap="back_fuc"><span></span></text>
			</view>
			<view class="content1" style="">房源详情</view>
			<view class="nav_right" style="width: 2em;"></view>
		</view>
		<view v-if="datas.img&&datas.img.length>0" class="xq_banner">
			<swiper class="xq_swiper" :autoplay="false" :interval="3000" :duration="1000" :circular="true" @change="swi_change">
				<swiper-item v-for="(item,index) in datas.img">
					<!-- <view class="swiper-item"> -->
						<image class="banner_img" :src="getimg(item)" mode="aspectFill"></image>
						<!-- <image class="banner_img" src="../../static/img/fang_img.jpg"></image> -->
					<!-- </view> -->
				</swiper-item>
			</swiper>
			<view v-if="datas.img&&datas.img.length>0" class="xq_swi_index">{{current}}/{{datas.img.length}}</view>
		</view>
		<view v-if="datas" class="xq_box">
			<view class="xq_tit">
				<view class="xq_name" v-if="hasLogin">{{datas.estates.title?datas.estates.title:''}}</view>
				<view class="xq_name" v-if="!hasLogin">房嬷嬷小区</view>
				<view class="xq_cz" v-if="hasLogin">
					<view class="cz_li" v-if="!datas.collect" @tap="shoucang" :data-id="datas.id">
						<text class="iconfont iconshoucang-copy"></text>
						<text>收藏</text>
					</view>
					<view class="cz_li" v-if="datas.collect" @tap="shoucang" :data-id="datas.id">
						<text class="iconfont iconredshoucang"></text>
						<text>已收藏</text>
					</view>
					<view class="cz_li"@tap="jump" data-url="/pages/jubao/jubao">
						<text class="iconfont iconjubao"></text>
						<text>举报</text>
					</view>
					<view class="cz_li" @tap="lahei_fuc(datas.users.id)">
						<text class="iconfont iconlahei"></text>
						<text>拉黑</text>
					</view>
					<!-- <view class="cz_li" @tap="share_xq" :data-id="datas.id">
						<text class="iconfont iconfenxiang"></text>
						<text>分享</text>
					</view> -->
				</view>
			</view>
			<view class="xq_pri">
				<view class="xq_pri1">
					<view class="xqp1">{{getpri(datas.price)}}</view>
					<view class="xqp2">售价</view>
				</view>
				<view  class="xq_pri_sg" v-if="datas.houseTypes"></view>
				<view class="xq_pri1" v-if="datas.houseTypes">
					<view class="xqp1">{{datas.houseTypes.title}}</view>
					<view class="xqp2">户型</view>
				</view>
				<view  class="xq_pri_sg"></view>
				<view class="xq_pri1">
					<view class="xqp1">{{getmj(datas.proportion)}}</view>
					<view class="xqp2">面积</view>
				</view>
			</view>
			<view class="xq_msg">
				<!-- //rent_out_type -->
				<view class="xq_msg1"  v-if="datas.rentOutTypes">
					<text>方式：</text><text class="c1a">{{datas.rentOutTypes.title}}</text>
				</view>
				<view class="xq_msg1"  v-if="datas.payments">
					<text>付款：</text><text class="c1a">{{datas.payments.title}}</text>
				</view>
				<view class="xq_msg1" >
					<text>独家：</text><text class="c1a">{{datas.exclusive==1?'是':'否'}}</text>
				</view>
				<view class="xq_msg1" v-if="datas.jishous">
					<text>房源：</text><text class="c1a">{{datas.jishous.title}}</text>
				</view>
				<view class="xq_msg1" v-if="datas.premisesPermits">
					<text>房本：</text><text class="c1a">{{datas.premisesPermits.title}}</text>
				</view>
				<view class="xq_msg1" v-if="datas.orientations">
					<text>朝向：</text><text class="c1a">{{datas.orientations.title}}</text>
				</view>
				<view class="xq_msg1" v-if="datas.floor_id">
					<text>楼层：</text><text class="c1a">{{datas.floor_id+'层'}}</text>
				</view>
				<view class="xq_msg1" v-if="datas.cash_pledge">
					<text>押金：</text><text class="c1a">{{datas.cash_pledge}}</text>
				</view>
				<view class="xq_msg1" v-if="datas.carbarns">
					<text>车库：</text><text class="c1a">{{datas.carbarns.title}}</text>
				</view>
				<view class="xq_msg1" v-if="datas.homeTypes">
					<text>类型：</text><text class="c1a">{{datas.homeTypes.title}}</text>
				</view>
				<view class="xq_msg1" v-if="datas.fitments">
					<text>装修：</text><text class="c1a">{{datas.fitments.title}}</text>
				</view>
			</view>
		</view>
		<view class="xq_bottom" v-if="datas.users">
			<image class="call_tel" :src="getimg(datas.users.avatar)" mode="aspectFill"></image>
			<view class="call_msg">
				<view class="call_name"  v-if="hasLogin">{{datas.users.nickname}}</view>
				<view class="call_dw" v-if="hasLogin">{{datas.users.company}}</view>
			</view>
			<view class="call_btn" @tap="call_tel" :data-tel="datas.users.phone">联系TA</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	// import simpleAddress from '@/components/simple-address/simple-address.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				id:'',
				btnkg:0,
				title:'房源详情',
				current:1,
				imgs:[
					'../../static/img/fang_img.jpg',
					'../../static/img/fang_img1.jpg',
					'../../static/img/fang_img2.jpg',
					'../../static/img/fang_img3.jpg',
					'../../static/img/fang_img4.jpg',
					'../../static/img/fang_img5.jpg',
				],
				sc_type:0,
				datas:'',
				my_issue:''
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin','userName','loginDatas']),
			style0() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var padd_top = CustomBar
				var style = `padding-top:${padd_top}px;`;
				
				return style
			},
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
			
				return style
			},
		},
		onLoad(option) {
			this.id= option.id
			console.log(this.id)
			if(option.my_issue==1){
				this.my_issue=1
			}
			this.getdata()
		},
		onPullDownRefresh() {
			console.log('下拉')
			this.getdata()
		},
		methods: {
			...mapMutations(['lahei']),
			jump(e){
				if(!this.hasLogin){
					uni.navigateTo({
						url: '../login/login'
					});
					return
				}
				service.jump(e)
			},
			lahei_fuc(id){
				if(!this.hasLogin){
					uni.navigateTo({
						url: '../login/login'
					});
					return
				}
				var that =this
				uni.showModal({
				    title: '提示',
				    content: '是否拉黑该发布者，拉黑后将不再显示该发布者发布的信息',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				            console.log(id);
										uni.showToast({
											title:'操作成功'
										})
										var laheiArr=uni.getStorageSync('lahei')
										laheiArr+=''
										laheiArr=laheiArr.split(',')
										laheiArr.push(id)
										laheiArr=laheiArr.join(',')
										uni.setStorageSync('lahei', laheiArr)
										setTimeout(function(){
											uni.navigateBack()
										},1000)
										that.lahei(id)
										
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			back_fuc() {
				uni.navigateBack()
			},
			getimg(img){
				return service.getimg(img)
			},
			getpri(pri){
				return service.getpri(pri)
			},
			getmj(mj){
				return service.getmj(mj)
			},
			getdata(){
				var that =this
				var data = {
					id:that.id,
					// my_issue:1,
					token:that.loginDatas.token,
				}
				if(that.my_issue==1){
					data = {
						id:that.id,
						my_issue:1,
						token:that.loginDatas.token,
					}
				}
				//selectSaraylDetailByUserCard
				var jkurl = '/api/issue/show'
				
				
				service.post(jkurl, data,
					function(res) {
						
						// if (res.data.code == 1) {
						if (res.data.code == 1) {
							var datas = res.data.data
							console.log(typeof datas)
							
							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							console.log(datas)
						
								 that.datas = datas
								
								
								
								
								that.btnkg=0
				
						} else {
							that.btnkg=0
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
						
							uni.showToast({
								icon: 'none',
								title: '获取数据失败'
							})
					
					}
				)
			},
			share_xq(e){
				console.log(e.currentTarget.dataset.id)
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 1,
				    summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			},
			swi_change(e){
				// console.log(e.detail.current)
				this.current=e.detail.current+1
			},
			shoucang(){
				if(!this.hasLogin){
					uni.navigateTo({
						url: '../login/login'
					});
					return
				}
				// this.sc_type=!this.sc_type
				// console.log(this.sc_type)
				///api/my/collect
				var that =this
				var data = {
					id:that.id,
					token:that.loginDatas.token,
				}
				//selectSaraylDetailByUserCard
				var jkurl = '/api/my/collect'
				
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
				service.post(jkurl, data,
					function(res) {
						
						// if (res.data.code == 1) {
						if (res.data.code == 1) {
							
							
							that.getdata()
								
								uni.showToast({
									icon:'none',
									title:'操作成功'
								})
								
								
								that.btnkg=0
				
						} else {
							that.btnkg=0
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
						
							uni.showToast({
								icon: 'none',
								title: '获取数据失败'
							})
					
					}
				)
			},
			call_tel(e){
				if(!this.hasLogin){
					uni.navigateTo({
						url: '../login/login'
					});
					return
				}
				uni.makePhoneCall({
				    phoneNumber: e.currentTarget.dataset.tel+'' 
				});
			},
		}
	}
</script>

<style scoped>
	.banner_img{
		width: 100%;
		height: 500upx;
	}
	.xq_banner{
		width: 100%;
		height: 500upx;
		position: relative;
	}
	.xq_swiper{
		width: 100%;
		height: 500upx;
		position: absolute;
		z-index: 10;
	}
	.xq_swi_index{
		width:120upx;
		height:40upx;
		background:rgba(0,0,0,.5);
		border-radius:20upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size:20upx;
		font-weight:400;
		color:rgba(255,255,255,1);
		position: absolute;
		z-index: 110;
		bottom: 20upx;
		left: 50%;
		margin-left: -60upx;
	}
	.xq_box{
		width: 100%;
		padding: 32upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.xq_tit{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.xq_name{
		flex: 1;
		font-size: 48upx;
		color: #1A1A1A;
		line-height: 55upx;
		font-weight:500;
	}
	.xq_cz{
		
		flex: none;
		display: flex;
		align-items: center;
		justify-content: space-around
	}
	.cz_li{
		width: 90upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 20upx;
		color: #1A1A1A;
	}
	.cz_li .iconfont{
		margin-bottom: 6upx;
	}
	.xq_pri{
		margin-top: 40upx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.xq_pri1{
		flex: 1;
	}
	.xq_pri_sg{
		width:2upx;
		height:50upx;
		background:rgba(238,238,238,1);
		margin: 0 30upx;
	}
	.xqp1{
		color: #FE6043;
		font-size: 32upx;
		font-weight:500;
	}
	.xqp2{
		color: #999;
		font-size: 24upx;
	}
	.xq_msg{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		margin-top: 30upx;
	}
	.xq_msg1{
		width: 50%;
		font-size: 28upx;
		color: #999;
		margin-bottom: 20upx;
	}
	.xq_msg1:nth-child(2n){
		padding-left: 30upx;
		box-sizing: border-box;
	}
	.xq_bottom{
		width: 100%;
		height: 120upx;
		background: #fff;
		border-top: 1px solid #EEEEEE;
		padding: 0 32upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		bottom: 0;
	}
	.call_tel{
		width:80upx;
		height:80upx;
		border-radius:50%;
		margin-right: 23upx;
	}
	.call_btn{
		font-size: 36upx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		width:240upx;
		height:80upx;
		background:#3171F5;
		border-radius:12upx;
		margin-left: 23upx;
	}
	.call_msg{
		flex: 1;
	}
	.call_name{
		font-size: 32upx;
		color: #1a1a1a;
	}
	.call_dw{
		font-size: 20upx;
		color: #666;
	}
	.iconredshoucang{
		color: #ff0000;
	}
</style>
