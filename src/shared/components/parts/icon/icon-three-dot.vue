<script lang="ts" setup>
import GoogleIcon from "@/shared/components/parts/icon/google-icon.vue"

const emits = defineEmits<{
  click: []
}>()
</script>

<template>
  <GoogleIcon clickable dark @click="emits('click')">more_horiz</GoogleIcon>
</template>
