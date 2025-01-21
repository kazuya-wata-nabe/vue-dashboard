<script lang="ts" setup>
import { useId } from "@/shared/composable/use-id"

const emits = defineEmits<{
  click: []
}>()

const id = useId("form")
</script>

<template>
  <form :id="id" class="form-container" @submit.prevent="emits('click')">
    <slot></slot>
  </form>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border: solid 1px;
}
</style>
