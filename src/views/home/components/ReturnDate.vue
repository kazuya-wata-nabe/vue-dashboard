<script lang="ts" setup>
import { computed } from "vue"
import { DateYMD } from "@/views/__shared__/date-wrapper"
import type { Book } from "../model"

const props = defineProps<{
  today: string
  returnDate: Book["returnDate"]
}>()

const isOver = computed(() => ({
  "is-over": DateYMD.valueOf(props.today).isAfter(props.returnDate),
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
