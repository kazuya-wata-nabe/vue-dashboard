<script lang="ts" setup>
import router from "@/router"
import { LocalStorage } from "./infra/local-storage"
import { provideAuth } from "./use-auth"

const storage = new LocalStorage()
// TODO: pluginにしてもいいかも
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
