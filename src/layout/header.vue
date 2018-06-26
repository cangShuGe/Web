<template>
    <el-header id="header" height="80px">
        <div class="container">
            <!-- logo -->
            <el-aside>
            <router-link class="header-logo" to="/">
                <span>藏书阁</span>
            </router-link>
            </el-aside>
            <!-- <el-main> -->
            <div class="header-right">
                 <div class="right-item">
                <el-input placement="top-end" max="20" size="mini" :clearable="true" placeholder="按书名作者查询电子书" v-model.trim="targetEbook" @keyup.enter.native="searchEbook">
                  <el-button @click="searchEbook" slot="append" icon="el-icon-search"></el-button>
                </el-input>
                 </div>
              <div class="right-item">
                <el-input placement="top-end" max="20" size="mini" :clearable="true" placeholder="按书名或作者查询书籍" v-model.trim="target" @keyup.enter.native="search">
                  <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
                <div class="right-item">
                    <div class="user" :hidden="!useronline">
                        <el-dropdown placement="top-end" @command="onUser">
                            <div class="user-info">
                                <span class="el-dropdown-link">{{user.userName}}</span>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="personmessage">个人信息</el-dropdown-item>
                                <el-dropdown-item command="exit">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="user" :hidden="useronline">
                        <el-dropdown placement="top-end" @command="onUserSelected" >
                            <div class="user-info">
                                <!-- <img :src="user.headimgurl"> -->
                                <span class="el-dropdown-link" @click="dialogFormVisible = true">登录</span>
                                <span class="el-dropdown-link"> | </span>
                                <span class="el-dropdown-link" @click="dialogRegisterVisible = true">注册</span>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="person"></el-dropdown-item>
                                <el-dropdown-item divided>没有账号请先注册</el-dropdown-item>
                            </el-dropdown-menu>
                            <el-dialog class='login_box' title="登录" :visible.sync="dialogFormVisible">
                                <el-form :model="form" @submit.native.prevent="verify">
                                    <el-form-item>
                                        <el-input v-model="form.username" placeholder="用户名" auto-complete='off'/>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-input v-model="form.password" placeholder="密码" auto-complete='off' :type="pwdType" />
                                            <span class="pwdEye" @click="passwordToggle">
                                                <i :class="eyeType"></i>
                                            </span>
                                        <el-input class="login_btn login_inputColor" type="submit" value="登录" />
                                    </el-form-item>
                                </el-form>
                            </el-dialog>
                            <el-dialog class='login_box' title="注册" :visible.sync="dialogRegisterVisible">
                                <el-form :model="form" @submit.native.prevent="verifyRegister">
                                    <el-form-item>
                                        <el-input v-model="registerfrom.username" placeholder="用户名" auto-complete='off'/>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-input v-model="registerfrom.email" placeholder="邮箱" auto-complete='off'/>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-input v-model="registerfrom.password" placeholder="密码" auto-complete='off' :type="pwdType" />
                                            <span class="pwdEye" @click="passwordToggle">
                                                <i :class="eyeType"></i>
                                            </span>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-input v-model="registerfrom.ensurePassword" placeholder="确认密码" auto-complete='off' :type="pwdEnsureType" />
                                            <span class="pwdEnsureEye" @click="passwordEnsureToggle">
                                                <i :class="eyeEnsureType"></i>
                                            </span>
                                    </el-form-item>
                                    <el-input class="login_btn login_inputColor" type="submit" value="注册" />
                                </el-form>
                            </el-dialog>
                        </el-dropdown>
                    </div>
                </div>
            </div>
          <!-- <el-input max="20" size="mini" clearable="true" placeholder="请输入内容" v-model="input5"  class="header-breadcrumb">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input> -->
        </div>
    </el-header>
