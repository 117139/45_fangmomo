<template>
	<view class="content_wrap">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<view class="xq_banner">
			<swiper class="xq_swiper" :autoplay="true" :interval="3000" :duration="1000" circular="true" @change="swi_change">
				<swiper-item v-for="(item,index) in imgs">
					<!-- <view class="swiper-item"> -->
						<image class="banner_img" :src="item" mode="aspectFill"></image>
					<!-- </view> -->
				</swiper-item>
			</swiper>
			<view class="xq_swi_index">{{current}}/{{imgs.length}}</view>
		</view>
		<view class="xq_box">
			<view class="xq_tit">
				<view class="xq_name">{{datas.name}}</view>
				<view class="xq_cz">
					<view class="cz_li" v-if="!sc_type" @tap="shoucang">
						<text class="iconfont iconshoucang-copy"></text>
						<text>收藏</text>
					</view>
					<view class="cz_li" v-if="sc_type" @tap="shoucang">
						<text class="iconfont iconredshoucang"></text>
						<text>已收藏</text>
					</view>
					<view class="cz_li">
						<text class="iconfont iconfenxiang"></text>
						<text>分享</text>
					</view>
				</view>
			</view>
			<view class="xq_pri">
				<view class="xq_pri1">
					<view class="xqp1">175.5万</view>
					<view class="xqp2">售价</view>
				</view>
				<view  class="xq_pri_sg"></view>
				<view class="xq_pri1">
					<view class="xqp1">175.5万</view>
					<view class="xqp2">售价</view>
				</view>
			</view>
			<view class="xq_msg">
				<view class="xq_msg1"><text>独家：</text><text class="c1a">否</text></view>
				<view class="xq_msg1"><text>房源：</text><text class="c1a">零手房</text></view>
				<view class="xq_msg1"><text>房本：</text><text class="c1a">满二年</text></view>
				<view class="xq_msg1"><text>装修：</text><text class="c1a">毛胚</text></view>
			</view>
		</view>
		<view class="xq_bottom">
			<image class="call_tel" src="../../static/img/tx_m2.jpg" mode="aspectFill"></image>
			<view class="call_msg">
				<view class="call_name">陈女士</view>
				<view class="call_dw">宜兴超级房产中介</view>
			</view>
			<view class="call_btn" @tap="call_tel" data-tel="18300000000">联系TA</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
				datas:{
					name:'万科九如城',
					name1:'万科九如城',
					name2:'万科九如城',
				}
			}
		},
		methods: {
			swi_change(e){
				// console.log(e.detail.current)
				this.current=e.detail.current+1
			},
			shoucang(){
				this.sc_type=!this.sc_type
				console.log(this.sc_type)
			},
			call_tel(e){
				uni.makePhoneCall({
				    phoneNumber: e.currentTarget.dataset.tel+'' 
				});
			},
		}
	}
</script>

<style>
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
		font-size: 36upx;
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
