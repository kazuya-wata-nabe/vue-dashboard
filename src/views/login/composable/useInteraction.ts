import { type Router } from "vue-router"
import type { AuthContext } from "@/domain/auth"
import { client } from "@/shared/api/client"
import { useCustomForm } from "@/shared/composable/useCustomForm"
import { loginSchema, type LoginSchema } from "@/views/login/model/form"

export const useInteract = (auth: AuthContext, router: Router) => {
  const { defineField, handleSubmit, isSubmitting } = useCustomForm<LoginSchema>(loginSchema)

  const onClickSubmit = (onFailure: () => void) =>
    handleSubmit(async (body) => {
      const { data, error } = await client.POST("/login", { body })
      if (error) {
        onFailure()
      } else {
        await auth.save(data)
        await router.replace({ name: "home" })
      }
    })

  return {
    defineField,
    onClickSubmit,
    isSubmitting,
  }
}
