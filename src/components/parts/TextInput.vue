<script lang="ts" setup>
defineProps<{ label: string }>()
</script>

<template>
  <label>{{ label }}</label>
  <input autocomplete="off" v-bind="$attrs" />
</template>

<style scoped>
input {
  line-height: 1.5rem;
}
</style>