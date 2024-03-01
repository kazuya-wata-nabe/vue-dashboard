<script lang="ts" setup>
import { LocalStorage } from "@/infra/auth/storage/local-storage"
import router from "@/router"
import { provideAuth } from "./use-auth"

const storage = new LocalStorage()
// TODO: DIの場所を変えたい
provideAuth(storage)

router.beforeEach(async (to, _, next) => {
  const isAuthenticated = await storage.load()
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "login" })
  } else {
    next()
  }
})
</script>

<template>
  <slot></slot>
</template>
