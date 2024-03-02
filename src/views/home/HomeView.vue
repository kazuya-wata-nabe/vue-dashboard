<script setup lang="ts">
import { MainLayout } from "@/components/layout"
import { ref } from "vue"
import { DateFormatter } from "../__shared__/date-formatter"
import BookTable from "./components/BookTable.vue"
import { Book } from "./model/book"

const d = DateFormatter.parse
const items = ref<Book[]>([
  Book({
    id: "abc-1",
    title: "hogehoge",
    borrowDate: d("2020-01-01"),
    returnDate: d("2020-02-01"),
  }),
  Book({
    id: "abc-2",
    title: "fugafuga",
    borrowDate: d("2021-01-01"),
    returnDate: d("2021-03-10"),
  }),
])
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
          <td>{{ item.title }}</td>
          <td>{{ item.borrowDate }}</td>
          <td>{{ item.returnDate }}</td>
        </template>
      </BookTable>
    </div>
  </MainLayout>
</template>

<style scoped>
th,
td {
  padding: 0 16px;
}
</style>
