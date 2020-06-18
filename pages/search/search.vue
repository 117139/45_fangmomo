<template>
	<view class="content_wrap" :style="style0">
		<uni-view class="cu-bar fixed bg-white" :style="style">
			<uni-view class="action">
				<text class="iconfont iconicon-test" @tap="back_fuc"><span></span></text>
			</uni-view>
			<view class="ss_box">
				<view class="ss_type" @tap="showModal" data-target="Modal">
					<text>{{ss_list[jg_cur]}}</text>
					<text class="iconfont iconnext-copy xz_icon"></text>

				</view>
				<view class="ss_sg"></view>
				<m-input class="ss_int" type="text" clearable v-model="qy_search" @input='search_qy' placeholder="输入小区或商圈"></m-input>
				<!-- <input class="ss_int" type="text" placeholder="输入小区或商圈" @input='search_qy' v-model="qy_search"></input> -->
			</view>
		</uni-view>

		<!-- <view class="data_list" >
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
		</view> -->
		<view :style="style1" class="ssjg_list" v-if="qy_search.length>0">
			<view v-if="qy_search.length>0&&qy_show.length==0" class="zawnu">暂无数据</view>
			<view class="ssjg_li" v-for="(item,index) in qy_show" @tap="jump" data-url="../search_jg/search">
				<view class="ssjg_li_name">{{item}}</view>
				<view class="ssjg_li_add">宜兴-城中</view>
			</view>
		</view>

		<view class="cu-modal" :class="modalName=='Modal'?'show':''" @tap="hideModal">
			<view class="to_my_box">
				<view v-for="(item,index) in ss_list" :class="index==jg_cur ?'cur':''" @tap="cz_ufc" :data-index="index">{{item}}</view>
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
				qy_arr3: [
					'万科九如城',
					'万科九如城a',
					'万科九如城a1',
					'万科九如城a2',
					'万科九如城4a3',
					'万科九如城3a4',
					'万科九如城2a5',
					'万科九如城1a6',
					'万科九如城a17',
					'科九如城',
					'九如城111',
					'九如城222',
					'九如城333',
					'九如城444',
					'九如城555',
					'九如城666',
					'科九如城',
				],
				qy_show: [],
				jg_cur: 0
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName']),
			style0() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var padd_top = CustomBar
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
				var style = `padding-top:${CustomBar}px;`;

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
			back_fuc() {
				uni.navigateBack()
			},
			call_tel(e) {
				uni.makePhoneCall({
					phoneNumber: e.currentTarget.dataset.tel + ''
				});
			},
			showModal(e) {
				console.log(111)
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			cz_ufc(e) {
				var datas = e.currentTarget.dataset
				this.jg_cur = datas.index
			},
			// 搜索
			search_qy(e) {
				var that = this
				console.log(that.qy_search)
				clearInterval(inputt)
				inputt = setTimeout(function() {
					var kw = that.qy_search
					console.log(kw.length)
					if (kw.length > 0) {
						var news = []
						for (var i = 0; i < that.qy_arr3.length; i++) {
							var str = that.qy_arr3[i]
							if (str.indexOf(kw) != -1) {
								news.push(that.qy_arr3[i])
							}
						}
						that.qy_show = news
					} else {
						that.qy_show = that.qy_arr3
					}
				}, 400)
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
	.cu-bar.fixed,
	.nav.fixed {
		padding-right: 32upx;
		box-shadow: none;
	}

	.ss_box {
		width: 616upx;
		height: 38px;
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
		font-size: 16px;
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

	.to_my_box {
		position: absolute;
		top: 120upx;
		left: 120upx;
		display: inline-block;
		vertical-align: middle;
		margin-left: auto;
		margin-right: auto;
		width: 190upx;
		padding-top: 10upx;
		height: 288upx;
		max-width: 100%;
		background-color: #fff;
		border-radius: 4px;
		overflow: hidden;
		background-image: url(../../static/img/search_bg.png);
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
	}

	.cu-modal {
		background: rgba(0, 0, 0, 0);
	}

	.to_my_box view {
		color: #333;
		font-size: 30upx;
		text-align: center;
		height: 70upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.to_my_box view+view {
		/* border-top: 1upx solid #eee; */

	}

	.to_my_box .cur {
		color: #3171F5;
	}

	.ssjg_list {
		width: 100%;
		padding: 20upx 32upx;
		position: fixed;
		top: 0;
		bottom: 0;
		background: #fff;
	}

	.ssjg_li {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 30px;
		font-size: 14px;
		color: #1a1a1a;
	}

	.ssjg_li_add {
		font-size: 10px;
		color: #bfbfbf;
	}

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
		width: 500upx;
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
		line-height: 20upx;
		color: #666;
		border: 1px solid #ddd;
		padding: 13upx 10upx;
		border-radius: 6upx;
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
