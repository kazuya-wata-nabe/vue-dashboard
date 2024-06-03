<script setup lang="ts">
import { RouterLink } from "vue-router"
import type { RouteNames } from "@/router/routes"

defineProps<{
  to: { name: RouteNames }
}>()
</script>

<template>
  <RouterLink v-bind="$attrs" :to="{ name: to.name }">
    <slot></slot>
  </RouterLink>
</template>
