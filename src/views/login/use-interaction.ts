import { useRouter } from "vue-router"
import { useAuth } from "@/features/auth"
import { client } from "@/shared/api/client"
import { useCustomForm } from "@/shared/composable/use-custom-form"
import { useModal } from "@/shared/composable/use-modal"
import { loginSchema, type LoginSchema } from "@/views/login/model/form"

export const useInteract = () => {
  const router = useRouter()
  const auth = useAuth()
  const { handleSubmit, isSubmitting, defineField } = useCustomForm<LoginSchema>(loginSchema)
  const { isOpen, modalController } = useModal(["alert"])

  const onClickSubmit = handleSubmit(async (body) => {
    const { data, error } = await client.POST("/login", { body })
    if (error) {
      modalController.open("alert")
    } else {
      await auth.save(data)
      await router.push({ name: "home" })
    }
  })

  return {
    isOpen,
    modalController,
    isSubmitting,
    defineField,
    onClickSubmit,
  }
}
