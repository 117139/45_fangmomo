<template>
	<view class="content_wrap" >
		<cu-custom bgColor="bg-white" :isBack="true" class="cu-custom">
			<block slot="backText"></block>
			<block slot="content" >消息详情</block>
		</cu-custom>
		<view class="xx_list">
			<view class="xx_li" >
				<view class="xx_title">{{datas.title}}</view>
				<view class="xx_time">
					<image src="../../static/img/xiaoxi/xx_time.png" mode=""></image>{{datas.create_time}}
				</view>
				<view class="xx_inr" v-html="datas.data">
					春节本是阖家团圆、温馨惬意的节日，一场突如其来的疫情打乱了原本的节奏在此危急关头，购房者们心态如何？楼市将如何发展？报告为您.
					<image src="../../static/img/ztimg_23.jpg" mode=""></image>
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

	export default {
		data() {
			return {
				btnkg: 0,
				id:'',
				datas:'',
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin']),
			style0() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var padd_top=StatusBar+CustomBar
				var style = `padding-top:${padd_top}px;`;

				return style
			},
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;

				return style
			}
		},
		onLoad(option) {
			this.id=option.id
			this.retry()
		},
		onPullDownRefresh(){
			console.log('下拉')
			this.retry()
		},
		onReachBottom(){
			console.log('上拉')
		},
		methods: {
			retry(){
				this.getdata()
			},
			getdata(){
				///api/info/list
				var that =this
				var data = {
					id:that.id
				}
				//selectSaraylDetailByUserCard
				var jkurl = '/api/info/notificationsShow'
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
				uni.showLoading({
					title: '正在获取数据'
				})
				service.post(jkurl, data,
					function(res) {
						
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
				
				service.jump(e)
			},
		}
	}
</script>

<style>
	/* .content_wrap {
		padding-top: 200upx;
	} */

	.cu-custom {
		/* display: flex;
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
		background: #fff;
		font-weight: bold;
		color: #1A1A1A;
		font-size: 20px; */
		border-bottom: 1px solid #DDDDDD;
	}
	.xx_list{
		width: 100%;
	}
	.xx_li{
		width: 100%;
		padding: 15px 34upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		/* border-bottom: 1px solid #ddd; */
	}
	.xx_title{
		color: #1A1A1A;
		font-size: 32upx;
		line-height: 44upx;
		font-weight: bold;
	}
	.xx_time{
		margin-top: 7px;
		font-size: 20upx;
		color: #999;
		margin-bottom: 7px;
		display: flex;
		align-items: center;
	}
	.xx_time image{
		width:12px;
		height:12px;
		margin-right: 5px;
	}
	.xx_inr{
		font-size: 28upx;
		color: #1a1a1a;
		width: 100%;
	}
	.xx_inr image{
		margin: 5px auto;
		max-width: 100%;
		width: 100%;
		/* height: auto; */
	}
	.xx_inr *{
		
		max-width: 100%;
	}
</style>
