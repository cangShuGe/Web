import { postRequest,putRequest,getRequest } from '@/utils/api'
import {} from '@/store/index'
import router from '@/router/index'
import store from '@/store/index'
import cookie from '@/cookie/cookie'
import VueResource from 'vue-resource'

export default class Connect{
    constructor(){
      this.response,
      this.host = "http://198.168.1.1:8080",
      this.ip = {
         login:'/login',
         register:'register',
         changeMessage:'改变个人信息',
         changePwd:'更改密码'
      }
    }

    loginRequest(form){
      putRequest(this.host + this.ip.login, {
          username:this.registerfrom.userName,
          password:this.registerfrom.password
      }).then(resp=> {
        console.log(resp)
        response = resp
        if(resp.status){
          cookie.setToken('useronline',true)
          store.commit('set_user_online',false)
          window.alert('登陆成功')
        }else{
          cookie.setToken('useronline',false)
        }
        router.go(0)
      }, resp=> {
        var response = {
            status:false,
            message:"网络连接中断"
        }
        cookie.setToken('useronline',true)
        console.log(response.message)
        window.alert(response.message)
        router.go(0)
      })
    }
    registerReauest(form){
      postRequest(this.host + this.ip.register, {
          username:this.registerfrom.userName,
          password:this.registerfrom.password,
          email:this.registerfrom.email
      }).then(resp=> {
          response = resp
      }, resp=> {
          var response = {
              status:false,
              message:"网络连接中断"
          }
          console.log(response.message)
          window.alert(response.message)
      })
    }
    getKindsRequest(){
       getRequest(this.host + this.ip,{

       }).then(resp=>{
          return resp
       },resp=>{
          var res = {
            status:false,
            message:"网络连接中断"
          }
          return res
        })
    }

    setPersonMessage(form){
      putRequest(this.host + this.ip.changeMessage, {

      }).then(resp=>{
        if(resp.status){
          window.alert('更改个人信息成功')
        }else{
          window.alert('更改个人信息失败')
        }
      },resp=>{
        window.alert('网络连接中断')
      })
    }

    setChangePwd(form){
      putRequest(this.host + this.ip.changePwd,{
        oldPwd:form.oldPwd,
        newPwd:form.newPwd
      }).then(resp=>{
        if(resp.status){
          window.alert('更改密码成功')
        }else{
          window.alert('更改密码失败')
        }
      },resp=>{
        window.alert('网络连接中断')
      })
    }

}
