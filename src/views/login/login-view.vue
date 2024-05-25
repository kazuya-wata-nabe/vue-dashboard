<script setup lang="ts">
import { loginSchema } from "./form"
import { type LoginRepository } from "./model"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuth } from "@/app/provider/auth/use-auth"
import AlertDialog from "@/shared//components/parts/alert-dialog.vue"
import { FlexBox, InputForm, TextInput } from "@/shared/components/parts"
import { SubmitButton } from "@/shared/components/parts/button"
import { useCustomForm } from "@/views/__shared__/schema-helper"

const props = defineProps<{
  /** ログインAPIのインターフェース */
  repository: LoginRepository
}>()

const router = useRouter()
const authContext = useAuth()

const { defineField, handleSubmit, isSubmitting } = useCustomForm(loginSchema)
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
    <FlexBox class="col">
      <FlexBox class="col header">
        <h1>This is Header Area</h1>
      </FlexBox>
      <InputForm @submit.prevent>
        <TextInput label="id" name="id" v-model="id" error-message="" />
        <TextInput mask label="password" name="password" v-model="password" error-message="" />
        <SubmitButton :isSubmitting="isSubmitting" @click="onSubmit">submit</SubmitButton>
      </InputForm>
    </FlexBox>
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
@/shared/components/parts/form
