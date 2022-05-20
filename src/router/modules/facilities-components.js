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
            path: 'facilities_manage',
            name: 'facilitiesManage',
            component: () => import('@/views/autotest/VFacilitiesManage.vue'),
            meta: {},
        },
        {
            path: 'facility_detail',
            name: 'facilityDetail',
            component: () => import('@/views/autotest/VFacilityDetail.vue'),
            meta: {
                hidden: true,
                hasMulSub: false,
                icon: 'dashboard',
            },
        },
    ],
};

export default routes;