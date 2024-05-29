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
    <div class="overlay" v-if="isOpen" @click="closeModal">
      <div class="dialog">
        <div class="content" @click.stop>
          <slot> </slot>
        </div>
        <slot name="button" v-bind="{ closeModal }"> </slot>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}

.dialog {
  display: flex;
  flex-direction: column;
  place-content: center;
  margin: 0 auto;
  padding: 20px 0;
  max-width: 300px;
  height: 100%;
}

.content {
  background: whitesmoke;
  margin: 0 auto;
  padding: 20px;
  width: fit-content;
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