</template>
<script>
import axios from "axios"
import { mapState } from 'vuex'
import Connect from '@/services/service'
import { postRequest,putRequest,getRequest } from '@/utils/api'
import cookie from '@/cookie/cookie'
import store from '@/store/index'
import router from '@/router/index'
import md5 from 'js-md5';
export default {
    name: 'my-header',
    data() {
        return {
            target:'',
            targetEbook:'',
            // Online:useronline,
            breadcrumb: '',
            pwdType: 'password',
            eyeType: 'el-icon-my-closeEye',
            pwdEnsureType: 'password',
            eyeEnsureType: 'el-icon-my-closeEye',
            dialogRegisterVisible: false,
            dialogFormVisible: false,
            form: {
                username: '',
                password: ''
            },
            registerfrom:{
                username: '',
                email:'',
                password: '',
                ensurePassword: ''
            }
        }
    },
    computed: {
        ...mapState([
            'user',
            'logs',
            'useronline',
            'userName'
        ])
    },
    created:function(){

    },
    watch: {
        $route() {
            this.getBreadcrumb()
        }
    },
    mounted() {
        this.$nextTick(() => {
            // this.$el.querySelector('.header-breadcrumb').style.left = document.getElementById('side').offsetWidth + 'px'
        })
        this.getBreadcrumb()
    },
    methods: {
        setfalse(){
          this.dialogRegisterVisible = false
          this.dialogFormVisible = false
        },
        search(){
          if(this.target){
            this.$router.push({path:'/index/search/' + this.target})
          }else{
              this.$message.error("搜索条件不能为空")
          }
        },
        searchEbook(){
            if(this.targetEbook){
                this.$router.push({path:'/index/searchEbook/'+this.targetEbook})
            }else{
                this.$message.error("搜搜电子书籍的条件不能为空")
            }
        },
        passwordToggle() {
            if (this.pwdType === 'password') {
                this.pwdType = ''
                this.eyeType = 'el-icon-my-openEye'
            } else {
                this.pwdType = 'password'
                this.eyeType = 'el-icon-my-closeEye'
            }
        },
        passwordEnsureToggle() {
            if (this.pwdEnsureType === 'password') {
                this.pwdEnsureType = ''
                this.eyeEnsureType = 'el-icon-my-openEye'
            } else {
                this.pwdEnsureType = 'password'
                this.eyeEnsureType = 'el-icon-my-closeEye'
            }
        },
        login(){
            //this.setfalse()
            let connect = new Connect()
            //connect.loginRequest(this.form)
        axios.post(connect.host + connect.ip.login + '?account='+this.form.username+'&pwd='+md5(this.form.password), {
      }).then(resp => {
          console.log("以下是登录信息")
          console.log(resp);
          if (resp.data.status) {
            this.setfalse()
            this.$message.success(resp.data.message)
            cookie.setToken("useronline", true);
            cookie.setToken("userName", this.form.username);
            store.commit("set_user_name", this.form.username);
            store.commit("set_user_online", true);
            // window.alert('登陆成功')
            this.findPersonMessage(this.form.username);
          } else {
            this.$message.error(resp.data.message)
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

        },
        verify(){
            // 登录信息验证
            if(this.form.username == '123' && this.form.password == '123'){
              this.$router.push({name:'admin'})
              this.dialogFormVisible = false
              return ;
            }
            if(!this.form.username || !this.form.password){
                this.$message.error('请输入账号和密码')
            }else if(this.form.username.length < 4 || this.form.username.length > 20){
                this.$message.error('请确保账号长度在4-20位之内')
            }else if(this.form.password.length < 6 || this.form.password.length > 20){
                this.$message.error('请确保密码长度在6-20位之内')
            }else{
                this.login()
            }

        },
        register(){
            ///this.setfalse()
            let connect = new Connect()
            this.$http.post(connect.host + connect.ip.register,{
              account:this.registerfrom.username,
              pwd:md5(this.registerfrom.password),
              mailbox:this.registerfrom.email,
              member:0,
              address:'山东省威海市',
              credit:0,
              name:'',
              sex:'',
              birthday:0,
            }).then(resp=>{
              if(resp.data.status){
                this.setfalse() //不跳转
                this.$message.success(resp.data.message)
              }else{
                  this.$message.error(resp.data.message)
              }
            },resp=>{
              if(typeof(resp.data) === undefined || resp.data === null ){
                this.$message.error('网络连接失败')
              }else{
                this.$message.error('注册失败')
              }
            })
        },
        verifyRegister(){
            //注册信息验证
            if(!this.registerfrom.username || !this.registerfrom.password
             || !this.registerfrom.email || !this.registerfrom.ensurePassword){
                this.$message.error('请输入用户名、邮箱和密码')
            }else if(this.registerfrom.username.length < 4 || this.registerfrom.username.length > 20){
                this.$message.error('请确保账号长度在4-20位之内')
            }else if(this.registerfrom.password.length < 6 || this.registerfrom.password.length > 20){
                this.$message.error('请确保密码长度在6-20位之内')
            }else if(this.registerfrom.email.indexOf('@') == -1){
                this.$message.error('请输入正确的邮箱账号')
            }else if(!(this.registerfrom.ensurePassword == this.registerfrom.password)){
                this.$message.error('请确认两次输入密码相同')
            }else{
                this.register()
            }
        },
        onUserSelected(val) {
            if (val === 'person') {
                //点击个人信息时的响应

            }
        },
        onUser(val){
            if(val === 'personmessage'){
                this.$router.push({name:'person'})
            }else if(val === 'exit'){
                this.$store.commit('set_user_online',false)
                this.$store.commit('set_user','')
                cookie.removeall()
                this.$router.go(0)
            }
        },
        getBreadcrumb() {
            this.breadcrumb = this.$route.matched.filter(item => item.name)
        },

        findPersonMessage(userName){
            let connect = new Connect()
            postRequest(connect.host + connect.ip.personMessage + '?account='+userName,{
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
    }
}
</script>
<style lang='stylus'>
#header {
    position: relative;
    width: 100%;
    background-color: $blackColor;
    padding: 0 50px 0 40px;
    .header-breadcrumb{
        width:200px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        padding: 0 20px;
        .el-breadcrumb__inner{
            color: #fff;
        }
        .el-breadcrumb__separator{
            color: #fff;
        }
    }
    .container {
        position: relative;
        width: 100%;
        height: 100%;
        .header-logo {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            color: #fff;
            font-size: 20px;
            font-weight: bold;
            span {
                display: inline-block;
                vertical-align: middle;
            }
        }
        .header-right {
            height: 100%;
            float: right;
            display: flex;
            align-items: center;
            color: #fff;
            font-size: 20px;
            .right-item {
                font-size: 0;
                margin: 0 10px;
                cursor: pointer;
            }
            .bug {
                color: inherit;
                font-size: 20px;
                padding: 2px 4px;
                border: none;
                outline: none;
            }
            .i18n {
                display: flex;
                align-items: center;
                font-size: 15px;
                color: #fff;
                i {
                    margin-left: 4px;
                }
            }
            .user {
                .user-info {
                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 100%;
                        vertical-align: middle;
                        margin-right: 5px;
                    }
                    span {
                        color: #fff;
                    }
                }
            }
        }
    }
    .header-breadcrumb {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        padding: 0 20px;
        .el-breadcrumb__inner {
            color: #fff;
        }
        .el-breadcrumb__separator {
            color: #fff;
        }
    }，
    .login_box {
        a {
            display: inline-block;
            font-size: 12px;
        }
        .el-dialog {
            width: 340px;
            .el-dialog__title {
                color: white-space nowrap;
                font-size: 16px;
            }
            .el-input input {
                height: 42px;
            }
            .el-checkbox__label {
                font-size: 12px !important;
            }
            .el-form-item {
                margin-bottom: 18px;
            }
            .pwdEye {
                position: absolute;
                right: 10px;
                top: 0;
                font-size: 16px;
                user-select: none;
                cursor: pointer;
            }
            .pwdEnsureEye {
                position: absolute;
                right: 10px;
                top: 0;
                font-size: 16px;
                user-select: none;
                cursor: pointer;
            }
            .login_btn {
                width: 100%;
                font-size: 18px;
                &:hover {
                    opacity: 0.8;
                }
                input {
                    border: none;
                    outline: none;
                    cursor: pointer;
                    color: #00CC00;
                }
            }
        }
    }
    .login_wrap {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        border-radius: 4px;
        text-align: center;
        z-index: 10;
        .login_content {
            font-size: 0;
            user-select: none;
            text-align: center;
            span {
                display: inline-block;
                width: 164px;
                height: 62px;
                font-size: 22px;
                border-radius: 4px;
                text-align: center;
                line-height: 62px;
                border: 1px solid #fff;
                text-decoration: none;
                cursor: pointer;
            }
            span:hover {
                opacity: 0.7;
            }
            .translations_btn {
                margin-right: 40px;
                color: #fff;
            }
            .login_btn {
                background-color: #fff;
            }
        }
    }
}
</style>
