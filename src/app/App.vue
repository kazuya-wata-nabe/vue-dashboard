<script setup lang="ts">
import { RouterView } from "vue-router"
import { AppProvider, AuthProvider } from "@/app/provider"
</script>

<template>
  <AppProvider>
    <AuthProvider v-slot="{ role }">
      <Component :is="$route.meta.layout">
        <RouterView :role="role" />
      </Component>
    </AuthProvider>
  </AppProvider>
</template>
