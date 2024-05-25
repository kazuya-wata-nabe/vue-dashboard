<script lang="ts" setup generic="T">
import { computed } from "vue"

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  size: "s" | "m" | "l"
  label: string
  placeholder: string
  errorMessage: string | undefined
}>()

const model = defineModel<T | undefined>({ required: true })

const classes = computed(() => ({
  "text-input": true,
  small: props.size === "s",
  medium: props.size === "m",
  large: props.size === "l",
}))

const id = `input-${crypto.randomUUID()}`
</script>

<template>
  <div class="input-container">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :class="classes"
      :placeholder="placeholder"
      type="text"
      v-model="model"
      v-bind="$attrs"
    />
    <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
}
.text-input {
  line-height: 1.5rem;
  .small {
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
