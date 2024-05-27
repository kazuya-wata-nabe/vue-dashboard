<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuth } from "@/app/provider/auth/use-auth"
import { AlertDialog } from "@/shared//components/parts"
import { FlexCol, InputForm, TextField } from "@/shared/components/parts"
import { SubmitButton } from "@/shared/components/parts/button"
import { useCustomForm } from "@/shared/composable/useCustomForm"
import { loginSchema, type LoginSchema } from "@/views/login/form"
import { type LoginRepository } from "@/views/login/model"

const props = defineProps<{
  /** ログインAPIのインターフェース */
  repository: LoginRepository
}>()

const router = useRouter()
const authContext = useAuth()

const { defineField, handleSubmit, isSubmitting } = useCustomForm<LoginSchema>(loginSchema)
const [id] = defineField("id")
const [password] = defineField("password")

const dialog = ref<InstanceType<typeof AlertDialog>>()

const onSubmit = handleSubmit(async (form) => {
  try {
    await props.repository.login({ ...form })
    await authContext.save()
    await router.replace({ name: "home" })
  } catch {
    dialog.value?.showDialog({ autoClose: true })
  }
})
</script>

<template>
  <main>
    <FlexCol>
      <FlexCol class="header">
        <h1>This is Header Area</h1>
      </FlexCol>
      <InputForm>
        <TextField size="m" label="id" placeholder="" v-model="id" error-message="" />
        <TextField size="m" label="password" placeholder="" v-model="password" error-message="" />
        <SubmitButton :isSubmitting="isSubmitting" @click="onSubmit">submit</SubmitButton>
      </InputForm>
    </FlexCol>
  </main>
  <AlertDialog ref="dialog">
    <div>ログインに失敗しました</div>
  </AlertDialog>
</template>

<style scoped>
.header {
  height: 100px;
  place-content: center;
}
</style>
@/shared/lib/schema-helper
