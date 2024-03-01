<script setup lang="ts">
const props = defineProps<{
  class: `row${string}` | `column${string}`
  gap?: "16" | "24" | "32"
}>()

const gap = `gap${props.gap ?? 8}`
</script>

<template>
  <div class="flex-box" :class="[$props.class, gap]">
    <slot></slot>
  </div>
</template>

<style scoped>
.flex-box {
  display: flex;

  &.row {
    flex-direction: row;
  }

  &.column {
    flex-direction: column;
  }

  &.gap8 {
    gap: 8px;
  }

  &.gap16 {
    gap: 16px;
  }

  &.gap24 {
    gap: 24px;
  }

  &.gap32 {
    gap: 32px;
  }
}
</style>
