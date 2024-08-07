<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  gap?: "8" | "16" | "24" | "32"
}>()

const classes = computed(() => ({
  "flex-col": true,
  [`gap${props.gap}`]: props.gap,
}))
</script>

<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<style scoped>
.flex-col {
  display: flex;
  flex-direction: column;

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
