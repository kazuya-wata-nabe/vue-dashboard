<script setup lang="ts">
import { RouterView } from "vue-router"
import { AuthProvider } from "@/app/provider"
</script>

<template>
  <AuthProvider v-slot="{ role }">
    <Component :is="$route.meta.layout" :role="role">
      <RouterView :role="role" />
    </Component>
  </AuthProvider>
</template>
