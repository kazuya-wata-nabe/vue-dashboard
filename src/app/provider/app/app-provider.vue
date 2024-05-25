<script setup lang="ts">
import { provideLoader } from "./use-loader"
import { ref } from "vue"

const isShownOverlay = ref(false)

const withLoader = async <T, U = unknown>(
  command: () => Promise<T>,
  onSuccess: (data: T) => void,
  onFailure: (err: U) => void,
): Promise<void> => {
  isShownOverlay.value = true
  try {
    const data = await command()
    onSuccess(data)
  } catch (e) {
    onFailure(e as U)
  }
  isShownOverlay.value = false
}

provideLoader({ withLoader })
</script>

<template>
  <slot></slot>
  <div class="load-overlay" v-show="isShownOverlay"></div>
</template>

<style scoped>
.load-overlay {
  position: fixed;
  inset: 0;
  min-width: 100vw;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.3);
}
</style>
