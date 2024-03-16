<script setup lang="ts">
import { RouterView } from "vue-router"
import AppLayout from "./layout/AppLayout.vue"
import AppProvider from "./provider/app/AppProvider.vue"
import AuthProvider from "./provider/auth/AuthProvider.vue"
</script>

<template>
  <AppProvider>
    <AuthProvider v-slot="{ role }">
      <AppLayout :role="role">
        <RouterView :role="role" />
      </AppLayout>
    </AuthProvider>
  </AppProvider>
</template>
