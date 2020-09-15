import Vue from 'vue'
import Router from 'vue-router'
import ShowUser from '../components/ShowUser.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import UserList from '../components/user/UserList.vue'
import RightsList from '../components/rights/RightsList.vue'
import RolesList from '../components/rights/RolesList.vue'
Vue.use(Router)

const router = new Router({
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