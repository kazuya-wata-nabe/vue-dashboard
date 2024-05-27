<script lang="ts" setup>
import { ref } from "vue"
import { LocalStorage } from "@/app/provider/auth/infra/local-storage"
import { ROLE, type Role } from "@/app/provider/auth/model/role"
import { provideAuth } from "@/app/provider/auth/use-auth"
import router from "@/app/provider/router"

defineOptions({ inheritAttrs: false })

const storage = new LocalStorage()
// TODO: pluginにしてもいいかも
provideAuth(storage)

const role = ref<Role>()

router.beforeEach(async (to) => {
  const isAuthenticated = await storage.load()
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: "login" }
  } else {
    role.value = to.name === "home" ? ROLE.ADMIN : ROLE.COMMON
    return true
  }
})
</script>

<template>
  <slot :role="role"></slot>
</template>
