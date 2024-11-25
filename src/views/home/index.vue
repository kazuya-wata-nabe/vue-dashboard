<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { RouterLink, useRouter } from "vue-router"
import { FlexCol, GenericTable } from "@/shared/parts"
import { useInteract } from "./composable"

defineOptions({ name: "HomeView" })

const props = defineProps<{
  date?: string
}>()

const { books } = useInteract(() => props.date)

const router = useRouter()

const model = ref("")
const query = computed(() => router.currentRoute.value.query)
const submit = () => router.push({ query: { sample: model.value } })
onMounted(() => {
  const value = query.value["sample"]?.toString()
  model.value = value ?? ""
})
</script>

<template>
  <main>
    {{ query }}
    <FlexCol>
      <input v-model="model" />sample
      <button @click="submit">submit</button>
    </FlexCol>
    <h1>本の一覧</h1>
    <div class="table-container">
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
