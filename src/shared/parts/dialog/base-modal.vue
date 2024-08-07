<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"

defineProps<{
  isOpen: boolean
}>()

const emits = defineEmits<{
  close: []
}>()

const focusableElementsSelector =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
const overlay = ref<HTMLDivElement>()
const button = ref<HTMLButtonElement>()

const handleCloseModal = () => emits("close")
const handleOutSideClick = () => emits("close")
const handleKeyEsc = (event: KeyboardEvent) => {
  if (event.code === "Escape") {
    emits("close")
  }
}
const handleFocusTrap = (event: KeyboardEvent) => {
  if (event.code !== "Tab") {
    return
  }

  const focusableElements = overlay.value
    ? [...overlay.value.querySelectorAll<HTMLElement>(focusableElementsSelector)]
    : []
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[-1]

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault()
    lastElement?.focus()
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault()
    firstElement?.focus()
  }
}

onMounted(() => {
  document.addEventListener("click", handleOutSideClick)
  document.addEventListener("keydown", handleKeyEsc)
  document.addEventListener("keydown", handleFocusTrap)
})

onUnmounted(() => {
  document.removeEventListener("click", handleOutSideClick)
  document.removeEventListener("keydown", handleKeyEsc)
  document.removeEventListener("keydown", handleFocusTrap)
})
</script>

<template>
  <Transition>
    <div class="overlay" v-if="isOpen" ref="overlay">
      <div role="dialog">
        <div class="content">
          <button @click="handleCloseModal" ref="button">X</button>
          <slot name="content" v-bind="{ handleCloseModal }"> </slot>
        </div>
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

div[role="dialog"] {
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
