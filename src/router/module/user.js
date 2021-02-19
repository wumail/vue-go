const userRoutes = [
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/register/Register.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/Login.vue'),
    },
    {
        path: '/profile',
        name: 'profile',
        meta: {
            auth: true,
        },
        component: () => import('@/views/profile/Profile.vue'),
    },
    {
        path: '/myhome',
        name: 'myhome',
        component: () => import('@/components/MyHome.vue'),
    },
    {
        path: '/publish',
        name: 'publish',
        component: () => import('@/views/publish/Publish.vue'),
    },
    {
        path: '/pubquestion',
        name: 'pubquest',
        component: () => import('@/views/publish/PubQuestion.vue'),
    },
    {
        path: '/putcode',
        name: 'putcode',
        component: () => import('@/views/code/Code.vue'),
    },
    {
        path: '/mypost',
        name: 'mypost',
        component: () => import('@/views/profile/MyPost.vue'),
        meta: {
            keepAlive: true, // 此组件需要被缓存
        },
    },
    {
        path: '/mycode',
        name: 'mycode',
        component: () => import('@/views/profile/MyCode.vue'),
    },

];

export default userRoutes;
