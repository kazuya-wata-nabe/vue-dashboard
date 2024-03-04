<script lang="ts" setup generic="T">
defineProps<{
  label: string
  name: string
  errorMessage: string | undefined
  mask?: true
}>()

const model = defineModel<T>({ required: true })
</script>

<template>
  <label :for="name">{{ label }}</label>
  <input autocomplete="off" :type="mask ? 'password' : 'text'" :id="name" v-model="model" />
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
