<script setup lang="ts">
import { RouterLink } from "vue-router"
import type { Book } from "@/features/book"
import { GenericTable } from "@/shared/parts"

defineProps<{
  books: Book[]
}>()
</script>

<template>
  <GenericTable :items="books">
    <template #head>
      <th>タイトル</th>
      <th>借りた日</th>
      <th>返却期限</th>
      <th />
    </template>
    <template #record="{ item }">
      <td class="title">{{ item.title }}</td>
      <td class="date">{{ item.borrowDate }}</td>
      <td class="date" :class="{ over: item.isOverReturnDate }">{{ item.returnDate }}</td>
      <td class="">
        <RouterLink :to="{ name: 'book-show', params: { id: 1 } }"> aaaa </RouterLink>
      </td>
    </template>
  </GenericTable>
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
