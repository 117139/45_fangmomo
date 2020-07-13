<template>
	<view class="content_wrap_f3" :style="style0">
		<view class="cu-custom" :style="style">
			发布
		</view>
		<view class="fb_type" :style="style1">
			<view :class="{'cur':fb_type==1}" @tap="fb_fuc(1)">售房</view>
			<view :class="{'cur':fb_type==2}" @tap="fb_fuc(2)">租房</view>
			<view :class="{'cur':fb_type==3}" @tap="fb_fuc(3)">商铺</view>
			<view :class="{'cur':fb_type==4}" @tap="fb_fuc(4)">写字楼</view>
		</view>
		<view class="fb_list">
			<!-- <view class="fb_li" @tap="openAddres"> -->
			<view class="fb_li" @tap="jump" :data-url="'/pages/city/city?citydata='+arrayb">
				<view>所在城市</view>
				<view>{{city_name?city_name:'请选择地区'}}</view>
				<text class="iconfont iconnext"></text>
			</view>
			<!-- <simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address> -->

			<!-- <view class="fb_li" v-if="fb_type==0||fb_type==1">
				<view>小区名称</view>
				<input type="text" placeholder="请输入" v-model="xq_name"></input>
			</view> -->
			<!-- <picker  v-if="fb_type==0||fb_type==1" @change="bindPickerChange" range-key="title" data-type="b" :value="indexb" :range="arrayb"> -->
				<view v-if="fb_type==1||fb_type==2" class="fb_li" @tap="jump" :data-url="'/pages/xiaoqu/xiaoqu?type=1&id='+cityitem.id">
					<view>小区名称</view>
					<view>{{xq_name?xq_name:'请输入'}}</view>
					<text class="iconfont iconnext"></text>
				</view>
			<!-- </picker> -->
			<!-- <view class="fb_li" v-if="fb_type==2">
				<view>商铺名称</view>
				<input type="text" placeholder="请输入" v-model="xq_name"></input>
			</view> -->
			
			<view v-if="fb_type==3" class="fb_li" @tap="jump" :data-url="'/pages/xiaoqu/xiaoqu?type=3&id='+cityitem.id">
				<view>商铺名称</view>
				<view>{{xq_name?xq_name:'请输入'}}</view>
				<text class="iconfont iconnext"></text>
			</view>
			<!-- <view class="fb_li" v-if="fb_type==3">
				<view>楼盘名称</view>
				<input type="text" placeholder="请输入" v-model="xq_name"></input>
			</view> -->
			
			<view v-if="fb_type==4" class="fb_li" @tap="jump" :data-url="'/pages/xiaoqu/xiaoqu?type=4&id='+cityitem.id">
				<view>商铺名称</view>
				<view>{{xq_name?xq_name:'请输入'}}</view>
				<text class="iconfont iconnext"></text>
			</view>
			<view class="fb_li">
				<view>是否独家</view>
				<switch :checked="dujia==1?true:false" @change='dujia_cg' color="#3171F5"  />
				<!-- <text class="iconfont iconnext"></text> -->
			</view>
			<picker  v-if="fb_type !=2" @change="bindPickerChange" range-key="title" data-type="0" :value="index" :range="array">
				<view class="fb_li">
					<view>几手</view>
					<view>{{array[index].title}}</view>
					<text class="iconfont iconnext"></text>
				</view>
			</picker>
			<picker v-if="fb_type==1" @change="bindPickerChange" range-key="title" data-type="1" :value="index1" :range="array1">
				<view class="fb_li">
					<view>类型</view>
					<view>{{array1[index1].title}}</view>
					<text class="iconfont iconnext"></text>
				</view>
			</picker>
			<!-- 价格 -->
			<view v-if="fb_type !=2" class="fb_li">
				<view>价格</view>
				<input type="number" placeholder="请输入" v-model="jiage"></input>
				<text class="iconfont">万元</text>
				<!-- <text class="iconfont iconnext"></text> -->
			</view>
			<!-- 户型 -->
			<picker v-if="fb_type==1||fb_type==2" @change="bindPickerChange" range-key="title" data-type="2" :value="index2" :range="array2">
				<view class="fb_li">
					<view>户型</view>
					<view>{{array2[index2].title}}</view>
					<text class="iconfont iconnext"></text>
				</view>
			</picker>
			<view class="fb_li">
				<view>面积</view>
				<input type="number" placeholder="请输入" v-model="mianji"></input>
				<text class="iconfont">平米</text>
				<!-- <text class="iconfont iconnext"></text> -->
			</view>
			<!-- 朝向 -->
			<picker v-if="fb_type==1||fb_type==2" @change="bindPickerChange" range-key="title" data-type="3" :value="index3" :range="array3">
				<view class="fb_li">
					<view>朝向</view>
					<view>{{array3[index3].title}}</view>
					<text class="iconfont iconnext"></text>
				</view>
			</picker>
			<!-- 楼层 -->
			<!-- <picker v-if="fb_type!=3" @change="bindPickerChange" range-key="title" data-type="9" :value="index9" :range="array9">
				<view v-if="fb_type!=3" class="fb_li">
					<view>楼层</view>
					<view>{{array9[index9].title}}</view>
					<text class="iconfont">层</text>
					<text class="iconfont iconnext"></text>
				</view>
			</picker> -->
			<view v-if="fb_type!=3" class="fb_li">
				<view>楼层</view>
				<input type="number" placeholder="请输入" v-model="louceng"></input>
				<text class="iconfont">层</text>
			</view>
			<!-- 房本 -->
			<picker v-if="fb_type!=2" @change="bindPickerChange" range-key="title" data-type="4" :value="index4" :range="array4">
				<view class="fb_li">
					<view>房本</view>
					<view>{{array4[index4].title}}</view>
					<text class="iconfont iconnext"></text>
				</view>
			</picker>
			<!-- 装修 -->
			<picker @change="bindPickerChange" range-key="title" data-type="5" :value="index5" :range="array5">
				<view class="fb_li">
					<view>装修</view>
					<view>{{array5[index5].title}}</view>
					<text class="iconfont iconnext"></text>
				</view>
			</picker>
			<!-- 车库 -->
			<picker v-if="fb_type==1" @change="bindPickerChange"  data-type="6" :value="index6" :range="array6">
				<view class="fb_li">
					<view>车库</view>
					<view>{{array6[index6]}}</view>
					<text class="iconfont iconnext"></text>
				</view>
			</picker>
			<!-- 租金 -->
			<view v-if="fb_type==2" class="fb_li">
				<view>租金</view>
				<input type="number" placeholder="请输入" v-model="jiage"></input>
				<text class="iconfont">元</text>
				<!-- <text class="iconfont iconnext"></text> -->
			</view>
			<!-- 押金 -->
			<view v-if="fb_type==2" class="fb_li">
				<view>押金</view>
				<input type="number" placeholder="请输入" v-model="yajin"></input>
				<text class="iconfont">元</text>
				<!-- <text class="iconfont iconnext"></text> -->
			</view>
			<!-- 出租方式 -->
			<picker v-if="fb_type==2" @change="bindPickerChange" range-key="title" data-type="7" :value="index7" :range="array7">
				<view class="fb_li">
					<view>出租方式</view>
					<view>{{array7[index7].title}}</view>
					<text class="iconfont iconnext"></text>
				</view>
			</picker>
			<!-- 付款方式 -->
			<picker v-if="fb_type==2" @change="bindPickerChange" range-key="title" data-type="8" :value="index8" :range="array8">
				<view class="fb_li">
					<view>付款方式</view>
					<view>{{array8[index8].title}}</view>
					<text class="iconfont iconnext"></text>
				</view>
			</picker>
			<!-- 图片 -->
			<view class="fb_li">
				<view>图片</view>
				<view class="upimg_box">
					<image v-for="(item,index) in imgb" @tap="imgdel" :data-idx="index" :src="getimg(item)" mode="aspectFill"></image>
					<image v-if="imgb.length<9" @tap="upimg" data-type='0' src="../../static/img/upimg.png" mode="aspectFill"></image>
				</view>
				<!-- <text class="iconfont iconnext"></text> -->
			</view>
			
			
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="sub">发布</button>
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
				// cityPickerValueDefault: [0, 0, 1],
				cityPickerValueDefault: [0, 0],
				pickerText: '',
				btnkg: 0,
				fb_type: 1,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				city_name: '', //所在城市
				cityitem:'',
				xq_name: '', //小区名称
				xqitem:'',
				dujia:0,
				arrayb: ['小区', '小区1', '小区2'],
				indexb: 0,
				arrayb1: ['商铺', '商铺1', '商铺2'],
				indexb1: 0,
				arrayb2: ['楼盘', '楼盘1', '楼盘2'],
				indexb2: 0,
				
				
				array: ['1手', '2手', '3手'],
				index: 0,
				array1: ['类型1', '类型2', '类型3'],
				index1: 0,
				jiage: '',   //价格/租金
				array2: ['户型1', '户型2', '户型3'],
				index2: 0,
				mianji: '',
				array3: ['朝向1', '朝向2', '朝向3'],
				index3: 0,
				louceng: '',
				array4: ['类型11', '类型22', '类型33'],
				index4: 0,
				array5: ['毛坯房', '简装', '精装'],
				index5: 0,
				array6: ['有', '无'],
				index6: 0,
				yajin:'',
				array7: ['整租', '隔断'],
				index7: 0,
				array8: ['月付', '季付', '年付'],
				index8: 0,
				array9: ['楼层', '楼层', '楼层'],
				index9: 0,
				imgb:[],
			};
		},
		// components: {
		// 	simpleAddress
		// },
		onLoad() {
			this.getcity()
			this.getcateList()
			
		},
		onShow() {
			var that =this
			//cityitem
		  if(uni.getStorageSync('cityitem')){
				console.log(uni.getStorageSync('cityitem'))
				that.cityitem=JSON.parse(uni.getStorageSync('cityitem'))
				that.city_name=that.cityitem.title
				console.log(that.cityitem.title)
				console.log(that.cityitem)
				that.getDis(that.cityitem.id)
				uni.setStorageSync('cityitem','')
				uni.setStorageSync('xqitem','')
				
			}
			//xqitem
		  if(uni.getStorageSync('xqitem')){
				that.xqitem=JSON.parse(uni.getStorageSync('xqitem'))
				console.log(that.xqitem)
				that.xq_name=that.xqitem.title
				console.log(that.xq_name)
				// uni.setStorageSync('xqitem','')
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin','userName','loginDatas']),
			style0() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var padd_top = CustomBar + 40
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
			...mapMutations(['login','logout','logindata']),
			getimg(img){
				return service.getimg(img)
			},
			dujia_cg(e){
				this.dujia=e.target.value ? 1:0
			},
			getcity(){
				var that =this
				var data = {
					type:that.fb_type
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
								
								
								that.arrayb=datas
								that.cityitem=that.arrayb[0]
								that.city_name=that.arrayb[0].title
								uni.setStorageSync('city_storage',JSON.stringify(that.arrayb))
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
					type:that.fb_type,
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
									that.xqitem=datas[0].child[0].child[0]
									that.xq_name=datas[0].child[0].child[0].title
									uni.setStorageSync('xq_storage',JSON.stringify(datas))
								
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
					type:that.fb_type
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
						
								that.datas = datas
								
								// if(datas.dis){ //所在城市
								// 	that.arrayb=datas.dis
								// 	that.cityitem=that.arrayb[0]
								// 	that.city_name=that.arrayb[0].title
								// 	uni.setStorageSync('city_storage',JSON.stringify(that.arrayb))
								// 	that.xqitem=that.arrayb[0].child[0]
								// 	that.xq_name=that.arrayb[0].child[0].title
								// 	uni.setStorageSync('xq_storage',JSON.stringify(that.arrayb[0].child))
								// }
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
								if(datas.floor){ //楼层
									that.array9=datas.floor
								}
								if(datas.fitment){ //装修
									that.array5=datas.fitment
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
			
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				console.log(e)
				var datas = e.currentTarget.dataset
				if (datas.type == 'b') {
					this.indexb = e.target.value
				} else if (datas.type == 'b1') {
					this.indexb1 = e.target.value
				} else if (datas.type == 'b2') {
					this.indexb2 = e.target.value
				} else if (datas.type == 0) {
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
			imgdel(e){
				var that =this
				console.log(e.currentTarget.dataset.idx)
				uni.showModal({
					title: '提示',
					content: '确定要删除这张图片吗',
					success (res) {
						if (res.confirm) {
							console.log('用户点击确定')
							that.imgb.splice(e.currentTarget.dataset.idx,1)
							that.imgb=that.imgb
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
				
			},
			upimg() {
				var that = this
				// 从相册选择1张图
				uni.chooseImage({
					count: 9,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: function(res) {
						console.log(res)
						const tempFilePaths = res.tempFilePaths

						const imglen = that.imgb.length
						that.upimg1(tempFilePaths, 0)

					}
				});
			},
			upimg1(imgs, i) {
				var that = this
				const imglen = that.imgb.length
				var newlen = Number(imglen) + Number(i)
				if (imglen == 9) {
					wx.showToast({
						icon: 'none',
						title: '最多可上传九张'
					})
					return
				}
				var newdata = that.imgb
				// console.log(i)
				// newdata.push(imgs[i])
				// that.imgb = newdata
				// var news1 = that.imgb.length
				// if (news1 < 9 && i < imgs.length - 1) {
				// 	i++
				// 	that.upimg1(imgs, i)
				// }
				// return
				// console.log(img1)
				uni.uploadFile({
					url: service.IPurl+'/api/upload', //仅为示例，非真实的接口地址
					filePath: imgs[i],
					name: 'file',
					formData: {
						token: that.loginDatas.token
					},
					success(res) {
						// console.log(res.data)
						var ndata = JSON.parse(res.data)
						if (ndata.code == 1) {
							console.log(imgs[i], i, ndata.data)
							var newdata = that.imgb
							console.log(i)
							newdata.push(ndata.data)
							that.imgb = newdata
							// i++
							// that.upimg(imgs, i)
							var news1 = that.imgb.length
							
							var news1 = that.imgb.length
							if (news1 < 9 && i < imgs.length - 1) {
								i++
								that.upimg1(imgs, i)
							}
						} else {
							uni.showToast({
								icon: "none",
								title: "上传失败"
							})
						}
					}
				})
			},
			fb_fuc(num) {
				if (this.fb_type == num) {
					return
				}
				this.fb_type = num
				this.getcity()
				this.getcateList()
				console.log(this.fb_type)
			},
			sub(){
				var that =this
				if(this.fb_type==1){
					if(!that.city_name){
						uni.showToast({
							icon:'none',
							title:'请选择所在城市'
						})
						return
					}
					if(!that.xq_name){
						uni.showToast({
							icon:'none',
							title:'请选择小区'
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
				//租房
				if(this.fb_type==2){
					if(!that.city_name){
						uni.showToast({
							icon:'none',
							title:'请选择所在城市'
						})
						return
					}
					if(!that.xq_name){
						uni.showToast({
							icon:'none',
							title:'请选择小区'
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
					if(!that.jiage){
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
				//商铺
				if(this.fb_type==3){
					if(!that.city_name){
						uni.showToast({
							icon:'none',
							title:'请选择所在城市'
						})
						return
					}
					if(!that.xq_name){
						uni.showToast({
							icon:'none',
							title:'请选择商铺名称'
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
				//楼盘
				if(this.fb_type==4){
					if(!that.city_name){
						uni.showToast({
							icon:'none',
							title:'请选择所在城市'
						})
						return
					}
					if(!that.xq_name){
						uni.showToast({
							icon:'none',
							title:'请选择楼盘名称'
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
				if(that.imgb.length==0){
					uni.showToast({
						icon:'none',
						title:'请上传图片'
					})
					return
				}
				var value1={ //售房
					token:that.loginDatas.token,
					type:that.fb_type,
					city_id:that.cityitem.id,                 //城市
					district_id:that.xqitem.pid,
					estate_id:that.xqitem.id,                //小区（接口待修改）
					
					
					exclusive:that.dujia,                   //独家
					jishou_id:that.array[that.index].id,  //几手
					home_type_id:that.array1[that.index1].id,  //类型
					price:that.jiage*10000,                    //价格/租金
					house_type_id:that.array2[that.index2].id,  //户型
					proportion:that.mianji,                    //面积
					orientation_id:that.array3[that.index3].id,  //朝向
					
					floor_id:that.louceng,                   //楼层
					
					premises_permit_id:that.array4[that.index4].id,  //房本
					fitment_id:that.array5[that.index5].id,  //装修
					carbarn:that.index6,  //车库
					img:that.imgb.join(',')
				}
				
				if(that.fb_type==2){//租房
					value1={
						token:that.loginDatas.token,
						type:that.fb_type,
						city_id:that.cityitem.id,                 //城市
						district_id:that.xqitem.pid,
						estate_id:that.xqitem.id,                //小区（接口待修改）
						
						
						
						exclusive:that.dujia,                   //独家
						
						floor_id:that.louceng,                   //楼层（字段名不对）
						
						house_type_id:that.array2[that.index2].id,  //户型
						proportion:that.mianji,                    //面积
						orientation_id:that.array3[that.index3].id,  //朝向
						price:that.jiage*10000,                    //价格/租金
						cash_pledge:that.yajin,                    //押金
						rent_out_type_id:that.array7[that.index7].id,      //出租方式
						payment_id:that.array8[that.index8].id,      //付款方式
						fitment_id:that.array5[that.index5].id,  //装修
						img:that.imgb.join(',')
					}
				}
				if(that.fb_type==3){//商铺
					value1={
						token:that.loginDatas.token,
						type:that.fb_type,
						city_id:that.cityitem.id,                 //城市
						district_id:that.xqitem.pid,
						estate_id:that.xqitem.id,                //小区（接口待修改）
						
						
						
						exclusive:that.dujia,                   //独家
						jishou_id:that.array[that.index].id,  //几手
						price:that.jiage,                    //价格/租金  
						proportion:that.mianji,                    //面积
						fitment_id:that.array5[that.index5].id,  //装修
						premises_permit_id:that.array4[that.index4].id,  //房本
						img:that.imgb.join(',')
					}
				}
				if(that.fb_type==4){//写字楼
					value1={
						token:that.loginDatas.token,
						type:that.fb_type,
						city_id:that.cityitem.id,                 //城市
						district_id:that.xqitem.pid,
						estate_id:that.xqitem.id,                //小区（接口待修改）
						
						
						
						exclusive:that.dujia,                   //独家
						jishou_id:that.array[that.index].id,  //几手
						price:that.jiage*10000,                    //价格/租金
						proportion:that.mianji,                    //面积
						
						floor_id:that.louceng,                   //楼层
						
						fitment_id:that.array5[that.index5].id,  //装修
						premises_permit_id:that.array4[that.index4].id,  //房本
						img:that.imgb.join(',')
					}
				}
				console.log(that.fb_type)
				console.log(value1)
				var jkurl='/api/issue/save'
				service.post(jkurl, value1,
					function(res) {
						
						if (res.data.code == 1) {
							var datas = res.data.data
							console.log(typeof datas)
							
							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							uni.showToast({
								icon:'none',
								title: '操作成功'
							});
							
				
						} else {
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

	.cu-custom {
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
		/* border-bottom: 1px solid #DDDDDD; */
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
		background: #F3F4F6;
		width: 100%;
		height: 40px;
		display: flex;
		align-items: stretch;
		justify-content: center;
		padding: 0 28upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		font-size: 36upx;
		color: #1A1A1A;
		position: fixed;
		z-index: 999;
	}

	.fb_type view {
		width: 152upx;

		border-radius: 6px 6px 0 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.fb_type .cur {
		background: rgba(255, 255, 255, 1);
	}

	.fb_list {
		width: 100%;
		padding: 0 32upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		background: #fff;
	}

	.fb_li {
		width: 100%;
		min-height: 50px;
		
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 32upx;
	}
.fb_li+.fb_li,picker,picker+.fb_li{
	border-top: 1px solid #eee;
}
	.iconfont {
		font-size: 14px;
		color: #BFBFBF;
	}

	input {
		flex: 1;
	}

	.fb_li>view:first-child {
		width: 5em;
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
		padding: 10px 28upx;
		background: #F3F4F6;
	}
	uni-button.primary {
	    background-color: rgba(49,113,245,1);
	}
</style>
