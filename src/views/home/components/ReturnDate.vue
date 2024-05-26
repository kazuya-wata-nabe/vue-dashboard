<script lang="ts" setup>
import { computed } from "vue"

const props = defineProps<{
  returnDate: string
  isOver: boolean
}>()

const isOver = computed(() => ({
  "is-over": props.isOver,
}))
</script>

<template>
  <td class="date" :class="isOver">{{ returnDate }}</td>
</template>

<style scoped>
.is-over {
  color: red;
}
</style>
