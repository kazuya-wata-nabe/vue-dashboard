import { fn } from "@storybook/test"
import type { UserRole } from "@/entities/user-role"
import { MainLayout, PublicLayout } from "@/shared/components/layout"

export const mainLayout = (role: UserRole) => () => ({
  components: { MainLayout },
  setup: () => {
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
