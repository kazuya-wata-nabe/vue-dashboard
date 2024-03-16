<script lang="ts" setup>
import type { DateYMD } from "@/views/__shared__/date-wrapper"
import { computed } from "vue"
import type { Book } from "../model"

const props = defineProps<{
  today: DateYMD
  returnDate: Book["returnDate"]
}>()

const isOver = computed(() => ({
  "is-over": props.today.isAfter(props.returnDate),
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
