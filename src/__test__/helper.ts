import { fn } from "@storybook/test"
import { MainLayout, PublicLayout } from "@/components/layout"
import type { Role } from "@/provider/auth/model/role"

export const sleep = async (sec: number) =>
  new Promise((resolve) => setTimeout(resolve, sec * 1000))

export const mainLayout = (role: Role) => () => ({
  components: { MainLayout },
  setup() {
    return { role }
  },
  template: `
    <MainLayout :role="role">
      <story />
    </MainLayout>
  `,
})
export const publicLayout = () => ({
  components: { PublicLayout },
  template: `
    <PublicLayout>
      <story />
    </PublicLayout>
  `,
})

export const apiMock = <T>(data: T, key: string = "fetch") => {
  const api = Object.assign({}, { [key]: async () => data })
  return fn().mockImplementation(() => api)()
}
