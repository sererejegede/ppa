import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignIn from '@/components/Auth/SignIn'
import SignUp from '@/components/Auth/SignUp'
import Companies from '@/components/PM/Companies'
import Company from '@/components/PM/Company'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'home', component: Home},
    {path: '/companies', name: 'companies', component: Companies},
    {path: '/companies/:id', name: 'company', component: Company},
    {path: '/signin', name: 'signin', component: SignIn},
    {path: '/signup', name: 'signup', component: SignUp}
  ],
  mode: 'history'
})
