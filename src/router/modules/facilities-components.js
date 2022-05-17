const routes = {
    path: '/facilities',
    name: 'Facilities',
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
            path: 'list',
            name: 'musicList',
            component: () => import('@/views/music/VMusicList.vue'),
            meta: {},
        },
        {
            path: 'manage',
            name: 'musicManage',
            component: () => import('@/views/music/VMusicManage.vue'),
            meta: {},
        },
        {
            path: 'detail',
            name: 'musicDetail',
            component: () => import('@/views/music/VMusicDetail.vue'),
            meta: {
                hidden: true,
                hasMulSub: false,
                icon: 'dashboard',
            },
        },
    ],
    };

    export default routes;
  