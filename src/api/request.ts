
import { message } from 'antd'
import axios, { AxiosInstance } from 'axios'
import { init } from 'locales'

const instance: AxiosInstance = axios.create({
  timeout: 30000, // 超时时间
  withCredentials: true
})

// 请求拦截器：在请求被发送出去之前，做一些验证工作
instance.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器：在响应到达之前，先进行数据过滤，错误处理
// @ts-ignore
instance.interceptors.response.use((response) => {
  // 统一拦截错误码
  if (response.status === 200 && response.data) {
    if (response.data.code !== 200) {
      message.error(init(response.data.code))
      return response
    }
    return response
  }
  return response
}, (error) => {
  return Promise.reject(error)
})

export default instance
