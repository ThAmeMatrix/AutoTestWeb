const routes = {
    path: '/date_job',
    name: 'dateJob',
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
            path: 'date_job_manage',
            name: 'dateJobManage',
            component: () => import('@/views/autotest/VDateJobManage.vue'),
            meta: {},
        },
    ],
};

export default routes;