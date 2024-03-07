<script setup lang="ts">
import { RouterView } from "vue-router"
import AppLayout from "./layout/AppLayout.vue"
import AppProvider from "./provider/app/AppProvider.vue"
import AuthProvider from "./provider/auth/AuthProvider.vue"
</script>

<template>
  <AppProvider>
    <AuthProvider>
      <AppLayout>
        <RouterView />
      </AppLayout>
    </AuthProvider>
  </AppProvider>
</template>
