<script lang="ts" setup>
import { ref } from "vue"
import type { Role } from "@/app/provider/auth/model/role"
import SideMenu from "@/shared/components/layout/main/side-menu.vue"
import TheHeader from "@/shared/components/layout/main/the-header.vue"

withDefaults(defineProps<{ role: Role }>(), { role: "ADMIN" })

const slim = ref(false)
const toggle = () => (slim.value = !slim.value)
</script>

<template>
  <div id="wrapper" :class="{ slim }">
    <TheHeader :role="role" />
    <SideMenu :slim="slim" @toggle="toggle" />
    <div class="main">
      <slot :role="role"></slot>
    </div>
  </div>
</template>

<style scoped>
#wrapper {
  min-width: 100vw;
  display: grid;
  grid-auto-rows: var(--header-height) 1fr;
  grid-template-columns: var(--aside-width-normal) 1fr;
  grid-template-areas:
    "header header"
    "aside main"
    "aside main";

  &.slim {
    grid-template-columns: var(--aside-width-slim) 1fr;
  }
}

.main {
  grid-area: main;
  padding: 16px;
}
</style>
