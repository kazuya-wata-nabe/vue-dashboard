<script setup lang="ts">
import { RouterLink } from "vue-router"
import type { AuthRoute } from "@/shared/routes"

defineProps<{
  to: { name: AuthRoute }
}>()
</script>

<template>
  <RouterLink v-bind="$attrs" :to="{ name: to.name }">
    <slot></slot>
  </RouterLink>
</template>
