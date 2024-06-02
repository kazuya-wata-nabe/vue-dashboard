<script lang="ts" setup>
import { ref } from "vue"
import { router } from "@/app/provider/router"
import { useAuthenticated } from "@/features/auth"
import type { UserRole } from "@/features/user-role"
import { client } from "@/shared/api/client"

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
