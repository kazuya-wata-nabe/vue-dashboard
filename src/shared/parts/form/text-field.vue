<script lang="ts" setup generic="T">
import { computed } from "vue"
import { useId } from "@/shared/composable/use-id"

const props = defineProps<{
  size: "small" | "medium" | "large"
  label: string
  placeholder: string
  errorMessage: string | undefined
}>()

const model = defineModel<T | undefined>({ required: true })

const classes = computed(() => ({
  "text-input": true,
  [props.size]: true,
}))

const id = useId("text")
</script>

<template>
  <div class="input-container">
    <label :for="id">{{ label }}</label>
    <input
      v-bind="$attrs"
      :id="id"
      v-model="model"
      :class="classes"
      :placeholder="placeholder"
      type="text"
    />
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  & label {
    display: flex;
    flex-direction: column;
  }
}
.text-input {
  line-height: 1.5rem;
  &.small {
    width: 100px;
  }
  &.medium {
    width: 200px;
  }
  &.large {
    width: 300px;
  }
}
.error-message {
  color: red;
}
</style>
