<script setup lang="ts">
import FlexCol from "@/shared/parts/box/flex-col.vue"
import { BookListSearchForm } from "./components/book-list-search-form"
import BookListTable from "./components/book-list-table.vue"
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
    <FlexCol gap="16">
      <div class="form-container">
        <BookListSearchForm />
      </div>

      <div class="table-container">
        <div v-if="books === undefined">empty</div>
        <BookListTable v-else :books="books" />
      </div>
    </FlexCol>
  </main>
</template>
