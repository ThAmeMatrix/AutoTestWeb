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
    ],
};

export default routes;
  