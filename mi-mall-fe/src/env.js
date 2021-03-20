let baseURL;

switch (process.env.NODE_ENV) {
  case 'development':
    baseURL = 'http://dev-mall-pre.springboot.cn/api';
    break;
  case 'test':
    baseURL = 'test';
    break;
  case 'production':
    baseURL = 'whatcanh';
    break;
}


export default {
  baseURL
};
