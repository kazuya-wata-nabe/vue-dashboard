<script setup lang="ts">
import { PublicLayout } from "@/components/layout"
import FlexBox from "@/components/parts/FlexBox.vue"
import InputForm from "@/components/parts/InputForm.vue"
import TextInput from "@/components/parts/TextInput.vue"
import TheButton from "@/components/parts/button/TheButton.vue"
import { useAuth } from "@/provider/auth/use-auth"
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import { useRouter } from "vue-router"
import { loginSchema } from "./form"
import { type LoginRepository } from "./model"

const props = defineProps<{
  repository: LoginRepository
}>()

const router = useRouter()
const authContext = useAuth()

const { defineField, handleSubmit } = useForm({ validationSchema: toTypedSchema(loginSchema) })
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
          <TextInput type="text" label="id" name="id" v-model="id" error-message="" />
          <TextInput
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
