<script setup lang="ts">
import { ref } from "vue"
import { provideLoader } from "./use-loader"

const isShownOverlay = ref(false)

const withLoader = async <T, U = unknown>(
  command: () => Promise<T>,
  onSuccess: (data: T) => T,
  onFailure: (err: unknown) => U,
): Promise<void> => {
  isShownOverlay.value = true
  try {
    const data = await command()
    onSuccess(data)
  } catch (e) {
    onFailure(e)
  }
  isShownOverlay.value = false
}

provideLoader({ withLoader })
</script>

<template>
  <slot></slot>
  <div class="modal-overlay" v-show="isShownOverlay"></div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  min-width: 100vw;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.3);
}
</style>
