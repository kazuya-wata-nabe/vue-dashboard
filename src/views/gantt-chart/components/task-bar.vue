<script setup lang="ts">
import { computed, ref } from "vue"

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  width: number
  offset: number
}>()

// TODO: watch reactivity
const state = ref({ width: props.width, offset: props.offset })
const container = ref<HTMLDivElement>()

const size = computed(() => `${state.value.width / 100}px`)
const left = computed(() => `${state.value.offset}px`)

let mousedown = false
let point = 0

const onMouseMove = (event: MouseEvent) => {
  if (!mousedown) return
  if (!point) {
    point = event.offsetX
  }
  const parent = document.querySelector("#right")
  const parentLeft = parent?.scrollLeft ?? 0
  const shiftX = container.value?.offsetLeft ?? 0
  const value = event.pageX - shiftX - point + parentLeft
  state.value.offset = value > -1 ? value : 0
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
