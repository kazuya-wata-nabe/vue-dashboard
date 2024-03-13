import AppProvider from "@/provider/app/AppProvider.vue"
import { defineComponent, h } from "vue"

export const sleep = async (sec: number) =>
  new Promise((resolve) => setTimeout(resolve, sec * 1000))

export const mainLayout = () => {
  return () => ({
    template: `
      <MainLayout>
        <story />
      </MainLayout>
  `,
  })
}

export const renderHelper = defineComponent({
  setup(_, ctx) {
    return () => h(AppProvider, {}, ctx.slots)
  },
})
