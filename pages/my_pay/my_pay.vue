<template>
	<view class="content_wrap">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content"></block>
		</cu-custom>
		<view v-if="platform =='ios'">
			<view class="wrap_main">
				<view class="reg_tit">审核</view>
				<view class="kfwx">客服微信 <text>fangmomo123</text></view>
			</view>
		</view>
		<view v-else>
			<view class="wrap_main">
				<view class="reg_tit">支付</view>
				<view class="kfwx">会员费 <text>￥</text><text class="hy_money">200</text></view>
				<view class="dis_flex aic ju_a pay_list">
					<view class="pay_type" @tap="pay_fuc(0)">
						<image v-if="pay_type==1" class="pay_type" src="../../static/img/pay11.png" mode=""></image>
						<image v-if="pay_type==0" class="pay_type" src="../../static/img/pay12.png" mode=""></image>
					</view>
					<view  class="pay_type" @tap="pay_fuc(1)">
						<image  v-if="pay_type==0" class="pay_type" src="../../static/img/pay21.png" mode=""></image>
						<image  v-if="pay_type==1" class="pay_type" src="../../static/img/pay22.png" mode=""></image>
					</view>
				</view>
				<view class="btn-row">
					<button type="primary" class="primary" @tap="pay">确认支付</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				pay_type:0
			}
		},
		computed: mapState(['platform', 'hasLogin', 'userName']),
		onLoad() {
			// platform
			uni.getSystemInfo({
			    success: function (res) {
			        
			        console.log(res.platform);
			    }
			});
		},
		methods: {
			pay_fuc(num){
				if(this.pay_type==num){
					return
				}
				this.pay_type=num
				console.log(this.pay_type)
			},
			pay(){
				uni.showToast({
					title:'支付'
				})
			}
		}
	}
</script>

<style scoped>
.wrap_main{
		width: 100%;
		padding: 0 68upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.kfwx{
		color: #1A1A1A;
		font-size: 14px;
	}
	.kfwx text{
		color: #3171F5;
		font-size: 16px;
		margin-left: 20px;
	}
	.kfwx .hy_money{
		margin-left: 0;
		font-size: 30px;
		font-weight: bold;
	}
	uni-button.primary {
		margin-top: 70px;
	    background-color: rgba(49,113,245,1);
	}
	.pay_list{
		margin-top: 80px;
	}
	.pay_type{
		width: 278upx;
		height: 118upx;
	}
</style>
