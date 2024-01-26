<script lang="ts" setup>
defineProps<{ label: string }>()
</script>

<template>
  <label>{{ label }}</label>
  <input autocomplete="off" v-bind="$attrs" />
</template>

<style scoped></style>