<script lang="ts" setup>
defineProps<{
  isSubmitting: boolean
}>()

const emits = defineEmits<{
  click: []
}>()
</script>

<template>
  <div class="button-container" :class="{ loading: isSubmitting }">
    <button @click="emits('click')" :disabled="isSubmitting">
      <div class="loader" v-show="isSubmitting"></div>
      <slot></slot>
    </button>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  width: 100%;
  margin-top: 8px;

  &.loading {
    opacity: 0.5;
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
  position: relative;
}

.loader {
  position: absolute;
  top: 6px;
  left: 60px;
  width: 30px;
  padding: 8px;
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
