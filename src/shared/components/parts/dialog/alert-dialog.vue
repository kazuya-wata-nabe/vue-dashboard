<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()

const emits = defineEmits<{
  close: []
}>()

const closeModal = () => emits("close")
</script>

<template>
  <Transition>
    <div class="alert-dialog" v-if="isOpen">
      <div class="alert-content">
        <slot v-bind="{ closeModal }"></slot>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.alert-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
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
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
