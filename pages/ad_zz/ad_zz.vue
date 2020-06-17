<template>
	<view class="content_wrap">
		<cu-custom bgColor="bg-white" :isBack="true" class="cu-custom">
			<block slot="backText"></block>
			<block slot="content">广告招租</block>
		</cu-custom>
		<view  class="xieyi_main">
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
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
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
