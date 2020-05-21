import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import store from './store'
import App from './App.vue'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import env from './env'

//根据前端的跨域方式做调整
//mock开关
const mock = false;
if(mock){
  require('./mock/api');
}
// axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5ead8680d933d175e8597236/api';//这个地方和跨域有关,nginx代理服务器,接口代理
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000;//请求响应的时间
//根据环境变量获取不同请求地址


//拦截器  接口错误拦截
axios.interceptors.response.use(function(response){
  let res = response.data;//取得接口的值
  let path = location.hash;
  if(res.status == 0){//状态码设置
    return res.data;
  }else if(res.status == 10){
    if(path != '#/index'){
      window.location.href = '/#/login';
    }
    return Promise.reject(res);
  }else{
    alert(res.msg);
    return Promise.reject(res);
  }

});
// Vue.use(VueAwesomeSwiper);
Vue.use(VueAxios,axios);
Vue.use(VueLazyLoad,{
  loading:'/imgs/loading-svg/loading-bars.svg'
});
Vue.use(VueCookie);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
