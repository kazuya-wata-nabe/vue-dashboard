<script lang="ts" setup>
import router from "@/router"
import { isAuthenticated } from "./useAuth"

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: "login" })
  } else {
    next()
  }
})
</script>

<template>
  <slot></slot>
</template>
