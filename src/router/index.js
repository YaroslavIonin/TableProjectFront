import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Student from "@/views/Student";
import UpdateStudent from "@/views/UpdateStudent";
import LogIn from "@/views/LogIn";
import SignIn from "@/views/SignIn";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        props: true
    },
    {
        path: '/:id',
        name: 'Student',
        component: Student,
        props: true
    },
    {
        path: '/register',
        name: 'SignIn',
        component: SignIn,
        props: true
    },
    {
        path: '/login',
        name: 'LogIn',
        component: LogIn,
        props: true
    },
    {
        path: '/:id/update',
        name: 'UpdateStudent',
        component: UpdateStudent,
        props: true
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
]

const router = createRouter({

    history: createWebHistory(),
    routes
})

export default router
