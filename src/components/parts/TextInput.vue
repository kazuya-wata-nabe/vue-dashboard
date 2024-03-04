<script lang="ts" setup generic="T">
defineProps<{
  type: "text" | "password" | "date"
  label: string
  name: string
  errorMessage: string | undefined
}>()

const model = defineModel<T>({ required: true })
</script>

<template>
  <label :for="name">{{ label }}</label>
  <input autocomplete="off" :type="type" :id="name" v-model="model" />
  <p class="error-message">{{ errorMessage }}</p>
</template>

<style scoped>
input {
  line-height: 1.5rem;
}
.error-message {
  color: red;
}
</style>
