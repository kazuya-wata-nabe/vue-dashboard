<script lang="ts" setup>
const emits = defineEmits<{
  click: []
}>()
</script>

<template>
  <form @submit.prevent id="form" @click="emits('click')">
    <slot></slot>
  </form>
</template>

<style scoped>
#form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
