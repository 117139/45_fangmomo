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
			<picker v-if="fb_type==1||fb_type==2" @change="bindPickerChange" data-type="3" :value="index3" :range="array3">
				<view class="fb_li">
					<view>公积金年限</view>
					<view>{{array3[index3]}}</view>
					<text class="iconfont iconnext"></text>
				</view>
			</picker>
			<!-- 公积金利率 -->
			<picker v-if="fb_type==1||fb_type==2" @change="bindPickerChange" data-type="4" :value="index4" :range="array4">
				<view class="fb_li">
					<view>公积金利率</view>
					<view>{{array4[index4]}}</view>
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
			<picker v-if="fb_type==0||fb_type==1" @change="bindPickerChange" data-type="1" :value="index1" :range="array1">
				<view class="fb_li">
					<view>商贷年限</view>
					<view>{{array1[index1]}}</view>
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
				<input type="number" placeholder="请输入" v-model="LPR"></input>
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
				<text class=" c1a">{{(LPR*1+jidian*0.01).toFixed(2)}}</text>
				<text class="iconfont">%</text>
				<!-- <text class="iconfont iconnext"></text> -->
			</view>
			
			
			
			
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="jump" data-url="../jisuan_jg/jisuan_jg">开始计算</button>
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
				array: ['按贷款总额', '按贷款总额1', '按贷款总额2'],
				index: 0,
				jiage_z:'',
				jiage_g:'',
				jiage:'',
				LPR: '',
				array1: ['10年', '20年', '30年', '40年'],
				index1: 0,
				array2: ['按最新LPR1', '按最新LPR2', '按最新LPR3'],
				index2: 0,
				jidian: '',
				array3: ['10年', '20年', '30年', '40年'],
				index3: 0,
				louceng: '',
				array4: ['最新基准利率(3.25%)11', '最新基准利率(3.25%)22', '最新基准利率(3.25%)33'],
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
		},
		onPullDownRefresh() {
			console.log('下拉')
			uni.startPullDownRefresh();
		},
		onReachBottom() {
			console.log('上拉')
		},
		methods: {
			
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
				console.log(this.fb_type)
			},
			sub(){
				var that =this
				if(this.fb_type==0){
					if(!that.pickerText){
						uni.showToast({
							icon:'none',
							title:'请选择所在城市'
						})
						return
					}
					if(!that.xq_name){
						uni.showToast({
							icon:'none',
							title:'请输入小区名称'
						})
						return
					}
					if(!that.jiage){
						uni.showToast({
							icon:'none',
							title:'请输入价格'
						})
						return
					}
					if(!that.mianji){
						uni.showToast({
							icon:'none',
							title:'请输入面积'
						})
						return
					}
					if(!that.louceng){
						uni.showToast({
							icon:'none',
							title:'请输入楼层'
						})
						return
					}
					
				}
				
				if(this.fb_type==1){
					if(!that.pickerText){
						uni.showToast({
							icon:'none',
							title:'请选择所在城市'
						})
						return
					}
					if(!that.xq_name){
						uni.showToast({
							icon:'none',
							title:'请输入小区名称'
						})
						return
					}
					if(!that.mianji){
						uni.showToast({
							icon:'none',
							title:'请输入面积'
						})
						return
					}
					if(!that.louceng){
						uni.showToast({
							icon:'none',
							title:'请输入楼层'
						})
						return
					}
					if(!that.zujin){
						uni.showToast({
							icon:'none',
							title:'请输入租金'
						})
						return
					}
					if(!that.yajin){
						uni.showToast({
							icon:'none',
							title:'请输入押金'
						})
						return
					}
					
				}
				if(this.fb_type==2){
					if(!that.pickerText){
						uni.showToast({
							icon:'none',
							title:'请选择所在城市'
						})
						return
					}
					if(!that.xq_name){
						uni.showToast({
							icon:'none',
							title:'请输入商铺名称'
						})
						return
					}
					if(!that.jiage){
						uni.showToast({
							icon:'none',
							title:'请输入价格'
						})
						return
					}
					if(!that.mianji){
						uni.showToast({
							icon:'none',
							title:'请输入面积'
						})
						return
					}
				}
				if(this.fb_type==3){
					if(!that.pickerText){
						uni.showToast({
							icon:'none',
							title:'请选择所在城市'
						})
						return
					}
					if(!that.xq_name){
						uni.showToast({
							icon:'none',
							title:'请输入楼盘名称'
						})
						return
					}
					if(!that.jiage){
						uni.showToast({
							icon:'none',
							title:'请输入价格'
						})
						return
					}
					if(!that.mianji){
						uni.showToast({
							icon:'none',
							title:'请输入面积'
						})
						return
					}
				}
				var value1={
					city:that.pickerText,
					xq_name:that.xq_name,
					dujia:that.dujia,
					jishou:that.array[that.index],
					leixing:that.array1[that.index1],
					jiage:that.jiage,
					huxing:that.array2[that.index2],
					mianji:that.mianji,
					chaoxiang:that.array3[that.index3],
					louceng:that.louceng,
					fangben:that.array4[that.index4],
					zhaungxiu:that.array5[that.index5],
					cheke:that.array6[that.index6],
					imgs:that.imgb
				}
				if(that.fb_type==1){
					value1={
						city:that.pickerText,
						xq_name:that.xq_name,
						dujia:that.dujia,
						louceng:that.louceng,
						huxing:that.array2[that.index2],
						mianji:that.mianji,
						chaoxiang:that.array3[that.index3],
						zujin:that.zujin,
						yajin:that.yajin,
						chuzu:that.array7[that.index7],
						pay_type:that.array8[that.index8],
						zhaungxiu:that.array5[that.index5],
						imgs:that.imgb
					}
				}
				if(that.fb_type==2){//商铺
					value1={
						city:that.pickerText,
						xq_name:that.xq_name,
						dujia:that.dujia,
						jishou:that.array[that.index],
						jiage:that.jiage,  
						mianji:that.mianji,
						zhaungxiu:that.array5[that.index5],
						fangben:that.array4[that.index4],
						imgs:that.imgb
					}
				}
				if(that.fb_type==3){//写字楼
					value1={
						city:that.pickerText,
						xq_name:that.xq_name,
						dujia:that.dujia,
						jishou:that.array[that.index],
						jiage:that.jiage,
						mianji:that.mianji,
						louceng:that.louceng,
						zhaungxiu:that.array5[that.index5],
						fangben:that.array4[that.index4],
						imgs:that.imgb
					}
				}
				console.log(that.fb_type)
				console.log(value1)
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
