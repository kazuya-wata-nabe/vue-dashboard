<script setup lang="ts">
import { computed, ref } from "vue"

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  width: number
  offset: number
}>()

// TODO: watch reactivity
const state = ref({ width: props.width, offset: props.offset })

const size = computed(() => `${state.value.width / 100}px`)
const left = computed(() => `${state.value.offset}px`)

const container = ref<HTMLDivElement>()

let mousedown = false

const onMouseMove = (event: MouseEvent) => {
  if (mousedown && event.target instanceof HTMLElement && container.value) {
    const shiftX = container.value.offsetLeft
    const mouseX = event.clientX - event.target.getBoundingClientRect().left
    // console.debug(event.clientX)
    // console.debug(event.pageX)
    console.debug(mouseX)

    event.target.style.left = event.pageX + (shiftX - mouseX) + "px"
  }
}
</script>

<template>
  <div class="task-bar-container" ref="container">
    <div
      class="task-bar"
      @mousemove="onMouseMove"
      @mousedown="() => (mousedown = true)"
      @mouseup="() => (mousedown = false)"
      @focus="() => {}"
      role="button"
      tabindex="0"
    ></div>
  </div>
</template>

<style scoped>
.task-bar-container {
  height: 30px;
  padding: 1px 0;
}

.task-bar {
  height: 100%;
  width: calc(40 * v-bind(size));
  background-color: silver;
  position: relative;
  left: v-bind(left);
  cursor: pointer;
}
</style>
