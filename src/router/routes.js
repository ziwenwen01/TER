
const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home.vue')
    },
    {
        path: '*',
        redirect: '/home',
    },
];


export default routes
