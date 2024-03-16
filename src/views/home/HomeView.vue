<script setup lang="ts">
import { ref } from "vue"
import { useLoader } from "@/provider/app/use-loader"
import { DateYMD } from "@/views/__shared__/date-wrapper"
import BookTable from "./components/BookTable.vue"
import ReturnDate from "./components/ReturnDate.vue"
import type { BookQueryServiceOnMemory } from "./infra"
import { Book } from "./model/book"

type Props = {
  /** hoge */
  queryService: BookQueryServiceOnMemory
  /** テスト用 */
  today: DateYMD
}

const props = withDefaults(defineProps<Props>(), { today: () => DateYMD.today() })

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
        <ReturnDate :today="today" :return-date="item.returnDate" />
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
</style>
