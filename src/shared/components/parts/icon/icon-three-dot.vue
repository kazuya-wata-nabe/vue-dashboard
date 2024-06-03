<script lang="ts" setup>
import BaseIcon from "@/shared/components/parts/icon/base-icon.vue"

const emits = defineEmits<{
  click: []
}>()
</script>

<template>
  <BaseIcon clickable dark @click="emits('click')">more_horiz</BaseIcon>
</template>
