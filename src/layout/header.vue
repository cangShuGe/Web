<template>
    <el-header id="header" height="80px">
        <div class="container">
            <!-- logo -->
            <router-link class="header-logo" to="/">
                <span>藏书阁</span>
            </router-link>

            <div class="header-right">
                <div class="right-item">
                    <div class="user" v-if="true">
                        <el-dropdown placement="top-end" @command="onUserSelected">
                            <div class="user-info">
                                <!-- <img :src="user.headimgurl"> -->
                                <span class="el-dropdown-link" @click="dialogFormVisible = true">登录</span>
                                <span class="el-dropdown-link"> | </span>
                                <span class="el-dropdown-link" @click="dialogRegisterVisible = true">注册</span>
                            </div>

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
                                        <el-input v-model="register.username" placeholder="用户名" auto-complete='off'/>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-input v-model="register.email" placeholder="邮箱" auto-complete='off'/>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-input v-model="register.password" placeholder="密码" auto-complete='off' :type="pwdType" />
                                            <span class="pwdEye" @click="passwordToggle">
                                                <i :class="eyeType"></i>
                                            </span>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-input v-model="register.ensurePassword" placeholder="确认密码" auto-complete='off' :type="pwdEnsureType" />
                                            <span class="pwdEnsureEye" @click="passwordEnsureToggle">
                                                <i :class="eyeEnsureType"></i>
                                            </span>
                                    </el-form-item>
                                    <el-input class="login_btn login_inputColor" type="button" value="登录" />
                                </el-form>
                            </el-dialog>

                            <!-- 显示页面选项 -->
                            <el-dropdown-menu slot="dropdown" v-if="useronline">
                                <el-dropdown-item :disabled="true">v1.0.1</el-dropdown-item>
                                <el-dropdown-item divided command="exit">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </div>
        </div>
        <!-- breadcrumb -->
        <!-- <el-breadcrumb class="header-breadcrumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index" :to="item.path">{{item.meta.title || item.name}}</el-breadcrumb-item>
        </el-breadcrumb> -->
        
    </el-header>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'my-header',
    data() {
        return {
            breadcrumb: '',
            pwdType: 'password',
            eyeType: 'el-icon-my-closeEye',
            pwdEnsureType: 'password',
            eyeEnsureType: 'el-icon-my-closeEye',
            dialogRegisterVisible: false,
            dialogFormVisible: false,
            form: {
                username: 'uncleLian',
                password: '123456'
            },
            register:{
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
            'useronline'
        ])
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
        login(form){

        },
        verify(){
            // 登录信息验证

        },
        verifyRegister(){
            //注册信息验证

        },
        onUserSelected(val) {
            if (val === 'exit') {
                this.$store.commit('loginOut')
                this.$router.push('/login')
            }
        },
        getBreadcrumb() {
            this.breadcrumb = this.$route.matched.filter(item => item.name)
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
                    color: white-space nowrap;
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
