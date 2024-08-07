<script lang="ts" setup>
const emits = defineEmits<{
  click: []
}>()

const id = `form-${crypto.randomUUID()}`
</script>

<template>
  <form @submit.prevent="emits('click')" :id="id">
    <slot></slot>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
