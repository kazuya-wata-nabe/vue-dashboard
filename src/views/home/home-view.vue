<script setup lang="ts">
import { GenericsTable } from "@/shared/components/parts"
import { useInteract } from "@/views/home/composable/useInteract"

const { books } = useInteract()
</script>

<template>
  <h1>本の一覧</h1>
  <div class="table-container">
    <GenericsTable :items="books">
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
    </GenericsTable>
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
  & .over {
    color: red;
  }
}
</style>
