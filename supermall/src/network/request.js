import axios from 'axios'


export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    // baseURL: 'http://192.168.0.106:8080/',
    // 老师的网址
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)
}

export function request_mogu(config) {
  const instance_mogu = axios.create({
    baseURL: '/',
    timeout: 5000
  })
  return instance_mogu(config)
}
