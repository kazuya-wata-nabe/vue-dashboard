<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuth } from "@/features/auth"
import { AlertDialog } from "@/shared//components/parts"
import { FlexCol, InputForm, TextField } from "@/shared/components/parts"
import { SubmitButton } from "@/shared/components/parts/button"
import { useInteract } from "@/views/login/use-interaction"

defineOptions({ name: "LoginView" })

const router = useRouter()
const auth = useAuth()
const dialog = ref<InstanceType<typeof AlertDialog>>()

const { defineField, isSubmitting, onClickSubmit: handleSubmit } = useInteract(auth, router)

const [email, emailAttrs] = defineField("email")
const [password, passwordAttrs] = defineField("password")
const onClickSubmit = handleSubmit(() => dialog.value?.showDialog())
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
