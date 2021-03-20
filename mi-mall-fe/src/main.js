import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router'
import VueLazyLoad from 'vue-lazyload';
import VueCookie from 'vue-cookie';
import {
  Message,
  MessageBox
} from 'element-ui';
import App from './App.vue'
import store from './store/index';
// import env from './env';

const mock = false;
if (mock) {
  require('./mock/api');
}


//根据前端的跨域方式作调整
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000;

// axios.defaults.baseURL = env.baseURL;
//接口错误拦截
axios.interceptors.response.use(function (response) {
  let res = response.data;
  let path = location.hash;

  if (res.status === 0) {
    return res.data;
  } else if (res.status === 10) {
    //未登录
    if (path != '#/index') {
      window.location.href = '/#/login';
      return Promise.reject(res);
    }
  } else {
    Message.warning(res.msg);
    return Promise.reject(res);
  }
}, (error) => {
  let res = error.response;
  Message.error(res.data.message);
  return Promise.reject(error);
});

Vue.use(VueAxios, axios);
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg'
});
Vue.use(VueCookie);

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')
