<template>
	<view class="content_wrap">
		<cu-custom bgColor="bg-white" :isBack="true" class="cu-custom">
			<block slot="backText"></block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		<view v-if="type<2" class="xieyi_main">
			协议
			协议
			协议
			协议
			协议
			协议
			协议
			协议
			协议
			协议
			协议
			协议
			协议
			协议
			协议
			协议
			协议
			协议
			协议
			协议
			协议
			协议
			协议
		</view>
		<view v-else-if="type==2" class="xieyi_main">
			房嬷嬷为房产中介提供房源信息搜索、浏览功能。 
			房嬷嬷为房产中介提供房源信息搜索、浏览功能。 
			房嬷嬷为房产中介提供房源信息搜索、
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'隐私协议',
				type:0,
			}
		},
		onLoad(Option) {
			var that =this
			console.log(Option)
			
			
			if(Option.type==1){
				that.type=Option.type
				that.title='房嬷嬷隐私协议'
			}
			if(Option.type==2){
				that.type=Option.type
				that.title='关于房嬷嬷'
			}
		},
		methods: {
			
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
