import MainLayout from "@/components/layout/main/MainLayout.vue"
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

export const apiMock = <T>(data: T, key: string = "fetch") => {
  const api = Object.assign({}, { [key]: async () => data })
  return fn().mockImplementation(() => api)()
}
