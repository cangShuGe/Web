import { postRequest,putRequest,getRequest } from '@/utils/api'
import {} from '@/store/index'
import router from '@/router/index'
import store from '@/store/index'
import cookie from '@/cookie/cookie'
import axios from "axios"
export default class Connect{
    constructor(){
      this.response,
      this.host = "http://127.0.0.1:8888",
      this.ip = {
         login:'/userLogin',
         register:'/userSign',
         changeMessage:'/updateUser',
         changePwd:'/updatePwd',
         showMyBuy:'/getRecordsByAcc',
         deleteMyBuy:'/delRecord',
         deleteSaleCar:'/delcart',//删除购物车商品
         updateSaleCar:'/updatecarbook',
         buySaleCar:'/buyBooksCart',//购买购物车商品
         addSaleCar:'/addbook',//商品加入购物车
         showSaleCar:'/getallfromcart',//获取购物车书籍信息
         buyVip: '/huiyuan',//购买会员
         userRemark: '/updatescore', //用户评分
         userPingjia:'/updateJudge',//评价
         personMessage:'/selectUser',
         updateUser:'/updateUser',//更改用户信息
         showUser:'selectUser',//查看用户信息
         showMyEbook:'/getshelfbyacc',
         deleteMyEbook:'/delbookshelf',

         adviceBooks:'/recommendBooks',//实体书推荐地址
         adviceEbook:'/recommendOnBooks',

         buyBookNow:'/buyBooks',//立即购买

         allBooks:'/getAllBooks',//全部书籍
         allKindsBooks:'/getBooksByCata',//分类全部书籍
         searchBooks:'/getBookByName',//按照作者、书籍名模糊搜索书籍
         getBookByNo:'/getBookByNo',//根据编号获取书籍的全部信息
         addBook:'/addbooks',   //'增加书籍',
         deleteBook: '/delbooks',//删除书籍地址
         updateBook: '/updbooks', //更新书籍信息地址
         kinds: '/adminShowCata',//书籍种类地址
         deleteKinds: '/admindelcata',//删除书籍种类地址
         addKinds:'/addcatalog',//添加书籍分类

         allEBooks:'/getOnBooks',
         allKindsEBooks: '/getByCata',//分类全部书籍
         searchEBooks: '/getByNameOrAuth',//按照作者、书籍名模糊搜索书籍
         getEBookByNo: '/getonbyno',//根据编号获取书籍的全部信息
         Ekinds:'/adminShowCata',//电子书种类地址
         addEBook:'/adminaddonbooks',//添加电子书地址
        updateEBook: '/adminupdateonbooks',// 更新电子书籍地址
        deleteEBook: '/admindelonbooks',//删除电子书地址
         //addEKinds: '/addcatalog',//添加电子书籍种类地址
         deleteEKinds:'删除电子书籍种类地址',

         changeMail: '/adminupdateusers',//通过用户名修改邮箱地址
         accountDelete: '/admindelusers',//通过用户名删除账号
         emaiDelete: '/admindelusers',//通过邮箱删除账号
         addBookCata:'/addcatalog',

         getAllJudge:'/getAllJudge', //得到这本书的所有评论
         downloadBooks: '/downloadBooks',//下载电子书 

      }
    }
    loginRequest(form){
      axios.post(this.host + this.ip.login + '?account='+form.username+'&pwd='+form.password, {
        account: form.username,
        pwd: form.password,
        mailbox: "this.registerfrom.email",
        member: 0,
        address: "sdfasd",
        credit: 0,
        name: "",
        sex: "",
        birthday: 0
      }).then(resp => {
          console.log(resp);
          if (resp.data.status) {
            cookie.setToken("useronline", true);
            cookie.setToken("userName", form.username);
            store.commit("set_user_name", form.username);
            store.commit("set_user_online", true);
            // window.alert('登陆成功')
            this.findPersonMessage(form.username);
          } else {
            cookie.setToken("useronline", false);
          }
          // router.go(0)
        }, resp => {
          if (resp == null || resp) console.log(resp);
          var response = { status: false, message: "网络连接中断" };
          cookie.setToken("useronline", true);
          console.log(response.message);
          window.alert(response.message);
          // router.go(0)
        });
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
      postRequest(this.host,{

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
      postRequest(this.host + this.ip.changeMessage, {

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
      postRequest(this.host + this.ip.changePwd,{
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

    deleteSaleCar(){
      postRequest(this.host + this.ip.deleteSaleCar,{

      }).then(resp=>{
        if(resp.status){
          window.alert('删除商品成功')
        }else {
          window.alert('删除商品失败')
        }
      },resp=>{
        window.alert('网络连接中断')
      })
    }

    buySaleCar(){
      postRequest(this.host + this.ip.buySaleCar, {

      }).then(resp=>{
        if(resp.status){
          window.alert('购买商品成功')
        }else {
          window.alert('购买商品失败')
        }
      },resp=>{
        window.alert('网络连接中断')
      })
    }

    buyVip(){
      postRequest(this.host + this.ip.buyVip, {

      }).then(resp=>{
        if(resp.status){
          window.alert('购买会员成功')
        }else {
          window.alert('购买会员失败')
        }
      },resp=>{
        window.alert('网络连接中断')
      })
    }

    remark(){
      postRequest(this.host + this.ip.userRemark, {

      }).then(resp=>{
        if(resp.status){
          window.alert('评分成功')
        }else {
          window.alert('评分失败')
        }
      },resp=>{
        window.alert('网络连接中断')
      })
    }

    findPersonMessage(userName){
      postRequest(this.host + this.ip.personMessage + '?account='+userName,{
        account:userName
      }).then(resp=>{
        let message = resp.data.data
        console.log(message)
        let usermessage ={
          userName:message.account,
          // password:message.password,
          email:message.mailbox,
          member:message.member,
          credit:message.credit,
          name:message.name,
          sex:message.sex,
          birthday:message.birthday
        }
        console.log(message)
        console.log(usermessage)
        cookie.setToken('user',usermessage)
        router.go(0)
      },resp=>{

      })
    }

    downloadEbook(data){
      return '123456@qq.com'
    }

    addBook(form){
      postRequest(this.host + this.ip.addBook,{
        bookname:form.bookName,
        catalogno:form.catalogno,
        author:form.author,
        press:form.press,
        publishTime:form.publishTime.getTime(),
        price:form.price,
        total:form.total,
        url:form.url,
        resume:form.resume
      }).then(resp=>{
        if(resp.data.status){
          window.alert('添加成功')
        }
      },resp=>{
        if(!resp){
          window.alert('网络连接失败!')
        }else{
          window.alert(resp.data.message)
        }
      })
    }

}
