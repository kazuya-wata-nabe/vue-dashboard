import { app } from "@/app"

const enableMocking = async () => {
  if (import.meta.env.PROD) {
    return
  }

  const { worker } = await import("@/shared/mocks/browser")

  return worker.start({ onUnhandledRequest: "bypass" })
}

enableMocking().then(() => {
  app.mount("#app")
})
