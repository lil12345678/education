import axios from 'axios'

import { Loading, Message } from 'element-ui'
import { set } from '@/util/storage';

//环境的切换
// if (process.env.NODE_ENV == 'development') {
// 	axios.defaults.baseURL = process.env.VUE_APP_BASEURL;}
// else if (process.env.NODE_ENV == 'debug') {
// 	axios.defaults.baseURL = process.env.VUE_APP_BASEURL;
// }
// else if (process.env.NODE_ENV == 'production') {
// 	axios.defaults.baseURL = process.env.VUE_APP_BASEURL;
// }

// HTTPrequest拦截 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前
  // config.withCredentials = true 
  config.timeout = 30000

  // 获取token 
  let token = sessionStorage.getItem('TOKEN');
    let schoolId = sessionStorage.getItem('SCHOOLID');
  if (token) {
    //存token，每次请求加
      config.headers['Authorization'] = 'Bearer ' + token// token
      config.headers['school_id'] = schoolId// 服务接口需要
  }

  return config;
}, function (error) {
  // 请求错误
  return Promise.reject(error);
});


// HTTPresponse拦截
axios.interceptors.response.use(res => {
    const status = Number(res.data.status) 
    if(status == 0){
        return Promise.resolve(res)
    }else{
        return Promise.reject(res)
    }
}, error => {
    if(error.response.status){
        switch(error.response.status){
            //未登录
            case 401:
                router.replace({
                    path:'/login',
                    query:{

                    }
                });
                break;
            //token过期
            case 403:
                Message({
                    message: '登录过期，请重新登录',
                    duration: 5000
                })
                //清除token
                sessionStorage.removeItem('token')
                setTimeout(() => {
                    router.replace({
                        path:'/login',
                        query:{}
                    })
                })
                break;

            //请求不存在
            case 404:
                Message({
                    message: '网络请求不存在',
                    duration: 5000
                })
            break;

         }
    }
     return Promise.reject(error)
})


export default axios