// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';
const IPurl = 'http://fangmomo.net.aa.800123456.top/';
const imgurl = 'http://fangmomo.net.aa.800123456.top/';
import Vue from 'vue'
/**
 * 请求头
 */
var header = {
	'content-type': 'application/x-www-form-urlencoded'
}

/**
 * 供外部post请求调用  
 */
function post(url, params, onSuccess, onFailed) {
	console.log("请求方式：", "POST")
	request(url, params, "POST", onSuccess, onFailed);

}

/**
 * 供外部get请求调用
 */
function get(url, params, onSuccess, onFailed) {
	console.log("请求方式：", "GET")
	request(url, params, "GET", onSuccess, onFailed);
}

/**
 * function: 封装网络请求
 * @url URL地址
 * @params 请求参数
 * @method 请求方式：GET/POST
 * @onSuccess 成功回调
 * @onFailed  失败回调
 */

function request(url, params, method, onSuccess, onFailed) {
	console.log('请求url：' + url);

	console.log("请求头：", header)
	uni.request({
		url: IPurl + url,
		data: dealParams(params),
		method: method,
		header: header,
		success: function(res) {
			uni.hideLoading();
			uni.stopPullDownRefresh();
			console.log('响应：', res.data);

			// if (res.data) {
			if (res.data.code == -1) {
				if (params.login_type == 1) {
					//一进来就登录失败
					return

				}
				if (params.login_type == 2) {
					//授权登录失败
					uni.navigateBack()
					return

				}
				uni.showToast({
					icon: 'none',
					title: '请先登录账号'
				})
				setTimeout(function (){
					uni.navigateTo({
						url: '../login/login?haslogin=false'
					})
				},1000)
				return

			}

			/** start 根据需求 接口的返回状态码进行处理 */
			onSuccess(res);
			/** end 处理结束*/
			// }
		},
		fail: function(error) {

			uni.hideLoading();
			uni.stopPullDownRefresh();
			onFailed(error); //failure for other reasons
		}
	})
}

/**
 * function: 根据需求处理请求参数：添加固定参数配置等
 * @params 请求参数
 */
function dealParams(params) {
	console.log("请求参数:", params)
	return params;
}



const getUsers = function() {
	let ret = '';
	ret = uni.getStorageSync(USERS_KEY);
	if (!ret) {
		ret = '[]';
	}
	return JSON.parse(ret);
}

const addUser = function(userInfo) {
	let users = getUsers();
	users.push({
		account: userInfo.account,
		password: userInfo.password
	});
	uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}
const call_tel = function(e) {
				uni.makePhoneCall({
					phoneNumber: e.currentTarget.dataset.tel + ''
				});
			}
const jump=function(e){
	console.log(e)
	var datas=e.currentTarget.dataset
	if(datas.login){
		console.log(datas.haslogin)
		if(!datas.haslogin){
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
}
const getimg=function (img){
	if(!img) return
	console.log(imgurl+img)
	return imgurl+img
}
export default {
	getUsers,
	addUser,
	get,
	post,
	IPurl,
	imgurl,
	call_tel,
	jump,
	getimg
}
