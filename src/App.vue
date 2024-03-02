<script setup lang="ts">
import { RouterView } from "vue-router"
import AppProvider from "./provider/app/AppProvider.vue"
import AuthProvider from "./provider/auth/AuthProvider.vue"
</script>

<template>
  <AppProvider>
    <AuthProvider>
      <RouterView />
    </AuthProvider>
  </AppProvider>
</template>
