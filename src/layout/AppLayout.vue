<script setup lang="ts">
import type { Role } from "@/provider/auth/model/role"

defineProps<{
  role: Role | undefined
}>()
</script>

<template>
  <component :is="$route.meta.layout" :role="role">
    <slot></slot>
  </component>
</template>
