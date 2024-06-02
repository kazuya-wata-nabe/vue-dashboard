<script setup lang="ts">
import { AlertDialog } from "@/shared//components/parts"
import { FlexCol, InputForm } from "@/shared/components/parts"
import { SubmitButton } from "@/shared/components/parts/button"
import TextField from "@/shared/components/parts/form/text-field.vue"
import { useInteract } from "@/views/login/use-interaction"

defineOptions({ name: "LoginView", inheritAttrs: false })

const { isOpen, isSubmitting, modalController, defineField, onClickSubmit } = useInteract()

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
  <AlertDialog :is-open="isOpen.alert" @close="modalController.close">
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
