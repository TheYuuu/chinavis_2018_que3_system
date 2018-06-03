// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import Vuex from 'vuex'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/global.css'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(ElementUI)

Vue.prototype.$echarts = echarts 

let store = new Vuex.Store({
	state:{
		email_threat:{},
		web_threat:{},
		sysemail:[],
		login_num_threat:[],
		tcp_threat:[],
		tcpLog_threat_holiday:[],
		quit_email:[]
	},
	getters:{
		getemail_threat (state) {
			return state.email_threat
		},
		getweb_threat (state) {
			return state.web_threat
		},
		getsysemail (state) {
			return state.sysemail
		},
		getlogin_num (state) {
			return state.login_num_threat
		},
		getdip_df (state) {
			return state.dip_df
		},
		getlogin_num (state) {
			return state.login_num_threat
		},
		gettcp_threat (state) {
			return state.tcp_threat
		},
		gettcp_threat_holiday (state) {
			return state.tcpLog_threat_holiday
		},
		getquit_email (state) {
			return state.quit_email
		}
	},
	mutations:{
		email_threatMutation(state,aim){
			state.email_threat = aim
		},
		web_threatMutation(state,aim){
			state.web_threat = aim
		},
		sysemailMutation(state,aim){
			state.sysemail = aim
		},
		login_num_threatMutation(state,aim){
			state.login_num_threat = aim
		},
		tcp_threattMutation(state,aim){
			state.tcp_threat = aim
		},
		tcpLog_threat_holidayMutation(state,aim){
			state.tcpLog_threat_holiday = aim
		},
		quit_emailMutation(state,aim){
			state.quit_email = aim
		}
	},
	actions:{
		email_threatAction(context,aim) {
			context.commit('email_threatMutation',aim)
		},
		web_threat_personAction(context,aim) {
			context.commit('web_threatMutation',aim)
		},
		sysemail_Action(context,aim) {
			context.commit('sysemailMutation',aim)
		},
		login_num_Action(context,aim) {
			context.commit('login_num_threatMutation',aim)
		},
		tcp_threat_Action(context,aim) {
			context.commit('tcp_threattMutation',aim)
		},
		tcp_threat_holiday_Action(context,aim) {
			context.commit('tcpLog_threat_holidayMutation',aim)
		},
		quit_email_Action(context,aim) {
			context.commit('quit_emailMutation',aim)
		}
	}
})

Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
}  

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
