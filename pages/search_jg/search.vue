<template>
	<view class="content_wrap"  :class="xz_type>0?'h100':''" :style="style0">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" >房源列表</block>
		</cu-custom>
		<view class="xq_box_k" :style="style1">
			<view class="ss_box">
				<view class="ss_int" @tap="back_sousuo">{{qy_search}}</view>
				<!-- <m-input class="ss_int" type="text" clearable readonly v-model="qy_search" @input='search_qy' placeholder="输入小区或商圈"></m-input> -->
			</view>
			<view class="xq_box">
				
				<view v-if="xz_type==1" class="xz_li xz_li1" @tap="hideModal">
					<text class="oh1">{{qy_cur==-1?'区域':qy_arr[qy_cur].title}}{{qy_cur2==-1?'':qy_arr2[qy_cur2].title}}{{qy_cur3==-1?'':qy_arr3[qy_cur3].title}}</text><text class="iconfont iconnext-copy-copy xz_icon"></text>
				</view>
				<view v-else class="xz_li" @tap="showModal" data-type="1" data-target="Modal">
					<text  class="oh1">{{qy_cur==-1?'区域':qy_arr[qy_cur].title}}{{qy_cur2==-1?'':qy_arr2[qy_cur2].title}}{{qy_cur3==-1?'':qy_arr3[qy_cur3].title}}</text><text class="iconfont iconnext-copy xz_icon"></text>
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
		</view>
		
		<view class="data_list">
			<view v-if="datas.length==0" class="zanwu">暂无数据</view>
			<view class="data_li" v-for="(item,index) in datas"  v-if="showid(item.user_id)">
				<view class="li_msg" @tap="jump" :data-url="'../details/details?id='+item.id">
					<view class="li_tit">
						<view class="li_name oh1"  v-if="hasLogin">
							{{item.estates?item.estates.title:''}}
							<image  v-if="item.img>0" src="../../static/img/index/list_img.png" mode=""></image>
						</view>
						<view class="li_name oh1" v-if="!hasLogin">
							房嬷嬷小区
							<image v-if="item.img>0" src="../../static/img/index/list_img.png" mode=""></image>
						</view>
						<view class="cf00" v-if="gettime(item.create_time).type==2">{{gettime(item.create_time).time}}</view>
						<view v-else>{{gettime(item.create_time).time}}</view>
					</view>
					<view class="li_bq">
						<view v-if="item.proportion">{{getmj(item.proportion)}}</view>
						<view v-if="item.fitments">{{item.fitments.title}}</view>
						<view v-if="item.premisesPermits">{{item.premisesPermits.title}}</view>
					</view>
					<view class="li_fbr" v-if="item.users">
							<text  v-if="hasLogin">{{item.users.company}} </text>
							<text v-if="hasLogin"> {{item.users.nickname}}</text>
						</view>
					</view>
					<view class="li_msg_r">
						<view class="li_pri" ><text>{{getpri(item.price)}}</text>{{getdw(item.price)}}</view>
						<image v-if="item.users" @tap="call_tel" :data-tel="item.users.phone" class="list_tel" src="../../static/img/index/list_tel.png"></image>
						<text  @tap="caozuo(item.user_id)" class="iconfont iconcaozuo" style="color:rgba(49,113,245,.5);"></text>
					</view>
			</view>
		</view>
		<!-- <view :style="style1" class="ssjg_list" v-if="qy_search.length>0">
			<view v-if="qy_search.length>0&&qy_show.length==0" class="zawnu">暂无数据</view>
			<view class="ssjg_li" v-for="(item,index) in qy_show">
				<view class="ssjg_li_name">{{item}}</view>
				<view class="ssjg_li_add">宜兴-城中</view>
			</view>
		</view> -->

		<!-- <view class="cu-modal" :class="modalName=='Modal'?'show':''" @tap="hideModal">
			<view class="to_my_box">
				<view v-for="(item,index) in ss_list" :class="index==jg_cur ?'cur':''" @tap="cz_ufc" :data-index="index">{{item}}</view>
			</view>
		</view> -->
		<!-- 弹框 -->
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="czz" @tap="hideModal">
		
			</view>
			<view class="to_my_box" :style="style2">
				<!-- 区域 -->
				<view class="qy_box" v-if="xz_type==1"> 
					<scroll-view scroll-y="true" class="sv1">
						<view :class="index==qy_cur ?'cur':''" v-for="(item,index) in qy_arr" :data-index="index" data-type="1" @tap="xz_fuc">{{item.title}}</view>
					</scroll-view>
					<scroll-view scroll-y="true" class="sv1">
						<view :class="index==qy_cur2 ?'cur':''" v-for="(item,index) in qy_arr2" :data-index="index" data-type="2" @tap="xz_fuc">{{item.title}}</view>
						
					</scroll-view>
					<view class="sv2">
						<!-- <input  type="text" placeholder="请输入"> -->
						<m-input class="sv2_input" type="text" clearable v-model="qy_search" @input='search_qy' placeholder="请输入"></m-input>
						<scroll-view scroll-y="true" class="sv1">
							<view :class="index==qy_cur3 ?'cur':''" v-for="(item,index) in qy_show" :data-index="index" data-type="3" @tap="xz_fuc">{{item.title}}</view>
						</scroll-view>
					</view>
				</view>
				<!-- 价格 -->
				<view class="qy_box qy_box1" v-if="xz_type==2"> 
					<view class="jg_list" v-if="type==2">
						<view class="jg_li"  :class="index==jg_cur ?'cur':''" v-for="(item,index) in jg_show1" :data-index="index" @tap="jg_xz">{{item.name}}</view>
						
					</view>
					<view class="jg_list" v-else>
						
						<view class="jg_li"  :class="index==jg_cur ?'cur':''" v-for="(item,index) in jg_show" :data-index="index" @tap="jg_xz">{{item.name}}</view>
					</view>
					<view class="jg_tit">自定义价格</view>
					<view class="jg_zdy">
						<input type="number" placeholder="最低价" @focus="jg_cur=-1" v-model="jg_start"></input>
						<text v-if="type!=2">万</text>
						<text>——</text>
						<input type="number" placeholder="最高价" @focus="jg_cur=-1" v-model="jg_end"></input>
						<text  v-if="type!=2">万</text>
					</view>
				</view>
				<!-- 面积 -->
				<view class="qy_box qy_box1" v-if="xz_type==3"> 
					<view class="jg_list">
						<view class="jg_li" :class="index==mj_cur ?'cur':''" v-for="(item,index) in mj_show" :data-index="index" @tap="mj_xz">{{item.name}}</view>
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
				
					<scroll-view scroll-y="true" class="">
						<block v-if="array.length>0">
							<view class="jg_tit">房源</view>
							<view class="jg_list jg_list1">
								<view class="jg_li" :class="index==index0 ?'cur':''" v-for="(item,index) in array" data-xz="0" :data-index="index" @tap="more_xz">{{item.title}}</view>
							</view>
						</block>
						<block v-if="array1.length>0">
							<view class="jg_tit">类型</view>
							<view class="jg_list jg_list1">
								<view class="jg_li" :class="index==index1 ?'cur':''" v-for="(item,index) in array1" data-xz="1" :data-index="index" @tap="more_xz">{{item.title}}</view>
							</view>
						</block>
						<block v-if="array2.length>0">
							<view class="jg_tit">户型</view>
							<view class="jg_list jg_list1">
								<view class="jg_li" :class="index==index2 ?'cur':''" v-for="(item,index) in array2" data-xz="2" :data-index="index" @tap="more_xz">{{item.title}}</view>
							</view>
						</block>
						<block v-if="array3.length>0">
							<view class="jg_tit">朝向</view>
							<view class="jg_list jg_list1">
								<view class="jg_li" :class="index==index3 ?'cur':''" v-for="(item,index) in array3" data-xz="3" :data-index="index" @tap="more_xz">{{item.title}}</view>
							</view>
						</block>
						<block v-if="array4.length>0">
							<view class="jg_tit">房本</view>
							<view class="jg_list jg_list1">
								<view class="jg_li" :class="index==index4 ?'cur':''" v-for="(item,index) in array4" data-xz="4" :data-index="index" @tap="more_xz">{{item.title}}</view>
							</view>
						</block>
						<block v-if="array5.length>0">
							<view class="jg_tit">装修</view>
							<view class="jg_list jg_list1">
								<view class="jg_li" :class="index==index5 ?'cur':''" v-for="(item,index) in array5" data-xz="5" :data-index="index" @tap="more_xz">{{item.title}}</view>
							</view>
						</block>
						<block v-if="array6.length>0">
							<view class="jg_tit">车库</view>
							<view class="jg_list jg_list1">
								<view class="jg_li" :class="index==index6 ?'cur':''" v-for="(item,index) in array6" data-xz="6" :data-index="index" @tap="more_xz">{{item.title}}</view>
							</view>
						</block>
						<block v-if="array7.length>0">
							<view class="jg_tit">出租方式</view>
							<view class="jg_list jg_list1">
								<view class="jg_li" :class="index==index7 ?'cur':''" v-for="(item,index) in array7" data-xz="7" :data-index="index" @tap="more_xz">{{item.title}}</view>
							</view>
						</block>
						<block v-if="array8.length>0">
							<view class="jg_tit">付款方式</view>
							<view class="jg_list jg_list1">
								<view class="jg_li" :class="index==index8 ?'cur':''" v-for="(item,index) in array8" data-xz="8" :data-index="index" @tap="more_xz">{{item.title}}</view>
							</view>
						</block>
					
					</scroll-view>
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
				btnkg: 0,
				modalName: null,
				qy_search: '',
				ss_list: [
					'售房',
					'商铺',
					'写字楼',
					'租房',
				],
				data_list: [
					1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
				],
				xz_type:0,
				type: '',
				page:1,
				pagesize:20,
				datas: [],
				qy_arr:[],
				qy_arr2:[
					{title:'请选择'}
				],
				qy_arr3:[
					
						{title:'请选择'}
				],
				qy_show:[
					
						{title:'请选择'}
				],
				qy_search:'',
				qy_cur:-1,
				qy_cur2:-1,
				qy_cur3:-1,
				jg_show:[
					{
						name:'80万以下',
						cs:'-800000',
					},
					{
						name:'80-150万',
						cs:'800000-1500000',
					},
					{
						name:'150-200万',
						cs:'1500000-2000000',
					},
					{
						name:'200-300万',
						cs:'2000000-3000000',
					},
					{
						name:'300-400万',
						cs:'3000000-4000000',
					},
					{
						name:'400-500万',
						cs:'4000000-5000000',
					},
					{
						name:'500-1000万',
						cs:'5000000-10000000',
					},
					{
						name:'1000万以上',
						cs:'10000000-',
					},
				],
				jg_show1:[
					{
						name:'1000以下',
						cs:'-1000',
					},
					{
						name:'1000-1500元',
						cs:'1000-1500',
					},
					{
						name:'1500-2000元',
						cs:'1500-2000',
					},
					{
						name:'2000-2500元',
						cs:'2000-2500',
					},
					{
						name:'2500-3000元',
						cs:'2500-3000',
					},
					{
						name:'3000-4000元',
						cs:'3000-4000',
					},
					{
						name:'4000-5000元',
						cs:'4000-5000',
					},
					{
						name:'5000元以上',
						cs:'5000-',
					},
				],
				jg_cur:-1,
				jg_start:'',
				jg_end:'',
				jg_cs:'',
				mj_show:[
					{
						name:'20㎡以下',
						cs:'-20'
					},
					{
						name:'20-50㎡',
						cs:'20-50'
					},
					{
						name:'50-100㎡',
						cs:'50-100'
					},
					{
						name:'100-150㎡',
						cs:'100-150'
					},
					{
						name:'150-200㎡',
						cs:'150-200'
					},
					{
						name:'200-500㎡',
						cs:'200-500'
					},
					{
						name:'500-1000㎡',
						cs:'500-1000'
					},
					{
						name:'1000㎡以上',
						cs:'1000-'
					},
					
					
					
					
					
					
					
					
				],
				mj_cur:-1,
				mj_start:'',
				mj_end:'',
				mj_cs:'',
				array: [],//'1手', '2手', '3手'
				index0: -1,
				array1: [],//'类型1', '类型2', '类型3'
				index1: -1,
				array2: [],//'户型1', '户型2', '户型3'
				index2: -1,
				array3: [],//'朝向1', '朝向2', '朝向3'
				index3: -1,
				array4: [],//'类型11', '类型22', '类型33'
				index4: -1,
				array5: [],//'毛坯房', '简装', '精装']
				index5: -1,
				array6: [
					{
						title:'无',
						id:2
					},
					{
						title:'有',
						id:1
					},
				],
				index6: -1,
				array7: [],//'整租', '隔断'
				index7: -1,
				array8: [],//'月付', '季付', '年付'
				index8: -1,
			}
		},
		onLoad(option) {
			if(option.qy_search){
				this.qy_search=option.qy_search
			}
			if(option.type){
				this.title = option.title
				this.type = option.type
				console.log(this.type)
			}
			
			this.getcity()
			this.getcateList()
			this.getdata()
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function () {
			this.page=1
			this.datas=[]
		  this.getdata()
		},
		
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function () {
			this.getdata()
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName']),
			style0() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				// var padd_top = CustomBar+40
				var padd_top = 80
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
				var style = `top:${CustomBar}px;`;

				return style
			},
			style2() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var padd_top = CustomBar+80
				var style = `top:${padd_top}px;`;
			
				return style
			},
			xz_jiage(){
				
				 var that =this
				if(that.jg_cur>-1) {
					if(that.type==2){
						that.jg_cs=that.jg_show1[that.jg_cur].cs
						return that.jg_show1[that.jg_cur].name
					}else{
						that.jg_cs=that.jg_show[that.jg_cur].cs
						return that.jg_show[that.jg_cur].name
					}
					
				}else if(that.jg_start||that.jg_end){
					if(that.type==2){
						var jg_start=that.jg_start?that.jg_start:''
						var jg_end=that.jg_end?that.jg_end:''
						that.jg_cs=jg_start+'-'+jg_end
						return jg_start+'-'+jg_end
					}else{
						var jg_start=that.jg_start?that.jg_start:''
						var jg_end=that.jg_end?that.jg_end:''
						
						if(jg_end>0){
							that.jg_cs=that.jg_start*10000+'-'+that.jg_end*10000
							return jg_start+'-'+jg_end+'万'
						}else{
							that.jg_cs=that.jg_start*10000+'-'
							return jg_start+'万'+'-'
						}
						
					}
					
				}else{
					console.log(that.type)
					if(that.type==2){
						
						return '租金'
					}else{
						return '价格'
					}
					
				}
			},
			xz_mianji(){
				
				 var that =this
				if(that.mj_cur>-1) {
					that.mj_cs=that.mj_show[that.mj_cur].cs
					return that.mj_show[that.mj_cur].name
				}else if(that.mj_start||that.mj_end){
					var mj_start=that.mj_start?that.mj_start:''
					var mj_end=that.mj_end?that.mj_end:''
					
					if(mj_end>0){
						that.mj_cs=mj_start+'-'+mj_end
						return mj_start+'-'+mj_end+'㎡'
					}else{
						that.mj_cs=mj_start+'-'
						return mj_start+'㎡'+'-'
					}
					
				}else{
					return '面积'
				}
			},
		},
		methods: {
			caozuo(id){
				
				
				var that =this
				if(!that.hasLogin){
					uni.navigateTo({
						url: '../login/login'
					});
					return
				}
				uni.showActionSheet({
				    itemList: ['举报该信息', '拉黑该发布者'],
				    success: function (res) {
				        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
								if(res.tapIndex==0){
									uni.navigateTo({
										url:'/pages/jubao/jubao'
									})
								}else if(res.tapIndex==1){
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
																that.page=1
																that.getdata()
															},1000)
															// that.lahei(id)
															
									        } else if (res.cancel) {
									            console.log('用户点击取消');
									        }
									    }
									});
								}
									
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			showid(id){
				return service.show_fuc(id)
			},
			retry(){
				this.xz_type=0
				this.page=1
				this.getdata()
			},
			getdata(){
				var that =this
				var data = {
					type:that.type,
					page:that.page,
					page_size:that.pagesize,
					"city_id": that.qy_cur>-1?that.qy_arr[that.qy_cur].id:'',
					"district_id": that.qy_cur2>-1?that.qy_arr2[that.qy_cur2].id:'',
					"estate_id":that.qy_cur3>-1?that.qy_arr3[that.qy_cur3].id:'',
					"price": that.jg_cs?that.jg_cs:'',
					"proportion": that.mj_cs?that.mj_cs:'',
					"search": that.qy_cur3>-1?'':that.qy_search,
					"exclusive": "",
					"jishou_id": that.index0>-1?that.array[that.index0].id:'',
					"home_type_id": that.index1>-1?that.array1[that.index1].id:'',
					"house_type_id": that.index2>-1?that.array2[that.index2].id:'',
					"orientation_id": that.index3>-1?that.array3[that.index3].id:'',
					"premises_permit_id":  that.index4>-1?that.array4[that.index4].id:'',
					"fitment_id":  that.index5>-1?that.array5[that.index5].id:'',
					"carbarn":  that.index6>-1?that.array6[that.index6].id:'',
					"rent_out_type_id":  that.index7>-1?that.array7[that.index7].id:'',
					"payment_id":  that.index8>-1?that.array8[that.index8].id:'',
				}
				var jkurl = '/api/issue/index'
				console.log(that.btnkg)
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
				service.post(jkurl, data,
					function(res) {
						
						// if (res.data.code == 1) {
						if (res.data.code == 1) {
							that.btnkg=0
							var datas = res.data.data.data
							console.log(typeof datas)
							
							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							console.log(datas)
							if(that.page==1){
								that.datas=datas
								that.page++
								that.btnkg=0
							}else{
								that.btnkg=0
								if(datas.length==0){
									uni.showToast({
										icon:'none',
										title:'暂无更多数据'
									})
									return
								}
								that.datas=that.datas.concat(datas)
								that.page++
							}
							
								
								
				
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
			getpri(pri){
				return service.getpri1(pri)
			},
			getmj(mj){
				return service.getmj(mj)
			},
			getdw(pri){
				return service.getdw(pri)
			},
			gettime(time){
				return service.gettime(time)
			},
			getcity(){
				var that =this
				var data = {
					type:that.type
				}
				//selectSaraylDetailByUserCard
				var jkurl = '/api/info/issueGetCity'
				
				
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
						
								// that.datas = datas
								
								
								that.qy_arr=datas
								// that.qy_cur=0
								
								that.getDis(datas[0].id)
								// that.xqitem=that.arrayb[0].child[0]
								// that.xq_name=that.arrayb[0].child[0].title
								// uni.setStorageSync('xq_storage',JSON.stringify(that.arrayb[0].child))
								
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
			getDis(id){
				var that =this
				var data = {
					type:that.type,
					id:id
				}
				//selectSaraylDetailByUserCard
				var jkurl = '/api/info/issueGetDis'
				
				
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
						
								// that.datas = datas
								
								
									// that.arrayb=datas
									// that.cityitem=that.arrayb[0]
									// that.city_name=that.arrayb[0].title
									// uni.setStorageSync('city_storage',JSON.stringify(that.arrayb))
									that.qy_arr2=datas[0].child
									// that.qy_cur2=0
									that.qy_arr3=datas[0].child[0].child
									that.qy_show=datas[0].child[0].child
								
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
			getcateList(){
				///api/info/list
				var that =this
				var data = {
					type:that.type
				}
				//selectSaraylDetailByUserCard
				var jkurl = '/api/info/getCityDis'
				
				
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
						
								// that.datas = datas
								
								
								if(datas.jishou){ //几手
									that.array=datas.jishou
								}
								if(datas.type){//类型
									that.array1=datas.type
								}
								if(datas.house_type){//户型
									that.array2=datas.house_type
								}
									
								if(datas.orientation){//朝向
									that.array3=datas.orientation
								}
								if(datas.premises_permit){//房本
									that.array4=datas.premises_permit
								}
								if(datas.fitment){ //装修
									that.array5=datas.fitment
								}
								if(datas.carbarn){ //车库
									that.array6=datas.carbarn
								}
								if(datas.rent_out_type){ //出租方式
									that.array7=datas.rent_out_type
								}
								if(datas.payment){ //付款方式
									that.array8=datas.payment
								}
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
			},
			
			back_sousuo() {
				uni.navigateTo({
					url:'../search/search?qy_search='+this.qy_search
				})
			},
			call_tel(e) {
				var that=this
				if(!that.hasLogin){
					uni.navigateTo({
						url: '../login/login'
					});
					return
				}
				uni.makePhoneCall({
					phoneNumber: e.currentTarget.dataset.tel + ''
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
					this.qy_cur2=-1
					this.qy_cur3=-1
					this.getDis(this.qy_arr[datas.index].id)
				}
				if(datas.type==2){
					if(this.qy_cur2==datas.index) return
					this.qy_cur2=datas.index
					this.qy_cur3=-1
					console.log(this.qy_arr2)
					this.qy_arr3=this.qy_arr2[datas.index].child
					this.qy_show=this.qy_arr2[datas.index].child
				}
				if(datas.type==3){
					if(this.qy_cur3==datas.index) return
					this.qy_cur3=datas.index
					this.qy_search=this.qy_arr3[datas.index].title
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
					that.jg_cs=''
					console.log(that.jg_start,that.jg_end,that.jg_cur)
				}
				if(that.xz_type==3){
					// that.modalName=null
					that.mj_cur=-1
					that.mj_start=''
					that.mj_end=''
					that.mj_cs=''
					console.log(that.mj_start,that.mj_end,that.mj_cur)
				}
				if(that.xz_type==4){
					// that.modalName=null
					that.index0=-1
					that.index1=-1
					that.index2=-1
					that.index3=-1
					that.index4=-1
					that.index5=-1
					that.index6=-1
					that.index7=-1
					that.zx_cur8=-1
				}
				this.retry()
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
				that.retry()
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
										var str=that.qy_arr3[i].title
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
			more_xz(e){
				var datas = e.currentTarget.dataset
				var that =this
				if(datas.xz==0){
					that.index0=datas.index
				}
				if(datas.xz==1){
					that.index1=datas.index
				}
				if(datas.xz==2){
					that.index2=datas.index
				}
				if(datas.xz==3){
					that.index3=datas.index
				}
				if(datas.xz==4){
					that.index4=datas.index
				}
				if(datas.xz==5){
					that.index5=datas.index
				}
				if(datas.xz==6){
					that.index6=datas.index
				}
				if(datas.xz==7){
					that.index7=datas.index
				}
				if(datas.xz==8){
					that.index8=datas.index
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

<style scoped>
	.h100{
		height: 100vh;
		overflow: hidden;
	}
	.cu-bar.fixed,
	.nav.fixed {
		padding-right: 32upx;
		box-shadow: none;
		z-index: 99999;
	}
	/* tk */
	.xq_box_k{
		width: 100%;
		background: #fff;
		position: fixed;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.xq_box {
		width: 100%;
		height: 40px;
		background: #fff;
		border-bottom: 1px solid #DDDDDD;
		display: flex;
		align-items: stretch;
		/* position: fixed;
		top: 0; */
		z-index: 9999;
	}
	
	.xz_li {
		width: 25%;
		display: flex;
		align-items: center;
		justify-content: space-around;
		font-size: 28upx;
		color: #1A1A1A;
	}
	
	.xz_icon {
		font-size: 12px;
		color: #999;
	}
	.ss_box {
		width: 686upx;
		height: 40px;
		background: rgba(235, 239, 242, 1);
		border-radius: 38px;
		padding: 0 32upx;
		font-size: 18px;
		color: #999;
		display: flex;
		align-items: center;
	}

	.ss_type {
		width: 160upx;
		font-size: 32upx;
		color: #1a1a1a;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.ss_type .iconfont {
		font-size: 22upx;
	}

	.ss_sg {
		width: 1px;
		height: 18px;
		background: rgba(191, 191, 191, 1);
		margin: 0 12px;
	}

	.ss_int {
		flex: 1;
		min-width: 0;
		font-size: 16px;
		line-height: 16px;
		height: 16px;
		color: #1a1a1a;
		display: flex;
		padding-right: 0;
		align-items: center;
		/* background: #000; */
	}

	.m-input-icon {
		position: relative;
		top: 3px;
	}

	.my_cz {
		position: absolute;
		top: 80upx;
		right: 30upx;
		color: #fff;
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
		height: 100%;
		overflow-y: auto;
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
		min-width:148upx;
		height:50upx;
		padding: 0 10upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		background:rgba(238,238,238,1);
		border-radius:8upx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #1A1A1A;
		font-size: 20upx;
		margin-right: 20upx;
		margin-bottom: 20upx;
		/* overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical; */
	}
	.jg_li.cur{
		background: #3171F5;
		color: #fff;
	}
	/* .jg_li:nth-child(4n){
		margin-right: 0;
	} */
	.jg_tit{
		width: 100%;
		height: 50rpx;
		padding: 0 32upx ;
		margin-bottom: 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
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
	/* tk */

	.data_list {
		width: 100%;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		padding: 10upx 32upx;
	}

	.data_li {
		width: 100%;
		padding: 30upx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.li_msg {
		width: 480upx;
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
		margin-bottom: 12upx;
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
		line-height: 40upx;
		height: 40upx;
		color: #666;
		border: 1px solid #ddd;
		padding: 0 10upx;
		border-radius: 6upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.li_fbr {
		font-size: 28upx;
		color: #1a1a1a;
		margin-top: 18upx;
	}
</style>
