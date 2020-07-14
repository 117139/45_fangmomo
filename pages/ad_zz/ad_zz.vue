<template>
	<view class="content_wrap">
		<cu-custom bgColor="bg-white" :isBack="true" class="cu-custom">
			<block slot="backText"></block>
			<block slot="content">广告招租</block>
		</cu-custom>
		<view  class="xieyi_main" v-html="datas.body">
			房嬷嬷为房产中介提供房源信息搜索、浏览功能。 
			房嬷嬷为房产中介提供房源信息搜索、浏览功能。 
			房嬷嬷为房产中介提供房源信息搜索、
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
				datas:''
			}
		},
		onLoad() {
			this.getdata()
		},
		methods: {
			getdata(){
				///api/info/list
				var that =this
				var data = {
					keyword:'ad'
				}
				//selectSaraylDetailByUserCard
				var jkurl = '/api/info/list'
				uni.showLoading({
					title: '正在获取数据'
				})
				service.get(jkurl, data,
					function(res) {
						
						if (res.data.code == 1) {
							var datas = res.data.data
							console.log(typeof datas)
							
							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							console.log(datas)
							that.datas = datas
				
				
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
			}
		}
	}
</script>

<style scoped>
.cu-custom{
		border-bottom: 1px solid #DBDBDB;
	}
	 .xieyi_main{
		 width: 100%;
		 padding: 10px;
		 -webkit-box-sizing: border-box;
		 -moz-box-sizing: border-box;
		 box-sizing: border-box;
	 }
</style>
