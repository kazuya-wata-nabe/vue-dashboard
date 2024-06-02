<script lang="ts" setup>
import { ref } from "vue"
import { LocalStorage } from "@/app/provider/auth/infra/local-storage"
import { router } from "@/app/provider/router"
import { provideAuth } from "@/features/auth"
import type { UserRole } from "@/features/user-role"
import { client } from "@/shared/api/client"

defineOptions({ inheritAttrs: false })

const storage = new LocalStorage()
provideAuth(storage)

const role = ref<UserRole>()

router.beforeResolve(async (to) => {
  const isAuthenticated = await storage.load()
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: "login" }
  }
  const { data, error } = await client.GET("/me")
  if (error) {
    return { name: "login" }
  }
  role.value = data.role
  return true
})
</script>

<template>
  <slot :storage="storage"></slot>
</template>
