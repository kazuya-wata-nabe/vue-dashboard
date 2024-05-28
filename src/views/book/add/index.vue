<script setup lang="ts">
import { FlexCol, TextField, SubmitButton, DatePicker } from "@/shared/components/parts"
import { useCustomForm } from "@/shared/composable/useCustomForm"
import { schema, type BookWriteModel } from "@/views/book/add/entities"

defineOptions({ name: "BookAdd" })

const { handleSubmit, isSubmitting, defineField } = useCustomForm<BookWriteModel>(schema)

const [title, titleAttrs] = defineField("title")
const [borrowDate, borrowDateAttrs] = defineField("borrowDate")

const [returnDate, returnDateAttrs] = defineField("returnDate")

const command = handleSubmit(async (form) => {
  console.debug(form)
})
</script>

<template>
  <FlexCol class="input-container" gap="8">
    <p>本の登録</p>
    <TextField
      size="m"
      label="タイトル"
      placeholder="タイトル"
      v-model="title"
      v-bind="titleAttrs"
    />
    <DatePicker
      size="m"
      label="貸出日"
      placeholder="日付を選択"
      v-model="borrowDate"
      v-bind="borrowDateAttrs"
    />
    <DatePicker
      size="m"
      label="返却日"
      placeholder="日付を選択"
      v-model="returnDate"
      v-bind="returnDateAttrs"
    />
    <SubmitButton :isSubmitting="isSubmitting" :command="command">登録</SubmitButton>
  </FlexCol>
</template>

<style scoped>
.input-container {
  width: 200px;
}
</style>
