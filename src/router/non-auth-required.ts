import { AuthRepositoryOnMemory } from "@/infra/auth/on-memory"

const Login = () => import("@/views/login/LoginView.vue")

export const nonAuthRequired = [
  {
    path: "/login",
    name: "login",
    props: { repository: new AuthRepositoryOnMemory() },
    component: Login,
  },
]
