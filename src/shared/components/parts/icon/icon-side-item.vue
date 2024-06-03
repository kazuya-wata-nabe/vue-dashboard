<script lang="ts" setup>
import GoogleIcon from "@/shared/components/parts/icon/google-icon.vue"

defineProps<{
  icon: "home" | "book"
}>()
</script>

<template>
  <GoogleIcon class="color-inherit" clickable>{{ icon }}</GoogleIcon>
</template>

<style scoped>
.color-inherit {
  color: inherit;
}
</style>
