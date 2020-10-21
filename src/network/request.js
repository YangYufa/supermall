import axios from 'axios'

//这样子直接用其实都是用默认的get请求
export function request(config){
  const instance = axios.create({
		baseURL:'http://123.207.32.32:8000/api/xxxx/',
    timeout:5000
  })
  instance.interceptors.request.use(config=>{
    return config
  },err=>{
    console.log(err);
  })
  instance.interceptors.response.use(res=>{
    return res.data
  },err=>{
    console.log(err);
  })
  //每次调用request，暴露一个配置好的axios实例，那这样home.js中的每一个请求数据的函数都是单独一个axios实例，柑橘有点浪费
  return instance(config)
}
