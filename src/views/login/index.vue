<script setup lang="ts">
import { AlertDialog } from "@/shared//parts"
import { FlexCol, InputForm } from "@/shared/parts"
import { SubmitButton } from "@/shared/parts/button"
import { TextField } from "@/shared/parts/form"
import { useInteract } from "./composable"

defineOptions({ name: "LoginView", inheritAttrs: false })

const { isOpen, isSubmitting, modal, defineField, onClickSubmit } = useInteract()

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
        <TextField
          v-bind="emailAttrs"
          v-model="email"
          label="id"
          placeholder="hoge@example.com"
          size="large"
        />
        <TextField
          v-bind="passwordAttrs"
          v-model="password"
          label="password"
          mask
          placeholder="password"
          size="large"
        />
        <SubmitButton :is-submitting="isSubmitting" @click="onClickSubmit"> submit </SubmitButton>
      </InputForm>
    </FlexCol>
  </main>

  <AlertDialog :is-open="isOpen.alert" @close="modal.close">
    <div>ログインに失敗しました</div>
  </AlertDialog>
</template>

<style scoped>
main {
  margin: 0 auto;
}

.header {
  height: 100px;
  place-content: center;
}
</style>
