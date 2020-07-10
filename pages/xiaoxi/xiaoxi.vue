<template>
	<view class="content_wrap" :style="style0">
		<view class="cu-custom" :style="style">
			消息
		</view>
		<view class="xx_list">
			<view class="xx_li" v-for="(item,index) in datas" @tap="jump"
			 :data-url="'../xiaoxi_msg/xiaoxi_msg?id='+item.id">
				<view class="xx_title oh1">{{item.title}}</view>
				<view class="xx_time">
					<image src="../../static/img/xiaoxi/xx_time.png" mode=""></image>{{item.create_time}}
				</view>
				<view class="xx_inr oh2">{{item.notifiable_type}}</view>
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
				page:1,
				pagesize:20,
				datas:[],
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin']),
			style0() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var padd_top=CustomBar
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
		onLoad() {
			this.retry()
			if (!this.hasLogin) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					/**
					 * 如果需要强制登录，不显示取消按钮
					 */
					showCancel: !this.forcedLogin,
					success: (res) => {
						if (res.confirm) {
							/**
							 * 如果需要强制登录，使用reLaunch方式
							 */
							if (this.forcedLogin) {
								uni.reLaunch({
									url: '../login/login'
								});
							} else {
								uni.navigateTo({
									url: '../login/login'
								});
							}
						}
					}
				});
			}else{
				
			}
		},
		onPullDownRefresh(){
			console.log('下拉')
			this.retry()
		},
		onReachBottom(){
			console.log('上拉')
			this.getdata()
		},
		methods: {
			retry(){
				this.page=1
				this.getdata()
			},
			getdata(){
				///api/info/list
				var that =this
				var data = {
					page:that.page,
					per_page:that.pagesize
				}
				//selectSaraylDetailByUserCard
				var jkurl = '/api/info/notifications'
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
				uni.showLoading({
					title: '正在获取数据'
				})
				service.get(jkurl, data,
					function(res) {
						
						if (res.data.code == 1) {
							var datas = res.data.data.data
							console.log(typeof datas)
							
							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							console.log(datas)
							if(that.page==1){
								that.datas = datas
							}else{
								that.datas = that.datas.concat(datas)
							}
							that.page++
							
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
		background: #fff;
		font-weight: bold;
		color: #1A1A1A;
		font-size: 40upx;
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
		border-bottom: 1px solid #ddd;
	}
	.xx_title{
		color: #1A1A1A;
		font-size: 32upx;
		line-height: 32upx;
		font-weight: bold;
	}
	.xx_time{
		margin-top: 10px;
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
		font-size: 24upx;
		color: #1a1a1a;
	}
</style>
