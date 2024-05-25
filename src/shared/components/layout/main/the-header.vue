<script lang="ts" setup>
import { useRouter } from "vue-router"
import type { Role } from "@/app/provider/auth/model/role"
import { useAuth } from "@/app/provider/auth/use-auth"
import { FlexRow } from "@/shared/components/parts"
import GoogleIcon from "@/shared/components/parts/google-icon.vue"

defineProps<{
  role: Role
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
