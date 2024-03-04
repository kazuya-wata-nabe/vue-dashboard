<script setup lang="ts">
import { FlexBox, TextInput, TheButton } from "@/components/parts"
import { toTypedSchema } from "@vee-validate/zod"
import { useForm } from "vee-validate"
import { schema } from "../model"

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
  <FlexBox class="col">
    <p>本の登録</p>
    <FlexBox class="col input-container">
      <TextInput
        type="text"
        label="タイトル"
        name="title"
        v-model="title"
        :errorMessage="errors.title"
      />
    </FlexBox>
    <FlexBox class="col input-container">
      <TextInput
        type="date"
        label="貸出日"
        name="borrow-date"
        v-model="borrowDate"
        :errorMessage="errors.borrowDate"
      />
    </FlexBox>
    <FlexBox class="col input-container">
      <TextInput
        type="date"
        label="返却日"
        name="return-date"
        v-model="returnDate"
        :errorMessage="errors.returnDate"
      />
    </FlexBox>
    <FlexBox class="col input-container">
      <TheButton :command="command">登録</TheButton>
    </FlexBox>
  </FlexBox>
</template>

<style scoped>
.input-container {
  width: 200px;
}
</style>
