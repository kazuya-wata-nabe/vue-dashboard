<script setup lang="ts">
import BaseModal from "./base-modal.vue"

defineProps<{
  isOpen: boolean
}>()
</script>

<template>
  <BaseModal :is-open="isOpen">
    <template #content>
      <div>error</div>
      <slot></slot>
    </template>
  </BaseModal>
</template>
