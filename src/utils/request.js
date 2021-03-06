import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../vuex/store.js'
import router from '@/router.js'
import {delCookie,getCookie} from '@/assets/js/Yt.js'
// import { getToken } from '@/utils/auth'

// 创建axios实例
// const service = axios.create({
//   baseURL: process.env.BASE_API, // api 的 base_url
//   timeout: 5000 // 请求超时时间
// })
// request拦截器
axios.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    return config
  },
  // return config,
    // config=> config,
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
axios.interceptors.response.use(
  function(response){
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    // return response;
    const res = response.data
    if (response.data.statusCode == 0 &&response.data.message =="请先登录") {
      MessageBox.confirm(
        '登录已过期,请重新登录',
        {
          confirmButtonText: '重新登录',
          type: 'warning',
          showClose:false,
          showCancelButton:false,
          closeOnClickModal:false,
          closeOnPressEscape:false
        }
      ).then(() => {
        router.push("/login")
        delCookie("user")
        location.reload()
      })
      return false
   }else if (response.data.statusCode == 0 &&response.data.message =="账号在其他地点登陆") {
    MessageBox.confirm(
      '账号在其他地点登陆',
      {
        confirmButtonText: '重新登录',
        type: 'warning',
        showClose:false,
        showCancelButton:false,
        closeOnClickModal:false,
        closeOnPressEscape:false
      }
    ).then(() => {
      router.push("/login")
      delCookie("user")
      location.reload()
    })
    return false
 }
//  else if (response.data.statusCode == 0 &&response.data.message =="用户名不能为空！") {
//   MessageBox.confirm(
//     '请先登录',
//     {
//       confirmButtonText: '确定',
//       type: 'warning',
//       showClose:false,
//       showCancelButton:false,
//       closeOnClickModal:false,
//       closeOnPressEscape:false
//     }
//   ).then(() => {
//     router.push("/login")
//     delCookie("staff")
//     location.reload()
//   })
//   return false
// }
else {
      return response
    }
    
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default axios
