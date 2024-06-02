<script lang="ts" setup>
import { ref } from "vue"
import { LocalStorage } from "@/app/provider/auth/infra/local-storage"
import { router } from "@/app/provider/router"
import { provideAuth, type UserRole } from "@/features/auth"
import { client } from "@/shared/api/client"

defineOptions({ inheritAttrs: false })

const storage = new LocalStorage()
// TODO: pluginにしてもいいかも
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
  <slot :role="role" :storage="storage"></slot>
</template>
