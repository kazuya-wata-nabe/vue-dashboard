<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  width: number
}>()

const width = computed(() => `${props.width / 100}px`)
</script>

<template>
  <div class="task-bar"></div>
</template>

<style scoped>
.task-bar {
  height: 30px;
  width: calc(40 * v-bind(width));
  background-color: silver;
}
</style>
