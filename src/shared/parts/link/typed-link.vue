<script setup lang="ts">
import { RouterLink } from "vue-router"
import type { RouteNames } from "@/router/routes"

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
