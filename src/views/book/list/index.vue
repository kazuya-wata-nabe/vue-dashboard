<script setup lang="ts">
import DatePicker from "@/shared/parts/form/date-picker.vue"
import { GenericTable } from "@/shared/parts/table"
import { useInteract } from "./composable"
import { type Props } from "./types"

defineOptions({ name: "BookList", inheritAttrs: false })

const props = defineProps<Props>()

const { books, defineField, onChangeDate } = useInteract(() => props.date)

const [date, dateAttrs] = defineField("date", {
  onChange: ({ target }) => onChangeDate(target.value),
})
</script>

<template>
  <div>book list</div>
  <RouterLink :to="{ name: 'book-add' }"> Add </RouterLink>
  <div class="date-container">
    <DatePicker size="small" label="" placeholder="日付を選択" v-model="date" v-bind="dateAttrs" />
  </div>
  <GenericTable :items="books"> </GenericTable>
</template>

<style scoped>
.date-container {
  width: 100px;
}
</style>
