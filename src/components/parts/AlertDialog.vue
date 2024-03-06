<script setup lang="ts">
import { ref } from "vue"

const dialog = ref<HTMLDialogElement>()

const showDialog = () => dialog.value?.showModal()
const closeModal = () => dialog.value?.close()

defineExpose({ showDialog })
</script>

<template>
  <dialog ref="dialog" class="modal-dialog" @click.self="closeModal">
    <slot v-bind="{ closeModal }"></slot>
  </dialog>
</template>

<style scoped>
.modal-dialog {
  border: none;
  top: 0;
  left: 50%;
  padding: 0px;
  transform: translateX(-50%);
}
</style>
