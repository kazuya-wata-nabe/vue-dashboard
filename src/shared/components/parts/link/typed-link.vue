<script setup lang="ts">
import { RouterLink } from "vue-router"
import type { AuthRouteNames } from "@/app/provider/router/auth-required"

defineOptions({ inheritAttrs: false })

defineProps<{
  to: { name: AuthRouteNames }
}>()
</script>

<template>
  <RouterLink v-bind="$attrs" :to="{ name: to.name }">
    <slot></slot>
  </RouterLink>
</template>
