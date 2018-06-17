import { postRequest,putRequest,getRequest } from '@/utils/api'
import {} from '@/store/index'
import router from '@/router/index'
import store from '@/store/index'
import cookie from '@/cookie/cookie'
import VueResource from 'vue-resource'

export default class Connect{
    constructor(){
      this.response,
      this.host = "https://www.baidu.com",
      this.ip = {
         login:'/login',
         register:'register'
      }
    }

    loginRequest(form){
      // VueResource.http.get('www.baidu.com','').then((res) => {
      //   console.log('get' + res)
      // }).catch((resp) => {
      //   console.log('get' + 'message error!')
      // })

      getRequest(this.host, '').then(resp=> {
       console.log(resp)
        response = resp
        if(resp.status){
          cookie.setToken('useronline',true)
          store.commit('set_user_online',false)
          window.alert('登陆成功')
        }else{
          cookie.setToken('useronline',false)
        }
        // router.go(0)
      }, resp=> {
        var response = {
            status:false,
            message:"网络连接中断"
        }
        cookie.setToken('useronline',true)
        // store.commit('set_user_online',true)
        // console.log(resp.message)
        console.log(response.message)
        window.alert(response.message)
        // router.go(0)
    })

    //   postRequest('', {
    //       username:form.userName,
    //       password:form.password
    //   }).then(resp=> {
    //      console.log(resp)
    //       response = resp
    //       if(resp.status){
    //         cookie.setToken('useronline',true)
    //         store.commit('set_user_online',false)
    //         window.alert('登陆成功')
    //       }else{
    //         cookie.setToken('useronline',false)
    //       }
    //       // router.go(0)
    //   }, resp=> {
    //       var response = {
    //           status:false,
    //           message:"网络连接中断"
    //       }
    //       cookie.setToken('useronline',true)
    //       // store.commit('set_user_online',true)
    //       // console.log(resp.message)
    //       console.log(response.message)
    //       window.alert(response.message)
    //       // router.go(0)
    //   })
    }

    registerReauest(){
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
          // console.log(resp.message)
          console.log(response.message)
          window.alert(response.message)
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
