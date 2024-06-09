<script lang="ts" setup generic="T extends string | number">
import { computed } from "vue"
import { VTextField } from "vuetify/components/VTextField"

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
</script>

<template>
  <div class="input-container">
    <VTextField
      v-bind="$attrs"
      type="input"
      v-model="model"
      :label="label"
      :class="classes"
      :placeholder="placeholder"
      :error-messages="errorMessage"
    >
    </VTextField>
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
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
</style>
