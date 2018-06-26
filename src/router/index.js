import Vue from 'vue'
import Router from 'vue-router'

const view = () => import('@/layout/view')
// index
const index = () => import('@/pages/index/index')
const home = () => import('@/pages/index/children/home/home')
const example = () => import('@/pages/index/children/manyMenu/example')
const table = () => import('@/pages/index/children/manyMenu/table')
const permission = () => import('@/pages/index/children/manyMenu/permission')
// login
const login = () => import('@/pages/login/login')
// other
const page401 = () => import('@/pages/other/page401')
const page404 = () => import('@/pages/other/page404')
const realbook = () => import('@/pages/index/children/manyMenu/realbook')
const ebook = () => import('@/pages/index/children/manyMenu/ebook')

const Person = () => import('@/pages/person/person')
const bookBody = () => import('@/pages/book/bookBody')
const adminSide = () => import('@/pages/index/children/admin/admin')
const adminUser = () => import ('@/pages/index/children/admin/adminchildren/adminuser')
const adminRealBook = () => import('@/pages/index/children/admin/adminchildren/adminRealBook')
const adminEBook = () => import('@/pages/index/children/admin/adminchildren/adminEbook')
// const adminEBook = () => import('@/pages/index/children/admin/adminchildren/adminRealBook')
const searchResult = () => import('@/pages/search/search')
const searchEbookResult = () => import('@/pages/search/searchEbook')

Vue.use(Router)

/* sideRoutes config
* @meta
* icon: ''                      菜单图标（可以用element-ui的icon & iconfont）
* login: false                  是否需要登录
* role: 'admin' || ['admin']    是否需要权限
* keep: false                   是否需要缓存
* open: false                   是否展开菜单
*/

// 要在侧边栏渲染的路由
export const sideRoutes = [
    {
        name: 'home',
        path: '/:id',
        component: home,
        redirect:'/index/realbook/1',
        children:[
          {
              name : 'RealBook',
              path : '/index/realbook/:id',
              component:realbook,
              props:true
          },
          {
              name : 'Ebook',
              path : '/index/ebook/:id',
              component:ebook,
              props:true
          },
          {
            name:'searchResult',
            path:'/index/search/:target',
            component: searchResult,
            props:true
          },
          {
            name:'searchEbookResult',
            path:'/index/searchEbook/:target',
            component: searchEbookResult,
            props:true
          }
        ]
    },
    {
        name:'person',
        path:'/index/personcenter',
        component:Person,
        meta:{
          login:true
        }
    },
    {
      name:'admin',
      path:'/index/admin',
      component:adminSide,
      children:[
        {
          name : 'adminUser',
          path : '/index/admin/user',
          component:adminUser,
        },
        {
          name:'adminRealBook',
          path:'/index/admin/realbook',
          component:adminRealBook
        },
        {
          name:'adminEBook',
          path:'/index/admin/Ebook',
          component:adminEBook
        }
      ]
    },
    {
      name : 'bookBody',
      path : '/index/bookBody/:bookid',
      component:bookBody,
      props:true,
    },

]

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '',
            redirect: '/index'
        },
        {
            name: 'index',
            path: '/index',
            component: index,
            redirect: '/index/home',
            children: sideRoutes
        },
        {
            name: '401',
            path: '/401',
            component: page401
        },
        {
            name: '404',
            path: '/404',
            component: page404
        },
        {
            path: '*',
            redirect: '/404'
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
