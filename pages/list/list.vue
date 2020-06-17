<template>
	<view class="content_wrap">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">列表</block>
		</cu-custom>
		<view class="xq_box" :style="style1">
			
			<view v-if="xz_type==1" class="xz_li xz_li1" @tap="hideModal">
				<text class="oh1">{{qy_cur==-1?'区域':qy_arr[qy_cur]}}{{qy_cur==-1?'':qy_arr2[qy_cur2]}}{{qy_cur==-1?'':qy_arr3[qy_cur3]}}</text><text class="iconfont iconnext-copy-copy xz_icon"></text>
			</view>
			<view v-else class="xz_li" @tap="showModal" data-type="1" data-target="Modal">
				<text  class="oh1">{{qy_cur==-1?'区域':qy_arr[qy_cur]}}{{qy_cur==-1?'':qy_arr2[qy_cur2]}}{{qy_cur==-1?'':qy_arr3[qy_cur3]}}</text><text class="iconfont iconnext-copy xz_icon"></text>
			</view>
			
			<view v-if="xz_type==2" class="xz_li xz_li1" @tap="hideModal">
				<text class="oh1">{{xz_jiage}}</text><text class="iconfont iconnext-copy-copy xz_icon"></text>
			</view>
			<view  v-else class="xz_li" @tap="showModal" data-type="2" data-target="Modal">
				<text class="oh1">{{xz_jiage}}</text><text class="iconfont iconnext-copy xz_icon"></text>
			</view>
			<view  v-if="xz_type==3" class="xz_li xz_li1" @tap="hideModal">
				<text class="oh1">{{xz_mianji}}</text><text class="iconfont iconnext-copy xz_icon"></text>
			</view>
			<view  v-else class="xz_li" @tap="showModal" data-type="3" data-target="Modal">
				<text class="oh1">{{xz_mianji}}</text><text class="iconfont iconnext-copy xz_icon"></text>
			</view>
			<view v-if="xz_type==4" class="xz_li xz_li1" @tap="hideModal">
				<text>更多</text><text class="iconfont iconnext-copy-copy xz_icon"></text>
			</view>
			<view v-else class="xz_li" @tap="showModal" data-type="4" data-target="Modal">
				<text>更多</text><text class="iconfont iconnext-copy xz_icon"></text>
			</view>
		</view>
		<view class="data_list">
			<view class="data_li" v-for="(item,index) in data_list">
				<view class="li_msg" @tap="jump" data-url="../details/details">
					<view class="li_tit">
						<view class="li_name">御景华庭<image src="../../static/img/index/list_img.png" mode=""></image></view>
						<view>今天 10:20</view>
					</view>
					<view class="li_bq">
						<view>200㎡</view>
						<view>简装</view>
						<view>满二</view>
					</view>
					<view class="li_fbr">
						<text>宜兴真厉害房产中介 </text>
						<text> 陈女士</text>
					</view>
				</view>
				<view class="li_msg_r">
					<view class="li_pri"><text>210</text>万</view>
					<image @tap="call_tel" data-tel="18300000000" class="list_tel" src="../../static/img/index/list_tel.png"></image>
				</view>
			</view>
		</view>
		<!-- 弹框 -->
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="czz" @tap="hideModal">

			</view>
			<view class="to_my_box" :style="style2">
				<!-- 区域 -->
				<view class="qy_box" v-if="xz_type==1"> 
					<scroll-view scroll-y="true" class="sv1">
						<view :class="index==qy_cur ?'cur':''" v-for="(item,index) in qy_arr" :data-index="index" data-type="1" @tap="xz_fuc">{{item}}</view>
					</scroll-view>
					<scroll-view scroll-y="true" class="sv1">
						<view :class="index==qy_cur2 ?'cur':''" v-for="(item,index) in qy_arr2" :data-index="index" data-type="2" @tap="xz_fuc">{{item}}</view>
						
					</scroll-view>
					<view class="sv2">
						<!-- <input  type="text" placeholder="请输入"> -->
						<m-input class="sv2_input" type="text" clearable v-model="qy_search" @input='search_qy' placeholder="请输入"></m-input>
						<scroll-view scroll-y="true" class="sv1">
							<view :class="index==qy_cur3 ?'cur':''" v-for="(item,index) in qy_show" :data-index="index" data-type="3" @tap="xz_fuc">{{item}}</view>
						</scroll-view>
					</view>
				</view>
				<!-- 价格 -->
				<view class="qy_box qy_box1" v-if="xz_type==2"> 
					<view class="jg_list">
						<view class="jg_li" :class="index==jg_cur ?'cur':''" v-for="(item,index) in jg_show" :data-index="index" @tap="jg_xz">{{item}}</view>
					</view>
					<view class="jg_tit">自定义价格</view>
					<view class="jg_zdy">
						<input type="number" placeholder="最低价" @focus="jg_cur=-1" v-model="jg_start"></input>
						<text>万</text>
						<text>——</text>
						<input type="number" placeholder="最高价" @focus="jg_cur=-1" v-model="jg_end"></input>
						<text>万</text>
					</view>
				</view>
				<!-- 面积 -->
				<view class="qy_box qy_box1" v-if="xz_type==3"> 
					<view class="jg_list">
						<view class="jg_li" :class="index==mj_cur ?'cur':''" v-for="(item,index) in mj_show" :data-index="index" @tap="mj_xz">{{item}}</view>
					</view>
					<view class="jg_tit">自定义面积</view>
					<view class="jg_zdy">
						<input type="number" placeholder="最低面积" @focus="mj_cur=-1" v-model="mj_start"></input>
						<text>㎡</text>
						<text>——</text>
						<input type="number" placeholder="最高面积" @focus="mj_cur=-1" v-model="mj_end"></input>
						<text>㎡</text>
					</view>
				</view>
				<!-- 更多 -->
				<view class="qy_box qy_box1" v-if="xz_type==4"> 
					<view class="jg_tit">类型</view>
					<view class="jg_list jg_list1">
						<view class="jg_li" :class="index==lx_cur ?'cur':''" v-for="(item,index) in lx_show" :data-index="index" @tap="lx_xz">{{item}}</view>
					</view>
					<view class="jg_tit">装修</view>
					<view class="jg_list jg_list1">
						<view class="jg_li" :class="index==zx_cur ?'cur':''" v-for="(item,index) in zx_show" :data-index="index" @tap="zx_xz">{{item}}</view>
					</view>
				</view>
				<view class="tk_cz_box">
					<view @tap="reset_fuc">重置</view>
					<view class="sub_btn" @tap="sub_fuc">确认</view>
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
	import mInput from '../../components/m-input.vue'
	var inputt
	export default {
		components: {
			mInput
		},
		data() {
			return {
				title: '列表',
				btnkg:0,
				modalName: null,
				data_list:[
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
				],
				xz_type:0,
				type: '',
				qy_arr:[
					'宜兴',
					'溧阳1',
					'溧阳2',
					'溧阳3',
					'溧阳4',
					'溧阳5',
					'溧阳6',
					'溧阳7',
					'溧阳8',
					'溧阳9',
				],
				qy_arr2:[
					'城东',
					'城南',
					'城西',
					'城北',
					'城中',
					'和桥',
					'和桥1',
					'和桥2',
					'和桥3',
					'和桥4',
					'城西5',
				],
				qy_arr3:[
					'万科九如城',
					'阳光100凤凰街',
					'恒大香邑',
					'九龙依云',
					'荷兰岛郁金香庄园',
					'万庭嘉融域',
					'景湖天成',
					'岭秀首府',
					'彩虹未来城'
				],
				qy_show:[
					'万科九如城',
					'阳光100凤凰街',
					'恒大香邑',
					'九龙依云',
					'荷兰岛郁金香庄园',
					'万庭嘉融域',
					'景湖天成',
					'岭秀首府',
					'彩虹未来城'
				],
				qy_search:'',
				qy_cur:-1,
				qy_cur2:-1,
				qy_cur3:-1,
				jg_show:[
					'80万以下',
					'80-150万',
					'150-200万',
					'200-300万',
					'300-400万',
					'400-500万',
					'500-1000万',
					'1000万以上',
				],
				jg_cur:-1,
				jg_start:'',
				jg_end:'',
				mj_show:[
					'20㎡以下',
					'20-50㎡',
					'50-100㎡',
					'100-150㎡',
					'150-200㎡',
					'200-500㎡',
					'500-1000㎡',
					'1000㎡以上',
				],
				mj_cur:-1,
				mj_start:'',
				mj_end:'',
				lx_show:[
					'住宅',
					'别墅',
					'复式',
				],
				lx_cur:-1,
				zx_show:[
					'毛胚',
					'简单装修',
					'中等装修',
					'高档装修',
					'豪华装修',
				],
				zx_cur:-1,
			}
		},
		onLoad(option) {
			this.title = option.title
			this.type = option.type
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName']),
			style0() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var padd_top = CustomBar + 54
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
				var style = `top:${padd_top}px;bottom:0;box-sizing: border-box;`;

				return style
			},
			style2() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var padd_top = CustomBar+40
				var style = `top:${padd_top}px;`;

				return style
			},
			xz_jiage(){
				
				 var that =this
				if(that.jg_cur>-1) {
					return that.jg_show[that.jg_cur]
				}else if(that.jg_start||that.jg_end){
					var jg_start=that.jg_start?that.jg_start+'万':0
					var jg_end=that.jg_end?that.jg_end+'万':0
					return jg_start+'-'+jg_end
				}else{
					return '价格'
				}
			},
			xz_mianji(){
				
				 var that =this
				if(that.mj_cur>-1) {
					return that.mj_show[that.mj_cur]
				}else if(that.mj_start||that.mj_end){
					var mj_start=that.mj_start?that.mj_start+'㎡':0
					var mj_end=that.mj_end?that.mj_end+'㎡':0
					return mj_start+'-'+mj_end
				}else{
					return '面积'
				}
			},
		},
		onPullDownRefresh(){
			console.log('下拉')
			uni.startPullDownRefresh();
		},
		onReachBottom(){
			console.log('上拉')
		},
		methods: {
			call_tel(e){
				uni.makePhoneCall({
				    phoneNumber: e.currentTarget.dataset.tel+'' 
				});
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
				this.xz_type = e.currentTarget.dataset.type
			},
			hideModal(e) {
				this.modalName = null
				this.xz_type=0
			},
			xz_fuc(e){
				var datas= e.currentTarget.dataset
				if(datas.type==1){
					if(this.qy_cur==datas.index) return
					this.qy_cur=datas.index
				}
				if(datas.type==2){
					if(this.qy_cur2==datas.index) return
					this.qy_cur2=datas.index
				}
				if(datas.type==3){
					if(this.qy_cur3==datas.index) return
					this.qy_cur3=datas.index
				}
				
			},
			reset_fuc(){
				var that=this
				if(that.xz_type==1){
					// that.modalName=null
					that.qy_cur=-1
					that.qy_cur2=-1
					that.qy_cur3=-1
					console.log(that.qy_cur,that.qy_cur2,that.qy_cur3)
				}
				if(that.xz_type==2){
					// that.modalName=null
					that.jg_cur=-1
					that.jg_start=''
					that.jg_end=''
					console.log(that.jg_start,that.jg_end,that.jg_cur)
				}
				if(that.xz_type==3){
					// that.modalName=null
					that.mj_cur=-1
					that.mj_start=''
					that.mj_end=''
					console.log(that.mj_start,that.mj_end,that.mj_cur)
				}
				if(that.xz_type==4){
					// that.modalName=null
					that.lx_cur=-1
					that.zx_cur=-1
					console.log(that.lx_cur,that.zx_cur)
				}
				that.modalName=null
			},
			sub_fuc(){
				var that=this
				if(that.xz_type==1){
					console.log(that.qy_cur,that.qy_cur2,that.qy_cur3)
				}
				if(that.xz_type==2){
					console.log(that.jg_start,that.jg_end,that.jg_cur)
				}
				if(that.xz_type==3){
					console.log(that.mj_start,that.mj_end,that.mj_cur)
				}
				if(that.xz_type==4){
					
					console.log(that.lx_cur,that.zx_cur)
				}
				that.modalName=null
			},
			// 区域搜索
			search_qy(e){
				var that=this
				console.log(that.qy_search)
				clearInterval(inputt)
						inputt = setTimeout(function () {
								var kw = that.qy_search
								console.log(kw.length)
								if (kw.length > 0){
									var news=[]
									for(var i=0;i<that.qy_arr3.length;i++){
										var str=that.qy_arr3[i]
										if(str.indexOf(kw) != -1){
											news.push(that.qy_arr3[i])
										}
									}
									that.qy_show=news
								}else{
									that.qy_show=that.qy_arr3
								}
						},400)
			},
			jg_xz(e){
				var datas = e.currentTarget.dataset
				var that =this
				that.jg_cur=datas.index
			},
			mj_xz(e){
				var datas = e.currentTarget.dataset
				var that =this
				that.mj_cur=datas.index
			},
			lx_xz(e){
				var datas = e.currentTarget.dataset
				var that =this
				that.lx_cur=datas.index
			},
			zx_xz(e){
				var datas = e.currentTarget.dataset
				var that =this
				that.zx_cur=datas.index
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
		}
	}
