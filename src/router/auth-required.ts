const HomeView = () => import("@/views/home/HomeView.vue")

export const authRequired = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
].map((route) => ({ ...route, meta: { requiresAuth: true } }))
// TODO: nested routeに対応
