<script lang="ts" setup>
import SideMenu from "./side-menu.vue"
import TheHeader from "./the-header.vue"
import { ref } from "vue"
import type { Role } from "@/app/provider/auth/model/role"

defineProps<{ role: Role }>()

const HEADER_HEIGHT = "50px"

const slim = ref(false)
const toggle = () => (slim.value = !slim.value)
</script>

<template>
  <div id="wrapper" :class="{ slim }">
    <TheHeader :role="role" />
    <SideMenu :header-height="HEADER_HEIGHT" :slim="slim" @toggle="toggle" />
    <div class="main">
      <slot :role="role"></slot>
    </div>
  </div>
</template>

<style scoped>
#wrapper {
  min-width: 100vw;
  display: grid;
  grid-auto-rows: v-bind(HEADER_HEIGHT) 1fr;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "header header"
    "aside main"
    "aside main";

  &.slim {
    grid-template-columns: 50px 1fr;
  }
}

.main {
  grid-area: main;
  padding: 16px;
}
</style>
