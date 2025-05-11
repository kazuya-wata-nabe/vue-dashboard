<script lang="ts" setup>
withDefaults(
  defineProps<{
    size?: "auto" | "small" | "medium" | "large"
    isSubmitting: boolean
  }>(),
  { size: "auto" },
)

const emits = defineEmits<{
  click: []
}>()
</script>

<template>
  <div class="button-container" :class="{ loading: isSubmitting, [size]: true }">
    <button :disabled="isSubmitting" @click="!isSubmitting && emits('click')">
      <slot></slot>
    </button>
    <div v-show="isSubmitting" class="loader-container">
      <div class="loader"></div>
    </div>
  </div>
</template>

<style scoped>
.button-container {
  position: relative;
  display: flex;
  word-break: break-all;

  &.loading {
    opacity: 0.5;
  }
  &.medium {
    width: 200px;
  }
}

button {
  width: 100%;
  height: 40px;
  background: steelblue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.loader-container {
  position: absolute;
  display: flex;
  place-content: center;
  place-items: center;
  width: 100%;
  height: 100%;
}
.loader {
  padding: 8px;
  width: 30px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: white;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  mask: var(--_m);
  mask-composite: subtract;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}
</style>
