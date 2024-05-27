<script setup lang="ts">
import { ref } from "vue"

const DELAY = 1 * 1000

const dialog = ref<HTMLDialogElement>()
const isShown = ref(false)

const showDialog = ({ autoClose }: { autoClose?: true } = {}) => {
  isShown.value = true
  dialog.value?.showModal()
  if (autoClose) setTimeout(() => dialog.value?.close(), DELAY)
}
const closeModal = () => {
  dialog.value?.close()
  isShown.value = false
}

defineExpose({ showDialog })
</script>

<template>
  <dialog ref="dialog" class="alert-dialog" @click.self="closeModal">
    <Transition>
      <div class="alert-content" v-if="isShown">
        <slot v-bind="{ closeModal }"></slot>
      </div>
    </Transition>
  </dialog>
</template>

<style scoped>
.alert-dialog {
  border-color: royalblue;
  top: 0;
  left: 50%;
  padding: 0px;
  transform: translateX(-50%);
}

.alert-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 80px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
