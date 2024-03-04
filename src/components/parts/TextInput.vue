<script lang="ts" setup generic="T">
defineProps<{
  label: string
  name: string
  errorMessage: string | undefined
}>()

const model = defineModel<T>({ required: true })
</script>

<template>
  <label>{{ label }}</label>
  <input autocomplete="off" v-bind="$attrs" v-model="model" />
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
