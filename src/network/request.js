import axios from 'axios'

export function request(config) {
  //1·创建axios的实例
  const instance = axios.create({
    baseURL: '',
    timeout: 5000
  })
  //2.
  
  //3.发送真正的网络请求
  //看源代码这里的instance返回的就是一个Promise
  instance(config)
}