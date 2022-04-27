import axios from 'axios';
import util from "./libs/util";

// 这里自己获取token
let token = util.cookies.get("satoken")

// axios 配置
// axios.defaults.timeout = 1 * 60 * 1000;
// axios.defaults.baseURL = '/';

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      // config.headers['satoken'] = token; // 根据实际情况自行修改

    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
export default axios;
