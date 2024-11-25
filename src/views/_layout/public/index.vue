<script setup lang="ts">
defineOptions({ name: "PublicLayout", inheritAttrs: false })
</script>

<template>
  <div id="wrapper">
    <slot></slot>
  </div>
</template>

<style scoped>
#wrapper {
  display: flex;
  margin: 0 auto;
}
</style>
