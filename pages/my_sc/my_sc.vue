<template>
	<div class="content_wrap" :style="style0">
		<!-- <cu-custom v-if="pltype==1" bgColor="" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">我的收藏</block>
			<block slot="right" @tap="pl_fuc">批量处理</block>
		</cu-custom> -->
		<view v-if="pltype==1" class="cu-bar fixed bg-white" :style="style">
			<view class="action">
				<text class="cuIcon-back iconfont iconicon-test" @tap="back_fuc"><span></span></text>
			</view>
			<view class="content1" style="">我的收藏</view>
			<view @tap="pl_fuc" class="nav_right">批量处理</view>
		</view>
		<view v-else class="cu-bar fixed bg-white" :style="style">
			<view class="action" @tap="pl_fuc">
				取消
			</view>
			<view class="content1" style="">我的收藏</view>
			<view class="nav_right" @tap="sc_all">全部</view>
		</view>
		<van-swipe-cell v-if="pltype==1" id="swipe-cell" right-width=" 100 " :async-close="true" @close="onClose" v-for="(item,index) in data_list">
			<van-cell-group>
				<view class="data_li">
					<view class="li_msg" @tap="jump" data-url="../details/details">
						<view class="li_tit">
							<view class="li_name">御景华庭<image src="../../static/img/index/list_img.png" mode=""></image>
							</view>
							<view>今天 10:20</view>
						</view>
						<view class="li_bq">
							<view>200㎡</view>
							<view>简装</view>
							<view>满二</view>
						</view>
						<!-- <view class="li_fbr">
							<text>宜兴真厉害房产中介 </text>
							<text> 陈女士</text>
						</view> -->
					</view>
					<view class="li_msg_r">
						<view class="li_pri"><text>210</text>万</view>
						<!-- <image @tap="call_tel" data-tel="18300000000" class="list_tel" src="../../static/img/index/list_tel.png"></image> -->
					</view>

				</view>
			</van-cell-group>
			<view slot="right" class="van-swipe-cell__right">
				<!-- 取消收藏 -->
				<!-- <image @tap="call_tel" data-tel="18300000000" class="list_tel" src="../../static/img/index/list_tel.png"></image> -->
				<text class="iconfont iconguanbi fz24"></text>
				<text class="fz24">取消收藏</text>
			</view>

		</van-swipe-cell>
		<view class="data_li " v-if="pltype!=1" v-for="(item,index) in data_list">
			<view class="li_msg" @tap="jump" data-url="../details/details">
				<view class="li_tit">
					<view class="li_name">御景华庭<image src="../../static/img/index/list_img.png" mode=""></image>
					</view>
					<view>今天 10:20</view>
				</view>
				<view class="li_bq">
					<view>200㎡</view>
					<view>简装</view>
					<view>满二</view>
				</view>
				<!-- <view class="li_fbr">
					<text>宜兴真厉害房产中介 </text>
					<text> 陈女士</text>
				</view> -->
			</view>
			<view class="li_msg_r">
				<view class="li_pri"><text>210</text>万</view>
				<!-- <image @tap="call_tel" data-tel="18300000000" class="list_tel" src="../../static/img/index/list_tel.png"></image> -->
			</view>
			<view class="li_msg__right1" :class="{'cur':item.active}" @tap="togglePay(item,$event)">
				<view class="xz_box">
					<text class="iconfont icongougou"></text>
				</view>
			</view>
		</view>
		<view class="sc_box" v-if="pltype!=1">
			<view class="sc_btn" @tap="sc_fuc">
				<text class="iconfont iconguanbi"></text>
				<text>取消收藏</text>
			</view>
		</view>
		<view  class="sc_box1" v-if="pltype!=1"></view>
		<van-dialog id="van-dialog" />
	</div>
