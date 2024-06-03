<script lang="ts" setup>
import GoogleIcon from "@/shared/components/parts/icon/google-icon.vue"

const emits = defineEmits<{
  click: []
}>()
</script>

<template>
  <GoogleIcon dark clickable @click="emits('click')">logout</GoogleIcon>
</template>
