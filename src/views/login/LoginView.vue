<script setup lang="ts">
import { useRouter } from "vue-router"

import { FlexBox, InputForm, TextInput } from "@/components/parts"
import AlertDialog from "@/components/parts/AlertDialog.vue"
import { SubmitButton } from "@/components/parts/button"
import { useAuth } from "@/provider/auth/use-auth"
import { useCustomForm } from "@/views/__shared__/schema-helper"
import { ref } from "vue"
import { loginSchema } from "./form"
import { type LoginRepository } from "./model"

const props = defineProps<{
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
