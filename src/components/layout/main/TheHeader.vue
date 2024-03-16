<script lang="ts" setup>
import FlexBox from "@/components/parts/FlexBox.vue";
import GoogleIcon from "@/components/parts/GoogleIcon.vue";
import { useAuth } from "@/provider/auth/use-auth";
import { useRouter } from "vue-router";

const router = useRouter()
const { logout } = useAuth()
const onClickLogout = async () => {
  await router.replace({ name: "login" })
  await logout()
}
</script>

<template>
  <FlexBox class="row header">
    this is header
    <FlexBox class="row icons" gap="24">
      <GoogleIcon dark @click="onClickLogout"> logout </GoogleIcon>
      <GoogleIcon dark> more_horiz </GoogleIcon>
    </FlexBox>
  </FlexBox>
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
