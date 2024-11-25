<script setup lang="ts">
import { onMounted } from "vue"
import { FlexCol } from "@/shared/parts"
import type { Props } from "./types"

defineOptions({ name: "BookAdd" })
defineProps<Props>()

onMounted(() => {
  const { back } = globalThis.history.state
  console.debug("state:", back)
})
</script>

<template>
  <FlexCol class="input-container" gap="8">
    <p>本の登録</p>
    <div>タイトル</div>
    <RouterLink :to="{ name: 'home' }">戻る</RouterLink>
  </FlexCol>
</template>

<style scoped>
.input-container {
  width: 200px;
}
</style>
