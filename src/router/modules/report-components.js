const routes = {
    path: '/report',
    name: 'Report',
    component: {
        template: '<router-view></router-view>',
    },
    meta: {
        hasMulSub: true,
        hidden: true,
        icon: 'developer_board',
    },
    children: [
        {
            path: 'report_manage',
            name: 'reportManage',
            component: () => import('@/views/autotest/VReportManage.vue'),
            meta: {},
        },
        {
            path: 'report_detail',
            name: 'reportDetail',
            component: () => import('@/views/autotest/VReportDetail.vue'),
            meta: {
                hidden: true,
                hasMulSub: false,
                icon: 'dashboard',
            },
        },
    ],
};

export default routes;