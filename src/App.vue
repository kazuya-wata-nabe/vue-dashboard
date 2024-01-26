<script setup lang="ts">
import { RouterView } from 'vue-router'
import AuthProvider from './provider/AuthProvider.vue';
</script>

<template>
  <AuthProvider>
    <RouterView />
  </AuthProvider>
</template>
