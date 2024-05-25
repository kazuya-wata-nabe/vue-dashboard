<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  gap?: "8" | "16" | "24" | "32"
}>()

const _gap = computed(() => `${props.gap ?? 0}px`)
</script>

<template>
  <div class="flex-row">
    <slot></slot>
  </div>
</template>

<style scoped>
.flex-row {
  display: flex;
  flex-direction: row;
  gap: v-bind(_gap);
}
</style>
