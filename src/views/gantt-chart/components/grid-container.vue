<script setup lang="ts">
import { computed } from "vue"

const classes = computed(() => ({
  "grid-container": true,
}))
</script>

<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  width: 100%;
}
</style>
