<script lang="ts" setup>
import BaseIcon from "@/shared/components/parts/icon/base-icon.vue"

defineProps<{
  icon: "home" | "book"
}>()
</script>

<template>
  <BaseIcon class="color-inherit" clickable>{{ icon }}</BaseIcon>
</template>

<style scoped>
.color-inherit {
  color: inherit;
}
</style>
