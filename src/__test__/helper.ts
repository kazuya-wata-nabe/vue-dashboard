import { MainLayout, PublicLayout } from "@/components/layout"
import { fn } from "@storybook/test"

export const sleep = async (sec: number) =>
  new Promise((resolve) => setTimeout(resolve, sec * 1000))

export const mainLayout = () => ({
  components: { MainLayout },
  template: `
    <MainLayout>
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
