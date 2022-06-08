import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Student from "@/views/Student";
import CreateStudent from "@/views/CreateStudent";
import UpdateStudent from "@/views/UpdateStudent";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/:id',
    name: 'Student',
    component: Student,
    props: true
  },
  {
    path: '/create',
    name: 'CreateStudent',
    component: CreateStudent,
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

const router = createRouter( {

  history: createWebHistory(),
  routes
})

export default router
