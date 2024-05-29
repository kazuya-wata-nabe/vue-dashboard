<script setup lang="ts">
import { useRouter } from "vue-router"
import { useAuth } from "@/features/auth"
import { AlertDialog } from "@/shared//components/parts"
import { FlexCol, InputForm, TextField } from "@/shared/components/parts"
import { SubmitButton } from "@/shared/components/parts/button"
import { useInteract } from "@/views/login/use-interaction"

defineOptions({ name: "LoginView" })

const router = useRouter()
const auth = useAuth()

const { isOpen, isSubmitting, defineField, onClickSubmit } = useInteract(auth, router)

const [email, emailAttrs] = defineField("email")
const [password, passwordAttrs] = defineField("password")
</script>

<template>
  <main>
    <FlexCol gap="32">
      <FlexCol class="header">
        <h1>This is Header Area</h1>
      </FlexCol>
      <InputForm id="login-form">
        <TextField size="l" label="id" placeholder="email" v-model="email" v-bind="emailAttrs" />
        <TextField
          size="l"
          label="password"
          placeholder="password"
          v-model="password"
          v-bind="passwordAttrs"
        />
        <SubmitButton :isSubmitting="isSubmitting" @click="onClickSubmit">submit</SubmitButton>
      </InputForm>
    </FlexCol>
  </main>
  <AlertDialog :is-open="isOpen.alert">
    <div>ログインに失敗しました</div>
  </AlertDialog>
</template>

<style scoped>
.header {
  height: 100px;
  place-content: center;
}
</style>
