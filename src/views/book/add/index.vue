<script setup lang="ts">
import { schema } from "../model"
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import { FlexCol, TextField, TheButton } from "@/shared/components/parts"

defineOptions({ name: "BookAdd" })

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: toTypedSchema(schema),
})

const [title] = defineField("title")
const [borrowDate] = defineField("borrowDate")
const [returnDate] = defineField("returnDate")

const command = handleSubmit(async (form) => {
  console.debug(form)
})
</script>

<template>
  <FlexCol class="input-container">
    <p>本の登録</p>
    <TextField label="タイトル" size="m" v-model="title" :errorMessage="errors.title" />
    <TextField size="m" label="貸出日" v-model="borrowDate" :errorMessage="errors.borrowDate" />
    <TextField size="m" label="返却日" v-model="returnDate" :errorMessage="errors.returnDate" />
    <TheButton :command="command">登録</TheButton>
  </FlexCol>
</template>

<style scoped>
.input-container {
  width: 200px;
}
</style>
