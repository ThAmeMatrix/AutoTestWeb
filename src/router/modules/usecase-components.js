const routes = {
    path: '/usecase',
    name: 'Usecase',
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
            path: 'usecase_manage',
            name: 'useCaseManage',
            component: () => import('@/views/autotest/VUseCaseManage.vue'),
            meta: {},
        },
        // {
        //     path: 'facility_detail',
        //     name: 'facilityDetail',
        //     component: () => import('@/views/autotest/VFacilityDetail.vue'),
        //     meta: {
        //         hidden: true,
        //         hasMulSub: false,
        //         icon: 'dashboard',
        //     },
        // },
    ],
};

export default routes;