</template>
<script>
	// import wrap from '@/components/wrap';
	
    import Vue from 'vue'
	import Dialog from '../../wxcomponents/vant/dialog/dialog';
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				pltype: 1,
				title: '列表',
				btnkg: 0,
				modalName: null,
				alltype:false,
				data_list: [
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
					{},
				],

			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName']),
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
			style1() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `padding-top:${CustomBar}px;`;

				return style
			},
		},
		methods: {
			back_fuc() {
				uni.navigateBack()
			},
			call_tel(e) {
				uni.makePhoneCall({
					phoneNumber: e.currentTarget.dataset.tel + ''
				});
			},
			togglePay(item, index) {
				if (item.active) {
					Vue.set(item, 'active', false); //为item添加不存在的属性，需要使用vue提供的Vue.set( object, key, value )方法。 
				} else {
					Vue.set(item, 'active', true);
				}
			},
			sc_all(){
				var that=this
				var datas=that.data_list
				var arr=[]
				for(var i=0;i<datas.length;i++){
					if(that.alltype==true){
						Vue.set(datas[i], 'active', false);
						
					}else{
						Vue.set(datas[i], 'active', true);
						
					}
					
				}
				that.alltype=!that.alltype
			},
			sc_fuc(){
				console.log(this.data_list)
				var datas=this.data_list
				var arr=[]
				for(var i=0;i<datas.length;i++){
					if(datas[i].active){
						arr.push(i)
					}
				}
				Dialog.confirm({
					message: '确定要删除这些收藏吗？',
				}).then(() => {
					console.log('close');
				});
				console.log(arr)
			},
			onClose({
				detail
			}) {
				const {
					position,
					instance
				} = detail;
				switch (position) {
					// case 'left':
					// 	instance.close();
					// 	break;
					case 'right':
						console.log('right')
						Dialog.confirm({
							message: '确定删除该收藏吗？',
						}).then(() => {
							console.log('close');
							instance.close();
						});
						break;
				}
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

				var datas = e.currentTarget.dataset

				console.log(datas.url)
				uni.navigateTo({
					url: e.currentTarget.dataset.url,
				});
			},
			pl_fuc() {
				console.log(1)
				this.pltype = !this.pltype
				var datas=this.data_list
				var arr=[]
				for(var i=0;i<datas.length;i++){
					Vue.set(datas[i], 'active', false);
				}
			}
		},

	};
</script>

