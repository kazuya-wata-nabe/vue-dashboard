<script lang="ts" setup>
import router from "@/router"
import { ref } from "vue"
import { LocalStorage } from "./infra/local-storage"
import { ROLE, type Role } from "./model/role"
import { provideAuth } from "./use-auth"

defineOptions({ inheritAttrs: false })

const storage = new LocalStorage()
// TODO: pluginにしてもいいかも
provideAuth(storage)

const role = ref<Role>()

router.beforeEach(async (to, _, next) => {
  const isAuthenticated = await storage.load()
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "login" })
  } else {
    role.value = to.name === "home" ? ROLE.admin : ROLE.common
    next()
  }
})
</script>

<template>
  <slot :role="role"></slot>
</template>
