<script setup lang="ts">
import { RouterView } from "vue-router"
import { AppProvider, AuthProvider } from "@/app/provider"
</script>

<template>
  <AppProvider>
    <AuthProvider v-slot="{ role }">
      <RouterView :role="role" />
    </AuthProvider>
  </AppProvider>
</template>
