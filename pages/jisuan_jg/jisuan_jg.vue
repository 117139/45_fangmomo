<template>
	<view class="content_wrap" :style="style0">
		<cu-custom bgColor="bg-white" :isBack="true" >
			<block slot="backText"></block>
			<block slot="content">商业贷款</block>
		</cu-custom>
		<view class="fb_type" :style="style1">
			<view :class="{'cur':fb_type==0}" @tap="fb_fuc(0)">等额本息</view>
			<view :class="{'cur':fb_type==1}" @tap="fb_fuc(1)">等额本金</view>
		</view>
		<view class="fb_list">
			<view class="jg_box">
				<view class="jg_tit">每月应还</view>
				<view class="jg_num"><text>2578.18</text>元</view>
				<view class="num_list">
					<view class="num_li">
						<view class="num_name">贷款总额</view>
						<view class="num_num">50万</view>
					</view>
					<view class="num_li">
						<view class="num_name">利息总额</view>
						<view class="num_num">42.81</view>
					</view>
					<view class="num_li">
						<view class="num_name">贷款年限</view>
						<view class="num_num">30年</view>
					</view>
				</view>
			</view>
			<view class="jg_tip">每月还款金额不变，其中还款的本金逐月递增，利息逐月递减。计算结果仅供参考。
			</view>
			
			<view class="jg_table">
				<view class="jg_tr">
					<view class="jg_td">期数</view>
					<view class="jg_td">月供总额</view>
					<view class="jg_td">月供本金</view>
					<view class="jg_td">月供利息</view>
					<view class="jg_td">剩余本金</view>
				</view>
				<view class="jg_tr" v-for="(item,index) in 10">
					<view class="jg_td">{{index+1}}</view>
					<view class="jg_td">2578.18</view>
					<view class="jg_td">640.76</view>
					<view class="jg_td">1937.5</view>
					<view class="jg_td">4999359.32</view>
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import service from '../../service.js';
	import simpleAddress from '@/components/simple-address/simple-address.vue';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				cityPickerValueDefault: [0, 0, 1],
				pickerText: '',
				btnkg: 0,
				fb_type: 0,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				
				
			};
		},
		components: {
			simpleAddress
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin']),
			style0() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var padd_top = CustomBar +50
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
				var padd_top = CustomBar
				var style = `top:${padd_top}px;`;

				return style
			},
		},
		onPullDownRefresh() {
			console.log('下拉')
			uni.startPullDownRefresh();
		},
		onReachBottom() {
			console.log('上拉')
		},
		methods: {
			
			
			
			
			fb_fuc(num) {
				if (this.fb_type == num) {
					return
				}
				this.fb_type = num
				console.log(this.fb_type)
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
				if (datas.login) {
					if (!that.hasLogin) {
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
		}
	}
</script>

<style>
	
	.content_wrap {
		padding-top: 200upx;
	}

	


	.fb_type {
		background: #fff;
		width: 100%;
		height: 50px;
		display: flex;
		align-items: stretch;
		justify-content: space-around;
		padding: 0 28upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		font-size: 16px;
		color: #1A1A1A;
		position: fixed;
		z-index: 999;
		border-top: 1px solid #ddd;
		/* border-bottom: 1px solid #ddd; */
	}

	.fb_type view {
		/* width: 152upx; */

		border-radius: 6px 6px 0 0;
		display: flex;
		align-items: center;
		position: relative;
		justify-content: center;
	}

	.fb_type .cur {
		color: #3171F5;
	}
.fb_type .cur::after{
	content: '';
	position: absolute;
	bottom: 0;
	left: 50%;
	margin-left: -10px;
	width:20px;
	height:2px;
	background:rgba(49,113,245,1);
}
	.fb_list {
		width: 100%;
		padding: 0 32upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		background: #fff;
	}

	.jg_box{
		width:100%;
		height:360upx;
		background:rgba(47,114,244,1);
		border-radius:10px;
		margin-top: 23px;
		padding-top: 50upx;
		box-sizing: border-box;
	}
	.jg_tit{
		font-size: 14px;
		color: #fff;
		text-align: center;
		margin-bottom: 34upx;
	}
	.jg_num{
		font-size: 14px;
		color: #fff;
		text-align: center;
		margin-bottom: 30upx;
	}
	.jg_num text{
		font-size: 30px;
		font-weight: bold;
	}
	.num_list{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.num_li{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.num_name{
		color:rgba(255,255,255,1);
		line-height:25px;
		font-size: 12px;
		opacity:0.3;
	}
	.num_num{
		font-size: 14px;
		color: #fff;
	}
	.jg_tip{
		margin-top: 24px;
		font-size: 12px;
		color: #1A1A1A;
		margin-bottom: 25px;
	}
	.jg_table{
		width: 100%;
	}
	.jg_tr{
		width: 100%;
		height:25px;
		background:rgba(238,238,238,1);
		display: flex;
		justify-content: space-between;
	}
	.jg_tr:nth-child(2n){
		background: #fff;
	}
	.jg_td{
		flex: 1;
		font-size: 10px;
		color: #1a1a1a;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
