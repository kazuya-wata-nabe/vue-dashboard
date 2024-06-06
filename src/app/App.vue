<script setup lang="ts">
import { computed } from "vue"
import { RouterView } from "vue-router"
import { useRoute } from "vue-router"
import { AuthProvider } from "@/app/provider"

const route = useRoute()
const layout = computed(() => route.meta.layout)
</script>

<template>
  <AuthProvider v-slot="{ role }">
    <Component :is="layout" :role="role">
      <RouterView :role="role" />
    </Component>
  </AuthProvider>
</template>
