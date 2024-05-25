<script setup lang="ts">
import { schema } from "../model"
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import { FlexCol, TextField, TheButton } from "@/shared/components/parts"
import DatePicker from "@/shared/components/parts/date-picker/date-picker.vue"

defineOptions({ name: "BookAdd" })

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: toTypedSchema(schema),
})

const [title, titleAttrs] = defineField("title", {
  props: () => ({ errorMessage: errors.value.title }),
})
const [borrowDate, borrowDateAttrs] = defineField("borrowDate", {
  props: () => ({ errorMessage: errors.value.borrowDate }),
})
const [returnDate, returnDateAttrs] = defineField("returnDate", {
  props: () => ({ errorMessage: errors.value.returnDate }),
})

const command = handleSubmit(async (form) => {
  console.debug(form)
})
</script>

<template>
  <FlexCol class="input-container" gap="8">
    <p>本の登録</p>
    <TextField
      id="title"
      size="m"
      label="タイトル"
      placeholder="タイトル"
      v-model="title"
      v-bind="titleAttrs"
    />
    <DatePicker
      id="date-from"
      label="貸出日"
      size="m"
      placeholder="日付を選択"
      v-model="borrowDate"
      v-bind="borrowDateAttrs"
    />
    <DatePicker
      id="date-to"
      label="返却日"
      size="m"
      placeholder="日付を選択"
      v-model="returnDate"
      v-bind="returnDateAttrs"
    />
    <TheButton :command="command">登録</TheButton>
  </FlexCol>
</template>

<style scoped>
.input-container {
  width: 200px;
}
</style>
