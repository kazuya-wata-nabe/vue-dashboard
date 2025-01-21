<script setup lang="ts">
import { useCustomForm } from "@/shared/composable/use-custom-form"
import { SubmitButton, TextField } from "@/shared/parts"
import FlexRow from "@/shared/parts/box/flex-row.vue"
import TheForm from "@/shared/parts/form/the-form.vue"
import { schema } from "./schema"

defineOptions({ name: "BookListSearchForm" })

const { defineField, isSubmitting } = useCustomForm(schema)

const [bookName, bookNameAttrs] = defineField("name")
</script>

<template>
  <TheForm>
    <TextField
      v-model="bookName"
      label="本の名前"
      placeholder="sample"
      v-bind="bookNameAttrs"
      size="medium"
    />
    <FlexRow gap="8">
      <TextField
        v-model="bookName"
        label="返却期限日"
        placeholder="sample"
        v-bind="bookNameAttrs"
        size="medium"
      />
    </FlexRow>

    <SubmitButton :isSubmitting="isSubmitting" size="small">検索</SubmitButton>
  </TheForm>
</template>

<style scoped>
.title {
  min-width: 300px;
  max-width: 300px;
  overflow-wrap: break-word;
}

.date {
  min-width: 100px;
  &.over {
    color: red;
  }
}
</style>
