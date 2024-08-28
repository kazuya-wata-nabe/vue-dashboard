<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  gap?: "8" | "16" | "24" | "32"
  wrap?: boolean
}>()

const classes = computed(() => ({
  "flex-row": true,
  wrap: props.wrap,
  [`gap${props.gap}`]: props.gap,
}))
</script>

<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<style scoped>
.flex-row {
  display: flex;
  flex-direction: row;

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
  &.wrap {
    flex-wrap: wrap;
  }
}
</style>
