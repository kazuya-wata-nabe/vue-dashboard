<script lang="ts" setup generic="T">
defineProps<{
  label: string
  name: string
  errorMessage: string | undefined
  mask?: true
}>()

const model = defineModel<T>({ required: true })
defineOptions({ inheritAttrs: false })
</script>

<template>
  <label :for="name">{{ label }}</label>
  <input :id="name" :type="mask ? 'password' : 'text'" v-model="model" autocomplete="off" />
  <p class="error-message">{{ errorMessage }}</p>
</template>

<style scoped>
.input-container {
  width: auto;
}
input {
  line-height: 1.5rem;
}
.error-message {
  color: red;
}
</style>
