<script lang="ts" setup>
import { useAuthenticated } from "@/features/auth"
import type { UserRole } from "@/features/user-role"
import { router } from "@/router"
import { client } from "@/shared/api/client"
import { ref } from "vue"

defineOptions({ inheritAttrs: false })

const role = ref<UserRole>()
const { isAuthenticated } = useAuthenticated()

router.beforeResolve(async (to) => {
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

<template>
  <slot :role="role"></slot>
</template>
