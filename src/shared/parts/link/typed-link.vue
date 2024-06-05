<script setup lang="ts">
import { RouterLink } from "vue-router"
import type { RouteNames } from "@/shared/routes"

/**
 * RouterLinkでnameのtypoを防ぐための仕掛け
 * paramsのtypoは防げないので必要に応じてカスタムしてください
 */
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
