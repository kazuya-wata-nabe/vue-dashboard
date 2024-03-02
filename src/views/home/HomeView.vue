<script setup lang="ts">
import { MainLayout } from "@/components/layout"
import { ref } from "vue"
import BookTable from "./components/BookTable.vue"
import { Book } from "./model/book"
import type { BookRepository } from "./model/repository"

const props = defineProps<{ repository: BookRepository }>()

const items = ref<Book[]>([])

// TODO: 共通化
props.repository
  .fetch()
  .then((res) => (items.value = res))
  .catch((e) => console.error(e))
  .finally(() => console.debug("finish"))
</script>

<template>
  <MainLayout>
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
  </MainLayout>
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
