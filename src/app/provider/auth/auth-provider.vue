<script lang="ts" setup>
import { LocalStorage } from "./infra/local-storage"
import { ROLE, type Role } from "./model/role"
import { provideAuth } from "./use-auth"
import { ref } from "vue"
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
