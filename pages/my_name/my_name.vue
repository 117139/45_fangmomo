<template>
	<view class="content_wrap_f3">
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content" >修改称呼</block>
		</cu-custom>
		<view class="hx20"></view>
		<view class="my_list">
			<view class="my_li">
				<m-input class="m-input" type="text" v-model="uname" placeholder="姓"></m-input>
				<radio-group @change="radioChange" v-model="sex">
					<label class="uni-list-cell uni-list-cell-pd" >
						<view>
							<radio value="1" checked="true" style="transform:scale(0.7)"/>
						</view>
						<view>先生</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd" >
						<view>
							<radio value="0"  style="transform:scale(0.7)"/>
						</view>
						<view>女士</view>
					</label>
				</radio-group>
			</view>
			
		</view>
		
		<view class="btn-row">
			<button type="primary" class="primary" @tap="set_tel">确定</button>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue'
	export default {
		data() {
			return {
				uname: '',
				sex:1,
			}
		},
		components: {
			mInput
		},
		methods: {
			radioChange: function(evt) {
					console.log(evt.target.value)
					this.sex=evt.target.value
					console.log(this.sex)
			},
			set_tel(){
				var that =this
				
				if (!that.uname) {
					uni.showToast({
						icon: 'none',
						title: '请输入您的姓'
					});
					return;
				}
				
				const data = {
					uname: this.uname,
				}
				
				uni.showToast({
					title: '操作成功'
				});
				
				setTimeout(function (){
					uni.navigateBack({
						delta: 1
					});
				},1000)
			}
		}
	}
</script>

<style scoped>
	
.hx20{
		width: 100%;
		height: 20upx;
		background: #F3F4F6;
	}
	.my_list{
		width: 100%;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		background: #Fff;
	}
	.my_li{
		width: 100%;
		display: flex;
		height: 60px;
		padding: 0 28upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.my_li_msg{
		flex: 1;
		border-bottom: 1px solid #F3F4F6;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #1a1a1a;
		font-size: 18px;
	}
	.my_li_name{
		font-size: 18px;
		color: #1a1a1a;
	}
	.iconnext{
		color: #999;
		font-size: 14px;
		margin-left: 10upx;
	}
	.btn-row{
		padding: 10px 28upx;
	}
	input,.uni-input-input{
		flex: 1;
		text-align: right;
		min-width: 0;
	}
	
	uni-radio-group {
		flex: none;
		display: flex;
		align-items: center;
		justify-content: space-around;
		width:280upx;
		height: 60px;
		border-radius:6px;
		font-size: 18px;
		color: #1A1A1A;
		margin-left: 14px;
	}
	.uni-label-pointer{
		display: flex;
		align-items: center;
	}
	uni-button.primary {
	    background-color: rgba(49,113,245,1);
	}
</style>
