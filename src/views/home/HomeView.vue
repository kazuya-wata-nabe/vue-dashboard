<script setup lang="ts">
import { useLoader } from "@/provider/app/use-loader"
import { ref } from "vue"
import BookTable from "./components/BookTable.vue"
import type { BookQueryServiceOnMemory } from "./infra"
import { Book } from "./model/book"

const props = defineProps<{ queryService: BookQueryServiceOnMemory }>()

const items = ref<Book[]>([])

const { withLoader } = useLoader()

withLoader(
  () => props.queryService.fetch(),
  (data) => (items.value = data),
  (err) => console.error(err),
)
</script>

<template>
  <h1>本の一覧</h1>
  <div class="table-container">
    <BookTable :items="items">
      <template #head>
        <th>タイトル</th>
        <th>借りた日</th>
        <th>返却期限</th>
      </template>
      <template #record="{ item }">
        <td class="title">{{ item.title }}</td>
        <td class="date">{{ item.borrowDate }}</td>
        <td class="date">{{ item.returnDate }}</td>
      </template>
    </BookTable>
  </div>
</template>

<style scoped>
.title {
  min-width: 300px;
  max-width: 300px;
  overflow-wrap: break-word;
}
.date {
  min-width: 100px;
}
</style>
