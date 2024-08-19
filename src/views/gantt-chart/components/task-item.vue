<script setup lang="ts">
defineOptions({ inheritAttrs: false })
defineProps<{
  title: string
  assigner: string
}>()
</script>

<template>
  <div class="task-item">{{ title }}</div>
</template>

<style scoped>
.task-item {
  height: 30px;
}
</style>
