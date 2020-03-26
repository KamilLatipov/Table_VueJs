import Vue from 'vue'
import VueRouter from 'vue-router'
import Table from '../components/Table.vue';
import Error from '../components/Error.vue'

Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        name:'Table',
        component: Table,
    },
    {
        path: '/error',
        name: 'error',
        component: Error,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router