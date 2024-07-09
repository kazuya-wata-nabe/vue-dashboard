<script lang="ts">
import { ref } from "vue"
import { router } from "@/app/provider/router"
import { useAuthenticated } from "@/features/auth"
import type { UserRole } from "@/features/user-role"
import { client } from "@/shared/api/client"

const role = ref<UserRole>()

router.beforeResolve(async (to) => {
  const { isAuthenticated } = useAuthenticated()
  const authenticated = await isAuthenticated()
  if (to.meta.requiresAuth && !authenticated) {
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

<script lang="ts" setup>
defineOptions({ inheritAttrs: false })
</script>

<template>
  <slot :role="role"></slot>
</template>
