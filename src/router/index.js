import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignIn from '@/components/Auth/SignIn/SignIn'
import SignUp from '@/components/Auth/SignUp/SignUp'
import Companies from '@/components/PM/Companies/Companies'
import Company from '@/components/PM/Company/Company'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'home', component: Home, meta: {requiresAuth: true}},
    {path: '/companies', name: 'companies', component: Companies, meta: {requiresAuth: true}},
    {path: '/companies/:id', name: 'company', component: Company, meta: {requiresAuth: true}},
    {path: '/signin', name: 'signin', component: SignIn, meta: {requiresAuth: false}},
    {path: '/signup', name: 'signup', component: SignUp, meta: {requiresAuth: false}}
  ],
  mode: 'history'
})
