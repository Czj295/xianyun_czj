// 错误拦截器
import { Message } from 'element-ui'

// axios拦截器
// 第一个参数是nuxt对象
export default( { $axios} ) => {
  $axios.onError( err => {
    const { message,statusCode } = err.response.data
    if(statusCode === 400){
      // 错误提示
      Message.error(message)
    } 
  })
}