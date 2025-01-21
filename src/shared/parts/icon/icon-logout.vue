<script lang="ts" setup>
import BaseIcon from "./base-icon.vue"

const emits = defineEmits<{
  click: []
}>()
</script>

<template>
  <BaseIcon clickable dark @click="emits('click')">logout</BaseIcon>
</template>
