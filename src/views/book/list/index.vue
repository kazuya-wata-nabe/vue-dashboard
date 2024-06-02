<script setup lang="ts">
import DatePicker from "@/shared/components/parts/form/date-picker.vue"
import { GenericTable } from "@/shared/components/parts/table"
import { useInteract } from "@/views/book/list/composable/use-interact"
import { type Props } from "@/views/book/list/types"

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
    <DatePicker size="s" label="" placeholder="日付を選択" v-model="date" v-bind="dateAttrs" />
  </div>
  <GenericTable :items="books"> </GenericTable>
</template>

<style scoped>
.date-container {
  width: 100px;
}
</style>
