const HomeView = () => import("@/views/home/HomeView.vue")

export const authRequired = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
]
