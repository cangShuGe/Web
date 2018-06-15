import Vue from 'vue'
import Vuex from 'vuex'
import cache from '@/utils/cache'
import { getLogin, getUser } from '@/api'

Vue.use(Vuex)

const state = {
    logs: [], // 错误日志
    user: '', // 用户信息
    useronline:false,
    kinds:{xuanhuan:'玄幻',xiuzhen:'修真',mingzhu:'名著'}
}

const getters = {
    // BoolKinds:state.kinds
    // kinds:stat.kinds,
    // useronline:state.useronline,
    // user:state.user,
    // logs:state.logs
}

const mutations = {
    set_logs(state, error) {
        state.logs.push(error)
    },
    loginOut(state) {
        state.user = ''
        cache.removeToken()
    },
    set_user(state, val) {
        state.user = val
    },
    set_role(state, role) {
        state.user.role = role
    },
    set_kinds(state,kind){
        state.kinds = kind
    }
}

const actions = {
    // 获取登录数据
    async get_login_data({ commit }, params) {
        return new Promise((resolve, reject) => {
            getLogin(params).then(res => {
                // console.log('login', res)
                if (res && res.token) {
                    cache.setToken(res.token)
                    resolve(res)
                } else {
                    reject(new Error('nothing login data'))
                }
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    // 获取用户数据
    async get_user_data({ commit }, token) {
        return new Promise((resolve, reject) => {
            getUser(token).then(res => {
                // console.log('user', res)
                if (res && res.code === 200 && res.data) {
                    commit('set_user', res.data)
                    resolve(res.data)
                } else {
                    reject(new Error('nothing user data'))
                }
            })
            .catch(err => {
                reject(err)
            })
        })
    }
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
