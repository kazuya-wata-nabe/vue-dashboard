import { app } from "@/app"

const enableMocking = async () => {
  if (import.meta.env.PROD) {
    return
  }

  const { worker } = await import("@/__tests__/browser")

  return worker.start({ onUnhandledRequest: "bypass" })
}

enableMocking().then(() => {
  app.mount("#app")
})
