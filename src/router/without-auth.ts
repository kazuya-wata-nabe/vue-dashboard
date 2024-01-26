const Login = () => import("@/views/login/LoginView.vue")

export const routeWithoutAuth = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]
