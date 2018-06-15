
import { postRequest,putRequest,getRequest } from '@/utils/api'

export default class Connect{
    constructor(){

      this.host = "192.168.1.1:8080",
      this.ip = {
         login:'/login',
         register:'register'
      }
    }


    loginRequest(form){
      postRequest(this.host + this.ip.login, {
        username:form.userName,
        password:form.password
      }).then(resp=> {
        return resp
      }, resp=> {
        var res = {
          status:false,
          message:"网络连接中断"
        }
        return res
      })
    }

    registerReauest(form){
      postRequest(this.host + this.ip.register, {
        username:form.userName,
        password:form.password,
        email:form.email
      }).then(resp=> {
        return resp
      }, resp=> {
        var res = {
          status:false,
          message:"网络连接中断"
        }
        return res
      })
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
