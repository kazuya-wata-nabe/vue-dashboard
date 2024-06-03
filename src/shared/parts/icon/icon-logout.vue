<script lang="ts" setup>
import BaseIcon from "./base-icon.vue"

const emits = defineEmits<{
  click: []
}>()
</script>

<template>
  <BaseIcon dark clickable @click="emits('click')">logout</BaseIcon>
</template>
