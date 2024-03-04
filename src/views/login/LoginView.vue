<script setup lang="ts">
import { useRouter } from "vue-router"

import { PublicLayout } from "@/components/layout"
import { FlexBox, InputField, InputForm, TheButton } from "@/components/parts"
import { useAuth } from "@/provider/auth/use-auth"
import { useCustomForm } from "@/views/__shared__/schema-helper"
import { loginSchema } from "./form"
import { type LoginRepository } from "./model"

const props = defineProps<{
  repository: LoginRepository
}>()

const router = useRouter()
const authContext = useAuth()

const { defineField, handleSubmit } = useCustomForm(loginSchema)
const [id] = defineField("id")
const [password] = defineField("password")

const onSubmit = handleSubmit(async (form) => {
  try {
    await props.repository.login({ ...form })
    await authContext.save()
    await router.replace({ name: "home" })
  } catch {
    alert("ng")
  }
})
</script>

<template>
  <PublicLayout>
    <main>
      <FlexBox class="col">
        <FlexBox class="col header">
          <h1>This is Header Area</h1>
        </FlexBox>
        <InputForm @submit.prevent>
          <InputField type="text" label="id" name="id" v-model="id" error-message="" />
          <InputField
            type="password"
            label="password"
            name="password"
            v-model="password"
            error-message=""
          />
          <TheButton :command="onSubmit">submit</TheButton>
        </InputForm>
      </FlexBox>
    </main>
  </PublicLayout>
</template>

<style scoped>
.header {
  height: 100px;
  place-content: center;
}
</style>
