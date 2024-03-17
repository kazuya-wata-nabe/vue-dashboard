<script setup lang="ts">
import { ref } from "vue"
import { useLoader } from "@/provider/app/use-loader"
import { DateUtils } from "@/views/__shared__/date-utils"
import BookTable from "./components/BookTable.vue"
import type { BookQueryServiceOnMemory } from "./infra"
import { makeBookViewModelFromBook, type BookViewModel } from "./model"

type Props = {
  /** hoge */
  queryService: BookQueryServiceOnMemory
  /** テスト用 */
  today: string
}

const props = withDefaults(defineProps<Props>(), { today: DateUtils.format(DateUtils.today()) })
const items = ref<BookViewModel[]>([])

const { withLoader } = useLoader()

withLoader(
  () => props.queryService.fetch(),
  (data) => (items.value = data.map((book) => makeBookViewModelFromBook(book, props.today))),
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
        <td class="date" :class="{ 'is-over': item.isOverReturnDate }">{{ item.returnDate }}</td>
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
.over {
  color: red;
}
.is-over {
  color: red;
}
</style>
