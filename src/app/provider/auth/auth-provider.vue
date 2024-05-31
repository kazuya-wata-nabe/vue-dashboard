<script lang="ts" setup>
import { ref } from "vue"
import { LocalStorage } from "@/app/provider/auth/infra/local-storage"
import { router } from "@/app/provider/router"
import type { UserRole } from "@/entities/user-role"
import { provideAuth } from "@/features/auth"

defineOptions({ inheritAttrs: false })

const storage = new LocalStorage()
// TODO: pluginにしてもいいかも
provideAuth(storage)

const role = ref<UserRole>()

router.beforeEach(async (to) => {
  const isAuthenticated = await storage.load()
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: "login" }
  } else {
    return true
  }
})
</script>

<template>
  <slot :role="role" :storage></slot>
</template>
