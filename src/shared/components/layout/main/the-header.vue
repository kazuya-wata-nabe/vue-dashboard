<script lang="ts" setup>
import { useRouter } from "vue-router"
import type { UserRole } from "@/features/auth"
import { useAuth } from "@/features/auth"
import { FlexRow, GoogleIcon } from "@/shared/components/parts"

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
      <GoogleIcon dark @click="onClickLogout"> logout </GoogleIcon>
      <GoogleIcon dark> more_horiz </GoogleIcon>
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

.material-symbols-outlined {
  cursor: pointer;
}
</style>
