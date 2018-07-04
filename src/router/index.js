import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignIn from '@/components/Auth/SignIn/SignIn'
import SignUp from '@/components/Auth/SignUp/SignUp'
import Companies from '@/components/PM/Companies/Companies'
import Company from '@/components/PM/Company/Company'
import Users from '@/components/PM/Users/Users'
import User from '@/components/PM/User/User'
import Error404 from '@/components/Layout/Error404'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', component: Home, meta: {requiresAuth: true}},
    {path: '/companies', component: Companies, meta: {requiresAuth: true}},
    {path: '/companies/:id', component: Company, meta: {requiresAuth: true}},
    {path: '/users', component: Users, meta: {requiresAuth: true}},
    {path: '/users/:id', component: User, meta: {requiresAuth: true}},
    {path: '/signin', component: SignIn, meta: {requiresAuth: false}},
    {path: '/signup', component: SignUp, meta: {requiresAuth: false}},
    {path: '**', component: Error404, meta: {requiresAuth: false}}
  ],
  mode: 'history'
})
