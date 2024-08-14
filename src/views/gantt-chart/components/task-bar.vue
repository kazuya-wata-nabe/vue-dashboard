<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  width: number
  offset: number
}>()

const width = computed(() => {
  return `${props.width / 100}px`
})

const left = computed(() => `${(props.offset / 100) * 40}px`)
</script>

<template>
  <div class="task-bar"></div>
</template>

<style scoped>
.task-bar {
  height: 30px;
  width: calc(40 * v-bind(width));
  background-color: silver;
  position: relative;
  left: v-bind(left);
}
</style>
