<script lang="ts" setup>
import BaseIcon from "@/shared/components/parts/icon/base-icon.vue"

const emits = defineEmits<{
  click: []
}>()
</script>

<template>
  <BaseIcon dark clickable @click="emits('click')">logout</BaseIcon>
</template>
