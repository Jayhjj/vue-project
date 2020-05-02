import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
// import env from './env'

//根据前端的跨域方式做调整
//mock开关
const mock = false;
if(mock){
  require('./mock/api');
}
axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5ead8680d933d175e8597236/api';//这个地方和跨域有关,nginx代理服务器,接口代理
axios.defaults.timeout = 8000;//请求响应的时间
//根据环境变量获取不同请求地址

// axios.defaults.baseURL = env.baseURL;
//拦截器  接口错误拦截
axios.interceptors.response.use(function(response){
  let res = response.data;//取得接口的值
  if(res.status == 0){//状态码设置
    return res.data;
  }else if(res.status == 10){
    window.location.href = '/#login';
  }else{
    alert(res.msg);
  }

});
Vue.use(VueAxios,axios);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
