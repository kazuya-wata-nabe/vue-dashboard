<script lang="ts" setup>
defineProps<{
  dark?: true
}>()
</script>

<template>
  <span class="material-symbols-outlined" :class="{ dark }" v-bind="$attrs"><slot></slot></span>
</template>

<style scoped>
span {
  color: lightgray;
  &.dark {
    color: black;
  }
}
</style>
