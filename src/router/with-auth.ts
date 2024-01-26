const HomeView = () => import('@/views/home/HomeView.vue')

export const routeWithAuth = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
];

