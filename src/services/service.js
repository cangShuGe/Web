
import { postRequest,putRequest,getRequest } from '@/utils/api'
import {} from '@/store/index'

export default class Connect{
    constructor(){
      this.response,
      this.host = "192.168.1.1:8080",
      this.ip = {
         login:'/login',
         register:'register'
      }
    }

    loginRequest(){
      return this.host+this.ip.login
    }

    registerReauest(){
      return this.host + this.ip.register
    }
    getKindsRequest(){
       getRequest(this.host + this.ip).then(resp=>{
          return resp
       },resp=>{
          var res = {
            status:false,
            message:"网络连接中断"
          }
          return res
        })
    }
}
