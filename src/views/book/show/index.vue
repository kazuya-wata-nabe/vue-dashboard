<script setup lang="ts">
import { onMounted, reactive } from "vue"
import { FlexCol } from "@/shared/parts"
import SubComponent from "./SubComponent.vue"
import type { Props } from "./types"

defineOptions({ name: "BookShow" })
const props = defineProps<{
  id: string
}>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const book = reactive<any>({})

onMounted(() => {
  fetch("/books/" + props.id)
    .then((res) => res.json())
    .then((json) => (book.value = json))
    .catch((error) => alert(error))
})
</script>

<template>
  <FlexCol class="input-container" gap="8">
    <p>本の登録</p>
    <div>タイトル</div>
    <div>返却期限</div>
    <sub-component :date="book.date"></sub-component>

    <RouterLink :to="{ name: 'home' }">戻る</RouterLink>
  </FlexCol>
</template>

<style scoped>
.input-container {
  width: 200px;
}
</style>
