const routes = {
  path: '/playlist',
  name: 'Playlist',
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
      path: 'playlists',
      name: 'musicPlaylists',
      component: () => import('@/views/music/VMusicPlaylists.vue'),
      meta: {
      },
    },
    {
      path: 'playlist',
      name: 'musicPlaylist',
      component: () => import('@/views/music/VMusicPlaylist.vue'),
      meta: {
        icon: 'dashboard',
        hidden: true,
      },
    },
    {
      path: 'playlistupload',
      name: 'playlistUpload',
      component: () => import('@/views/music/PlaylistUpload.vue'),
      meta: {
        hidden: true,
      },
    },
  ],
};

export default routes;
