<script lang="ts" setup></script>

<template>
  <form @submit.prevent id="form">
    <slot></slot>
  </form>
</template>

<style scoped>
#form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