<style scoped>
	.demo-swipe-cell {
		user-select: none;
	}
	.content1{
		font-weight: bold;
		height: 38px;
		line-height: 38px;
		font-size: 32upx;
	}
	.van-swipe-cell__left,
	.van-swipe-cell__right {
/* 		display: inline-block;
 */		width: 100px;
		height: 100%;
		color: #fff;
		text-align: center;
		background-color: #f44;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		line-height: 30upx;
		
	}
	.fz24{
		font-size: 24upx;
	}
	.li_msg__right1 {
		width: 50px;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.xz_box {
		width: 15px;
		height: 15px;
		background: rgba(255, 255, 255, 1);
		/* background: #3171F5; */
		border: 1px solid rgba(153, 153, 153, 1);
		border-radius: 3px;
		font-size: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.xz_box text {
		color: #fff;
	}

	.cur .xz_box {
		background: #3171F5;
	}

	.data_list {
		width: 100%;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		padding: 80upx 32upx;
	}

	.data_li {
		width: 100%;
		/* padding: 30upx 0; */
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		padding: 30upx 32upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.li_msg {
		flex: 1;
		padding-right: 20px;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.li_msg_r {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.li_pri {
		color: #FE6043;
		font-size: 32upx;
	}

	.li_pri text {
		color: #FE6043;
		font-size: 48upx;
	}

	.list_tel {
		width: 60upx;
		height: 60upx;
		margin-top: 12upx;
	}

	.data_li+.data_li {
		border-top: 1px solid #DDDDDD;
	}

	.li_tit {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28upx;
		color: #999;
	}

	.li_name {
		color: #1A1A1A;
		font-size: 32upx;
	}

	.li_name image {
		width: 23upx;
		height: 20upx;
		margin-left: 12upx;
	}

	.li_bq {
		display: flex;
		flex-wrap: wrap;
	}

	.li_bq view {
		margin-top: 10upx;
		margin-right: 10upx;
		font-size: 20upx;
		line-height: 20upx;
		color: #666;
		border: 1px solid #ddd;
		padding: 13upx 10upx;
		border-radius: 6upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.li_fbr {
		font-size: 28upx;
		color: #1a1a1a;
		margin-top: 18upx;
	}


	.xq_box {
		width: 100%;
		height: 40px;
		background: #fff;
		border-bottom: 1px solid #DDDDDD;
		display: flex;
		align-items: stretch;
		position: fixed;
		top: 0;
		z-index: 9999;
	}

	.xz_li {
		width: 25%;
		display: flex;
		align-items: center;
		justify-content: space-around;
		font-size: 14px;
		color: #1A1A1A;
	}

	.xz_icon {
		font-size: 12px;
		color: #999;
	}

	.cu-modal .czz {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1111;
		width: 100%;
		height: 100%;
	}

	.to_my_box {
		position: absolute;
		top: 180upx;
		right: 0;
		left: 0;
		display: inline-block;
		vertical-align: middle;
		margin-left: auto;
		margin-right: auto;
		width: 100%;
		height: 640upx;
		padding-top: 10upx;
		background-color: #fff;
		overflow: hidden;
		padding-bottom: 125upx;
		box-sizing: border-box;
		z-index: 9999;
	}

	.tk_cz_box {
		border-top: 1upx solid #eee;
		padding: 33upx;
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: absolute;
		bottom: 0;
		z-index: 999999;
		background: #fff;
	}

	.tk_cz_box view {
		width: 327upx;
		height: 60upx;
		background: rgba(238, 238, 238, 1);
		border-radius: 10upx;
		font-size: 16px;
		color: #1A1A1A;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tk_cz_box .sub_btn {
		background: #3171F5;
		color: #fff;
	}

	.qy_box {
		display: flex;
	}

	.sv1 {
		width: 25%;
		height: 500upx;
		padding-left: 32upx;
		box-sizing: border-box;
		text-align: left;
	}

	.sv2 {
		width: 50%;
		display: flex;
		flex-direction: column;
	}

	.sv1 view {
		line-height: 60upx;
		font-size: 14px;
		color: #1A1A1A;
	}

	.sv2_input {
		width: 90%;
		height: 50upx;
		background: rgba(238, 238, 238, 1);
		border-radius: 8rpx;
		padding: 0 20upx !important;
		box-sizing: border-box;
		font-size: 14px;
		text-align: left;
		box-sizing: border-box;
	}

	.sv2 .sv1 {
		width: 100%;
		margin-top: 10upx;
		height: 440upx;
		padding-left: 0;
	}

	.sv1 .cur {
		color: #3171F5;
	}

	.xz_li1 {
		color: #3171F5;
	}

	.xz_li1 .xz_icon {
		color: #3171F5;
	}

	.qy_box1 {
		flex-direction: column;
	}

	.jg_list {
		width: 100%;
		padding: 20upx 32upx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
	}

	.jg_list1 {
		padding: 0 32upx 20upx;
	}

	.jg_li {
		width: 148upx;
		height: 50upx;
		background: rgba(238, 238, 238, 1);
		border-radius: 8upx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #1A1A1A;
		font-size: 20upx;
		margin-right: 30upx;
		margin-bottom: 20upx;
	}

	.jg_li.cur {
		background: #3171F5;
		color: #fff;
	}

	.jg_li:nth-child(4n) {
		margin-right: 0;
	}

	.jg_tit {
		width: 100%;
		padding: 0 32upx 20upx;
		box-sizing: border-box;
		display: flex;
		font-size: 32upx;
		color: #1A1A1A;
	}

	.jg_zdy {
		display: flex;
		align-items: center;
		font-size: 28upx;
		color: #1a1a1a;
		width: 100%;
		padding: 0 32upx 20upx;
		box-sizing: border-box;
	}

	.jg_zdy input {
		width: 200upx;
		height: 70upx;
		background: rgba(238, 238, 238, 1);
		padding: 0 20upx;
		box-sizing: border-box;
		font-size: 28upx;
		color: #1a1a1a;
	}

	.jg_zdy text {
		margin: 0 10upx;
	}
	.sc_box{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 32upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		background: #fff;
		position: fixed;
		bottom: 0;
	}
	.sc_box1{
		width: 100%;
		height: 200upx;
	}
	.sc_box .sc_btn{
		width:686upx;
		height:110upx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 20px 0px rgba(0, 0, 0, 0.1);
		border-radius:20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.sc_btn text{
		margin: 0 4px;
	}
	.cu-bar{
		align-items: center;
	}
</style>