</script>

<style>
	.data_list{
		width: 100%;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		padding: 80upx 32upx;
	}
	
	.data_li{
		width: 100%;
		padding: 30upx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.li_msg{
		width: 500upx;
	}
	.li_msg_r{
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	.li_pri{
		color: #FE6043;
		font-size: 32upx;
	}
	.li_pri text{
		color: #FE6043;
		font-size: 48upx;
	}
	.list_tel{
		width: 60upx;
		height: 60upx;
		margin-top: 12upx;
	}
	.data_li+.data_li{
		border-top: 1px solid #DDDDDD;
	}
	.li_tit{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28upx;
		color: #999;
	}
	.li_name{
		color: #1A1A1A;
		font-size: 32upx;
	}
	.li_name image{
		width:23upx;
		height:20upx;
		margin-left: 12upx;
	}
	.li_bq{
		display: flex;
		flex-wrap: wrap;
	}
	.li_bq view{
		margin-top: 10upx;
		margin-right: 10upx;
		font-size: 20upx;
		line-height: 20upx;
		color: #666;
		border: 1px solid #ddd;
		padding:13upx 10upx;
		border-radius:6upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.li_fbr{
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
		height:50upx;
		background:rgba(238,238,238,1);
		border-radius:8rpx;
		padding: 0 20upx!important;
		box-sizing: border-box;
		font-size: 14px;
		text-align: left;
		box-sizing: border-box;
	}
	.sv2 .sv1{
		width: 100%;
		margin-top: 10upx;
		height: 440upx;
		padding-left: 0;
	}
	.sv1 .cur {
		color: #3171F5;
	}
	.xz_li1{
		color: #3171F5;
	}
	.xz_li1 .xz_icon{
		color: #3171F5;
	}
	.qy_box1{
		flex-direction: column;
	}
	.jg_list{
		width: 100%;
		padding: 20upx 32upx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
	}
	.jg_list1{
		padding: 0 32upx 20upx;
	}
	.jg_li{
		width:148upx;
		height:50upx;
		background:rgba(238,238,238,1);
		border-radius:8upx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #1A1A1A;
		font-size: 20upx;
		margin-right: 30upx;
		margin-bottom: 20upx;
	}
	.jg_li.cur{
		background: #3171F5;
		color: #fff;
	}
	.jg_li:nth-child(4n){
		margin-right: 0;
	}
	.jg_tit{
		width: 100%;
		padding: 0 32upx 20upx;
		box-sizing: border-box;
		display: flex;
		font-size: 32upx;
		color: #1A1A1A;
	}
	.jg_zdy{
		display: flex;
		align-items: center;
		font-size: 28upx;
		color: #1a1a1a;
		width: 100%;
		padding: 0 32upx 20upx;
		box-sizing: border-box;
	}
	.jg_zdy input{
		width:200upx;
		height:70upx;
		background:rgba(238,238,238,1);
		padding: 0 20upx;
		box-sizing: border-box;
		font-size: 28upx;
		color: #1a1a1a;
	}
	.jg_zdy text{
		margin: 0 10upx;
	}
</style>
