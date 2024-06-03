<script lang="ts" setup>
import { useRouter } from "vue-router"
import { useAuth } from "@/features/auth"
import type { UserRole } from "@/features/user-role"
import { FlexRow, IconLogout } from "@/shared/components/parts"
import IconThreeDot from "@/shared/components/parts/icon/icon-three-dot.vue"

defineProps<{
  role: UserRole
}>()

const router = useRouter()
const { logout } = useAuth()
const onClickLogout = async () => {
  await router.replace({ name: "login" })
  await logout()
}
</script>

<template>
  <FlexRow class="header">
    this is header, role is {{ role }}
    <FlexRow class="icons" gap="24">
      <IconLogout @click="onClickLogout" />
      <IconThreeDot />
    </FlexRow>
  </FlexRow>
</template>

<style scoped>
.header {
  grid-area: header;
  background: whitesmoke;
  justify-content: space-between;
}

.icons {
  place-content: center;
  place-items: center;
  padding: 0 16px;
}
</style>
