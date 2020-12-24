import Vue from 'vue'
import Router from 'vue-router'
import ShowUser from '../components/ShowUser'
import Login from '../components/Login'
import Home from '../components/Home'
import Welcome from '../components/Welcome'
import UserList from '../components/user/UserList'
import RightsList from '../components/rights/RightsList'
import RolesList from '../components/rights/RolesList'
import GoodsList from '../components/goods/GoodsManager'
import Error from '../components/error/error-404'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: 'login' },
    { path: '/login', component: Login },
    { path: '/showUser', component: ShowUser },
    {
      path: '/home', component: Home, redirect: '/welcome', children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: UserList },
        { path: '/rights', component: RightsList },
        { path: '/roles', component: RolesList },
        { path: '/goods', component: GoodsList },
        { path: '/*', component: Error},
      ]
    },

  ]
})
//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 代表从哪个路径跳转过来
  //next 是一个函数，表示放行
  if (to.path === '/login') return next()
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router