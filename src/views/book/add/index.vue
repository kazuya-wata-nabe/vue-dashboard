<script setup lang="ts">
import { FlexCol, TextField, SubmitButton, DatePicker } from "@/shared/parts"
import { useInteract } from "./composable"

defineOptions({ name: "BookAdd" })

const { isSubmitting, defineField, onClickSubmit } = useInteract()

const [title, titleAttrs] = defineField("title")
const [borrowDate, borrowDateAttrs] = defineField("borrowDate")
const [returnDate, returnDateAttrs] = defineField("returnDate")
</script>

<template>
  <FlexCol class="input-container" gap="8">
    <p>本の登録</p>
    <TextField
      v-model="title"
      size="medium"
      label="タイトル"
      placeholder="タイトル"
      v-bind="titleAttrs"
    />
    <DatePicker
      v-model="borrowDate"
      size="medium"
      label="貸出日"
      placeholder="日付を選択"
      v-bind="borrowDateAttrs"
    />
    <DatePicker
      v-model="returnDate"
      size="medium"
      label="返却日"
      placeholder="日付を選択"
      v-bind="returnDateAttrs"
    />
    <SubmitButton :is-submitting="isSubmitting" @click="onClickSubmit">登録</SubmitButton>
  </FlexCol>
</template>

<style scoped>
.input-container {
  width: 200px;
}
</style>
