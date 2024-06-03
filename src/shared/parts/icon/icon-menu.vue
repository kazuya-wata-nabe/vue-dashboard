<script lang="ts" setup>
import BaseIcon from "./base-icon.vue"

const emits = defineEmits<{
  click: []
}>()
</script>

<template>
  <BaseIcon class="menu-toggle" clickable @click="emits('click')"></BaseIcon>
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
