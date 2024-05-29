import { type Router } from "vue-router"
import type { AuthContext } from "@/features/auth"
import { client } from "@/shared/api/client"
import { useCustomForm } from "@/shared/composable/useCustomForm"
import { useModal } from "@/shared/composable/useModal"
import { loginSchema, type LoginSchema } from "@/views/login/model/form"

export const useInteract = (auth: AuthContext, router: Router) => {
  const { defineField, handleSubmit, isSubmitting } = useCustomForm<LoginSchema>(loginSchema)
  const { isOpen, modalController } = useModal(["alert"])

  const onClickSubmit = handleSubmit(
    async (body) => {
      const { data, error } = await client.POST("/login", { body })
      if (error) {
        modalController.open("alert")
      } else {
        await auth.save(data)
        await router.replace({ name: "home" })
      }
    },
    () => console.debug(2),
  )

  return {
    isOpen,
    modalController,
    isSubmitting,
    defineField,
    onClickSubmit,
  }
}
