import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		platform:'',
		userName: "游客",
		loginDatas:'',
		company:'',
		uid:'',
		phone:'',
		token:'',
		laheiArr:[]
	},
	mutations: {
		login(state, userName) {
			state.userName = userName || '新用户';
			state.hasLogin = true;
			console.log(userName)
			console.log(state.userName)
		},
		lahei(state, id) {
			// state.userName = userName || '新用户';
			// state.hasLogin = true;
			state.laheiArr.push(id)
			console.log(state.laheiArr)
		},
		logindata(state, logindata) {
			state.loginDatas = logindata || '';
			Vue.set(state,'loginDatas',logindata)
			// state.company=logindata.company
			// state.uid= logindata.id
			// state.phone= logindata.phone
			// state.token= logindata.token
			console.log(logindata)
			console.log(state.loginDatas)
		},
		setplatform(state, platform) {
			state.platform = platform || 'android';
		},
		logout(state) {
			state.userName = "游客";
			state.hasLogin = false;
		}
	}
})

export default store
