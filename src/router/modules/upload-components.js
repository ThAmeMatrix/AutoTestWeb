const routes = {
    path: '/upload',
    name: 'Upload',
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
            path: 'upload_test_case',
            name: 'uploadTestCase',
            component: () => import('@/views/autotest/VUploadTestCase.vue'),
            meta: {},
        },
        {
            path: 'upload_account_info',
            name: 'uploadAccountInfo',
            component: () => import('@/views/autotest/VUploadAccountInfo.vue'),
            meta: {},
        },
    ],
};

export default routes;