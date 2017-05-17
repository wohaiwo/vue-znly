// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import routes from './router/router.js';
import axios from 'axios';
import FastClick from 'FastClick';

Vue.use(VueRouter);		// 加载vue-router插件
Vue.prototype.$http = axios;

FastClick.attach(document.body);


// 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({ 
	mode: 'hash',
	routes
});

// 首次加载自动跳转到movie页面上去
// router.push({name: 'movie'});
// 创建和挂载根实例	
var vm =  new Vue({
	router,
	components: { App },
	beforeRouteUpdate(to, from, next) {
		console.log(to);
		console.log(from);
		next();
	}
}).$mount('#app')
