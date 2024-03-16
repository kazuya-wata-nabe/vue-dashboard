<script setup lang="ts">
import type { Role } from "@/provider/auth/model/role";

defineProps<{
  role: Role | undefined
}>()
</script>

<template>
  <component :is="$route.meta.layout">
    <slot :role="role"></slot>
  </component>
</template>
