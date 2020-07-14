<template>
	<view class="content_wrap" :style="style0">
		<cu-custom bgColor="bg-white" :isBack="true" >
			<block slot="backText"></block>
			<block slot="content">房贷计算器</block>
		</cu-custom>
		<view class="fb_type" :style="style1">
			<view :class="{'cur':fb_type==0}" @tap="fb_fuc(0)">商业贷款</view>
			<view :class="{'cur':fb_type==1}" @tap="fb_fuc(1)">组合贷款</view>
			<view :class="{'cur':fb_type==2}" @tap="fb_fuc(2)">公积金贷款</view>
		</view>
		<view class="fb_list">
			<!-- 计算方式 -->
			<picker  @change="bindPickerChange" data-type="0" :value="index" :range="array">
				<view class="fb_li">
					<view>计算方式</view>
					<view>{{array[index]}}</view>
					<text class="iconfont iconnext"></text>
				</view>
			</picker>
			<!-- 贷款总额 -->
			<view v-if="fb_type ==1" class="fb_li">
				<view>贷款总额</view>
				<input type="number" placeholder="请输入" v-model="jiage_z"></input>
				<text class="iconfont">万</text>
				<!-- <text class="iconfont iconnext"></text> -->
			</view>
			<view v-if="fb_type ==1" class="hx20"></view>
			<!-- 公积金金额 -->
			<view v-if="fb_type==1||fb_type==2" class="fb_li">
				<view>公积金金额</view>
				<input type="number" placeholder="请输入" v-model="jiage_g"></input>
				<text class="iconfont">万</text>
				<!-- <text class="iconfont iconnext"></text> -->
			</view
			<!-- 公积金年限 -->
			<picker v-if="fb_type==1||fb_type==2" @change="bindPickerChange" data-type="3" :value="index3" range-key="name" :range="array3">
				<view class="fb_li">
					<view>公积金年限</view>
					<view>{{array3[index3].name}}</view>
					<text class="iconfont iconnext"></text>
				</view>
			</picker>
			<!-- 公积金利率 -->
			<picker v-if="fb_type==1||fb_type==2" @change="bindPickerChange" data-type="4" :value="index4" range-key="lv" :range="array4">
				<view class="fb_li">
					<view>公积金利率</view>
					<view>{{array4[index4].name}}</view>
					<text class="iconfont iconnext"></text>
				</view>
			</picker>
			<view v-if="fb_type ==1" class="hx20"></view>
			<!-- 商贷金额 -->
			<view v-if="fb_type==1||fb_type==0" class="fb_li">
				<view>商贷金额</view>
				<input type="number" placeholder="请输入" v-model="jiage"></input>
				<text class="iconfont">万</text>
			</view>
			
			<!-- 商贷年限 -->
			<picker v-if="fb_type==0||fb_type==1" @change="bindPickerChange" data-type="1" :value="index1" range-key="name" :range="array1">
				<view class="fb_li">
					<view>商贷年限</view>
					<view>{{array1[index1].name}}</view>
					<text class="iconfont iconnext"></text>
				</view>
			</picker>
			<!-- 利率方式 -->
			<picker v-if="fb_type==0||fb_type==1" @change="bindPickerChange" data-type="2" :value="index2" :range="array2">
				<view class="fb_li">
					<view>利率方式</view>
					<view>{{array2[index2]}}</view>
					<text class="iconfont iconnext"></text>
				</view>
			</picker>
			<!-- LPR -->
			<view v-if="fb_type==0||fb_type==1" class="fb_li">
				<view>LPR</view>
				<input type="number" placeholder="请输入" v-model="LPR" disabled=""></input>
				<text class="iconfont">%</text>
				<!-- <text class="iconfont iconnext"></text> -->
			</view>
			<!-- 基点 -->
			<view v-if="fb_type==0||fb_type==1" class="fb_li">
				<view>基点</view>
				<input type="number" placeholder="请输入" v-model="jidian"></input>
				<text class="iconfont">BP(‱)</text>
				<!-- <text class="iconfont iconnext"></text> -->
			</view>
			<!-- 商贷利率 -->
			<view v-if="fb_type==0||fb_type==1" class="fb_li">
				<view>商贷利率</view>
				
				<text class="iconfont">{{LPR}}%</text>
				<text class="iconfont">+</text>
				<text class="iconfont">{{jidian}}(‱)</text>
				<text class="iconfont">=</text>
				<text class=" c1a">{{sdlv}}</text>
				<text class="iconfont">%</text>
				<!-- <text class="iconfont iconnext"></text> -->
			</view>
			
			
			
			
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="jisuan_fuc" data-url="../jisuan_jg/jisuan_jg">开始计算</button>
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
				xq_name: '', //小区名称
				dujia:false,
				array: ['按贷款总额'],
				index: 0,
				jiage_z:'',
				jiage_g:'',
				jiage:'',
				LPR: '3.85',
				array1: [
					{
						name:'10年',
						num:10
					},
					{
						name:'20年',
						num:20
					},
					{
						name:'30年',
						num:30
					},
					{
						name:'40年',
						num:40
					},
				],
				index1: 0,
				array2: ['按最新LPR'],
				index2: 0,
				jidian: '',
				array3: [
					{
						name:'10年',
						num:10
					},
					{
						name:'20年',
						num:20
					},
					{
						name:'30年',
						num:30
					},
					{
						name:'40年',
						num:40
					},
				],
				index3: 0,
				louceng: '',
				array4: [
					{
						name:'最新基准利率(3.25%)',
						lv:3.25
					},
				],
				index4: 0,
				
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
				// var padd_top = CustomBar 
				var padd_top = 50 
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
			sdlv(){
				return (this.LPR*1+this.jidian*0.01).toFixed(2)
			}
		},
		onPullDownRefresh() {
			console.log('下拉')
			uni.startPullDownRefresh();
		},
		onReachBottom() {
			console.log('上拉')
		},
		methods: {
			jisuan_fuc(e){
				if(this.fb_type==1||this.fb_type==2){
					if(!this.jiage_g){
						uni.showToast({
							icon:'none',
							title:'请输入公积金金额'
						})
						return
					}
				}
				if(this.fb_type==0||this.fb_type==1){
					if(!this.jiage){
						uni.showToast({
							icon:'none',
							title:'请输入商贷金额'
						})
						return
					}
				}
				//商贷
				var arg_a=this.jiage*10000
				var arg_m=this.array1[this.index1].num*12
				var arg_b=this.sdlv/12/100
				console.log(arg_a,arg_m,arg_b)
				 var arg0=(1+arg_b)**arg_m
				 console.log(arg0)
				var arg1=arg_a*arg_b*arg0
				var arg2=arg0-1
				console.log(arg1,arg2)
				console.log(arg1/arg2)
				var mon_num=arg1/arg2
				mon_num=mon_num.toFixed(2)
				//公积金
				var arg_a1=this.jiage_g*10000
				var arg_m1=this.array3[this.index3].num*12
				var arg_b1=this.array4[this.index4].lv/12/100
				var arg01=(1+arg_b1)**arg_m1
				 console.log(arg01)
				var arg11=arg_a1*arg_b1*arg01
				var arg21=arg0-1
				var mon_num1=arg11/arg21
				mon_num1=mon_num1.toFixed(2)
				console.log(mon_num1)
				 var mon_num2=mon_num1*1+mon_num*1
				 mon_num2=mon_num2.toFixed(2)
				 var jiage_z=this.jiage+this.jiage_g
				uni.navigateTo({
					url:'../jisuan_jg/jisuan_jg?mon_num='+mon_num2+'&mon='+this.array1[this.index1].num+'&jiage='+jiage_z
				})
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				console.log(e)
				var datas = e.currentTarget.dataset
				if (datas.type == 0) {
					this.index = e.target.value
				} else if (datas.type == 1) {
					this.index1 = e.target.value
				} else if (datas.type == 2) {
					this.index2 = e.target.value
				} else if (datas.type == 3) {
					this.index3 = e.target.value
				} else if (datas.type == 4) {
					this.index4 = e.target.value
				} else if (datas.type == 5) {
					this.index5 = e.target.value
				} else if (datas.type == 6) {
					this.index6 = e.target.value
				} else if (datas.type == 7) {
					this.index7 = e.target.value
				} else if (datas.type == 8) {
					this.index8 = e.target.value
				} else if (datas.type == 9) {
					this.index9 = e.target.value
				} else if (datas.type == 10) {
					this.index10 = e.target.value
				}

			},
			
			
			fb_fuc(num) {
				if (this.fb_type == num) {
					return
				}
				this.fb_type = num
				this.jiage_z=''
				this.jiage_g=''
				this.jiage=''
				this.jidian=""
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
		/* padding-top: 100upx; */
	}

	
	.xx_list {
		width: 100%;
	}

	.xx_li {
		width: 100%;
		padding: 15px 34upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		border-bottom: 1px solid #ddd;
	}

	.xx_title {
		color: #1A1A1A;
		font-size: 16px;
		line-height: 16px;
		font-weight: bold;
	}

	.xx_time {
		margin-top: 10px;
		font-size: 10px;
		color: #999;
		margin-bottom: 7px;
	}

	.xx_time image {
		width: 12px;
		height: 12px;
		margin-right: 5px;
	}

	.xx_inr {
		font-size: 10px;
		color: #1a1a1a;
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
		border-bottom: 1px solid #ddd;
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
		
		background: #fff;
	}

	.fb_li {
		width: 100%;
		min-height: 50px;
		padding: 0 32upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
.fb_li+.fb_li,picker,picker+.fb_li{
	border-bottom: 1px solid #eee;
}
	.iconfont {
		font-size: 14px;
		color: #BFBFBF;
	}

	input {
		flex: 1;
		font-size: 16px;
		line-height: 16px;
	}

	.fb_li>view:first-child {
		width: 6em;
		flex: none;
	}

	.fb_li>view:nth-child(2) {
		flex: 1;
	}

	.upimg_box {
		flex-wrap: wrap;
	}

	.upimg_box image {
		width: 120upx;
		height: 120upx;
		margin: 5px;

	}
	.btn-row{
		padding: 20px 28upx;
		/* background: #F3F4F6; */
	}
	uni-button.primary {
	    background-color: rgba(49,113,245,1);
	}
	.hx20{
		width: 100%;
		height: 20upx;
		background: #F3F4F6;
		
	}
</style>
