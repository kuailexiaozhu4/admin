import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import {check} from '@/api/user'

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/Home')
            },
            {
                path: '/booking',
                name: 'booking',
                component: () => import('@/views/Booking'),
                children: [
                    {
                        path: 'approval',
                        name: 'approval',
                        component: () => import('@/views/Booking/approval')
                    }, {
                        path: 'notice',
                        name: 'notice',
                        component: () => import('@/views/Booking/Notice')
                    }
                ]
            },
            {
                path: '/info',
                name: 'info',
                component: () => import('@/views/Information')
            },
            {
                path: '/feedback',
                name: 'feedback',
                component: () => import('@/views/Feedback')
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('@/views/User')
            },
            {
                path: '/system',
                name: 'system',
                component: () => import('@/views/System'),
                children: [
                    {
                        path: 'logger',
                        name: 'logger',
                        component: () => import('@/views/System/Logger'),
                    }, {
                        path: 'publish',
                        name: 'publish',
                        component: () => import('@/views/System/Publish'),
                    },
                    {
                        path: 'person',
                        name: 'person',
                        component: () => import('@/views/System/Person')
                    }
                ]
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/Register')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
//全局前置守卫：初始化时执行、每次路由切换前执行
// 是否登录
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token');
    if (to.name === 'login' || to.name === 'register') {
        next()
    } else if (token == null) {
        next({name: 'login'})
        alert('请登录')
    } else if (token != null) {
        check(token).then(res => {
            if (res.code === 200) {
                next() //放行
            } else {
                next({name: 'login'})
                alert('身份验证过期，请重新登录')
            }
        });
    }
})

//全局后置守卫：初始化时执行、每次路由切换后执行
// router.afterEach((to,from)=>{
//     console.log('afterEach',to,from)
//     if(to.meta.title){
//         document.title = to.meta.title //修改网页的title
//     }else{
//         document.title = 'vue_test'
//     }
// })
export default router
