<template>
  <div class="date">
    {{ date.substring(0, 4) }}年 {{ date.substring(4, 6) }}月 {{ date.substring(6, 8) }}日
  </div>
</template>

<style scoped>
.container {
  display: flex;
}
</style>

<script lang="ts" setup>
defineProps<{
  date: string
}>()
</script>
