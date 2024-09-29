<script lang="ts">
import { ref } from "vue"
import { router } from "@/app/provider/router"
import { authMiddleware, useAuthenticated } from "@/features/auth"
import { refresh } from "@/features/auth/model"
import type { UserRole } from "@/features/user-role"
import { client, clientMiddleware } from "@/shared/api/client"

const role = ref<UserRole>()

router.beforeResolve(async (to) => {
  const { isAuthenticated } = useAuthenticated()
  const jwt = await isAuthenticated()
  clientMiddleware.EJECT(authMiddleware(undefined, refresh))

  if (!to.meta.requiresAuth) {
    return true
  }
  if (!jwt) {
    return { name: "login" }
  }

  clientMiddleware.USE(authMiddleware(jwt, refresh))
  const { data, error } = await client.GET("/me")

  if (error) {
    return { name: "login" }
  }

  role.value = data.role
  return true
})
</script>

<script lang="ts" setup>
defineOptions({ inheritAttrs: false })
</script>

<template>
  <slot :role="role"></slot>
</template>
