<script setup lang="ts">
import { GenericTable } from "@/shared/parts"
import { useInteract } from "./composable"

defineOptions({ name: "HomeView" })

const props = defineProps<{
  date?: string
}>()

const { books } = useInteract(() => props.date)
</script>

<template>
  <main>
    <h1>本の一覧</h1>
    <div class="table-container">
      <GenericTable :items="books">
        <template #head>
          <th>タイトル</th>
          <th>借りた日</th>
          <th>返却期限</th>
        </template>
        <template #record="{ item }">
          <td class="title">{{ item.title }}</td>
          <td class="date">{{ item.borrowDate }}</td>
          <td class="date" :class="{ over: item.isOverReturnDate }">{{ item.returnDate }}</td>
        </template>
      </GenericTable>
    </div>
  </main>
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
