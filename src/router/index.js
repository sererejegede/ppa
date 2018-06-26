import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignIn from '@/components/Auth/SignIn/SignIn'
import SignUp from '@/components/Auth/SignUp/SignUp'
import Companies from '@/components/PM/Companies/Companies'
import Company from '@/components/PM/Company/Company'
import Users from '@/components/PM/Users/Users'
import User from '@/components/PM/User/User'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'home', component: Home, meta: {requiresAuth: true}},
    {path: '/companies', name: 'companies', component: Companies, meta: {requiresAuth: true}},
    {path: '/companies/:id', name: 'company', component: Company, meta: {requiresAuth: true}},
    {path: '/users', name: 'users', component: Users, meta: {requiresAuth: true}},
    {path: '/users/:id', name: 'user', component: User, meta: {requiresAuth: true}},
    {path: '/signin', name: 'signin', component: SignIn, meta: {requiresAuth: false}},
    {path: '/signup', name: 'signup', component: SignUp, meta: {requiresAuth: false}}
  ],
  mode: 'history'
})
