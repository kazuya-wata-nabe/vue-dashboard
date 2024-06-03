<script setup lang="ts">
import type { RouteNames } from "@/router/routes"
import { RouterLink } from "vue-router"

defineProps<{
  to: { name: RouteNames }
  params?: Record<string, string>
}>()
</script>

<template>
  <RouterLink v-bind="$attrs" :to="{ name: to.name, params }">
    <slot></slot>
  </RouterLink>
</template>
