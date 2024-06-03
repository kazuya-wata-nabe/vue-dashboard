<script lang="ts" setup>
import GoogleIcon from "@/shared/components/parts/icon/google-icon.vue"

const emits = defineEmits<{
  click: []
}>()
</script>

<template>
  <GoogleIcon class="menu-toggle" clickable @click="emits('click')"></GoogleIcon>
</template>

<style scoped>
.menu-toggle {
  &::after {
    content: "menu";
  }

  &:hover {
    &::after {
      content: "arrow_back";
    }
  }
}
</style>
