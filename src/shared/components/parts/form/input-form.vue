<script lang="ts" setup>
const emits = defineEmits<{
  click: []
}>()
const id = Symbol().toString()
</script>

<template>
  <form @submit.prevent :id="id" @click="emits('click')">
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
