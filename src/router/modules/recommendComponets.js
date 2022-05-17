const routes = {
    path: '/recommend',
    name: 'Recommend',
    component: {
        template: '<router-view></router-view>',
    },
    meta: {
        hasMulSub: true,
        hidden: false,
        icon: 'developer_board',
    },
    children: [
        {
            path: 'rating',
            name: 'rating',
            component: () => import('@/views/music/VMusicRating.vue'),
            meta: {},
        },
        {
            path: 'recommendUser',
            name: 'recommendUser',
            component: () => import('@/views/music/VMusicRecommendUser.vue'),
            meta: {},
        },
        {
            path: 'recommendItem',
            name: 'recommendItem',
            component: () => import('@/views/music/VMusicRecommendItem.vue'),
            meta: {},
        },
    ],
};

export default routes;
