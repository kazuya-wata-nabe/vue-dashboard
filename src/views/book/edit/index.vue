<script setup lang="ts">
import { FlexCol, TextField, SubmitButton, DatePicker } from "@/shared/parts"
import { useInteract } from "./composable"
import type { Props } from "./types"

defineOptions({ name: "BookAdd" })
defineProps<Props>()

const { isSubmitting, defineField, onClickSubmit } = useInteract()

const [title, titleAttrs] = defineField("title")
const [borrowDate, borrowDateAttrs] = defineField("borrowDate")
const [returnDate, returnDateAttrs] = defineField("returnDate")
</script>

<template>
  <FlexCol class="input-container" gap="8">
    <p>本の登録</p>
    <TextField
      size="medium"
      label="タイトル"
      placeholder="タイトル"
      v-model="title"
      v-bind="titleAttrs"
    />
    <DatePicker
      size="medium"
      label="貸出日"
      placeholder="日付を選択"
      v-model="borrowDate"
      v-bind="borrowDateAttrs"
    />
    <DatePicker
      size="medium"
      label="返却日"
      placeholder="日付を選択"
      v-model="returnDate"
      v-bind="returnDateAttrs"
    />
    <SubmitButton :isSubmitting="isSubmitting" @click="onClickSubmit">登録</SubmitButton>
  </FlexCol>
</template>

<style scoped>
.input-container {
  width: 200px;
}
</style>
