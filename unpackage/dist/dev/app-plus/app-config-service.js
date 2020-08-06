
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/main/main","pages/login/login","pages/reg/reg","pages/pwd/pwd","pages/user/user","pages/reg1/reg1","pages/xieyi/xieyi","pages/fabu/fabu","pages/xiaoxi/xiaoxi","pages/kefu/kefu","pages/my_tel/my_tel","pages/my_set/my_set","pages/my_pwd/my_pwd","pages/my_gs/my_gs","pages/my_name/my_name","pages/my_pay/my_pay","pages/xiaoxi_msg/xiaoxi_msg","pages/list/list","pages/details/details","pages/ad_zz/ad_zz","pages/search/search","pages/search_jg/search","pages/jisuan/jisuan","pages/jisuan_jg/jisuan_jg","pages/my_sc/my_sc","pages/my_fy/my_fy","pages/fabu_set/fabu","pages/xiaoqu/xiaoqu","pages/city/city","pages/Turl/Turl","pages/jubao/jubao"],"window":{"navigationStyle":"custom","navigationBarTextStyle":"black","navigationBarBackgroundColor":"#0faeff","backgroundColor":"#fbf9fe"},"tabBar":{"color":"#7a7e83","selectedColor":"#3171f5","backgroundColor":"#ffffff","list":[{"pagePath":"pages/main/main","text":"首页","iconPath":"static/img/tabbar/tab1.png","selectedIconPath":"static/img/tabbar/tab12.png"},{"pagePath":"pages/fabu/fabu","text":"发布","iconPath":"static/img/tabbar/tab2.png","selectedIconPath":"static/img/tabbar/tab22.png"},{"pagePath":"pages/xiaoxi/xiaoxi","text":"消息","iconPath":"static/img/tabbar/tab3.png","selectedIconPath":"static/img/tabbar/tab32.png"},{"pagePath":"pages/user/user","text":"我的","iconPath":"static/img/tabbar/tab4.png","selectedIconPath":"static/img/tabbar/tab42.png"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"房嬷嬷","compilerVersion":"2.8.3","entryPagePath":"pages/main/main","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/main/main","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"房嬷嬷","enablePullDownRefresh":true}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录"}},{"path":"/pages/reg/reg","meta":{},"window":{"navigationBarTitleText":"注册"}},{"path":"/pages/pwd/pwd","meta":{},"window":{"navigationBarTitleText":"找回密码"}},{"path":"/pages/user/user","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的"}},{"path":"/pages/reg1/reg1","meta":{},"window":{"navigationBarTitleText":"账户信息"}},{"path":"/pages/xieyi/xieyi","meta":{},"window":{}},{"path":"/pages/fabu/fabu","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"发布"}},{"path":"/pages/xiaoxi/xiaoxi","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"消息","enablePullDownRefresh":true}},{"path":"/pages/kefu/kefu","meta":{},"window":{"navigationBarTitleText":"联系客服"}},{"path":"/pages/my_tel/my_tel","meta":{},"window":{"navigationBarTitleText":"修改手机号"}},{"path":"/pages/my_set/my_set","meta":{},"window":{"navigationBarTitleText":"设置"}},{"path":"/pages/my_pwd/my_pwd","meta":{},"window":{"navigationBarTitleText":"修改密码"}},{"path":"/pages/my_gs/my_gs","meta":{},"window":{"navigationBarTitleText":"修改公司"}},{"path":"/pages/my_name/my_name","meta":{},"window":{"navigationBarTitleText":"修改称呼"}},{"path":"/pages/my_pay/my_pay","meta":{},"window":{"navigationBarTitleText":"支付"}},{"path":"/pages/xiaoxi_msg/xiaoxi_msg","meta":{},"window":{}},{"path":"/pages/list/list","meta":{},"window":{"enablePullDownRefresh":true}},{"path":"/pages/details/details","meta":{},"window":{"enablePullDownRefresh":true}},{"path":"/pages/ad_zz/ad_zz","meta":{},"window":{}},{"path":"/pages/search/search","meta":{},"window":{"enablePullDownRefresh":true}},{"path":"/pages/search_jg/search","meta":{},"window":{"enablePullDownRefresh":true}},{"path":"/pages/jisuan/jisuan","meta":{},"window":{}},{"path":"/pages/jisuan_jg/jisuan_jg","meta":{},"window":{}},{"path":"/pages/my_sc/my_sc","meta":{},"window":{"enablePullDownRefresh":true}},{"path":"/pages/my_fy/my_fy","meta":{},"window":{"enablePullDownRefresh":true}},{"path":"/pages/fabu_set/fabu","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/xiaoqu/xiaoqu","meta":{},"window":{"navigationBarTitleText":"小区选择"}},{"path":"/pages/city/city","meta":{},"window":{}},{"path":"/pages/Turl/Turl","meta":{},"window":{"titleNView":false}},{"path":"/pages/jubao/jubao","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
