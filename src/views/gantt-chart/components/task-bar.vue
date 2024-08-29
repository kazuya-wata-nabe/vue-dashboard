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
const bar = ref<HTMLDivElement>()
const east = ref<HTMLDivElement>()
const west = ref<HTMLDivElement>()

const size = computed(() => `${state.value.width / 100}px`)
const left = computed(() => `${state.value.offset}px`)

let mode: "move" | "expand-west" | "expand-east" | ""
let point = 0
let temp = 0
let temp2 = 0

const moveBar = (event: MouseEvent) => {
  if (!point) {
    point = event.offsetX
  }
  const parent = document.querySelector("#right")
  const parentLeft = parent?.scrollLeft ?? 0
  const shiftX = container.value?.offsetLeft ?? 0
  const value = event.pageX - shiftX - point + parentLeft
  state.value.offset = value > -1 ? value : 0
}

const onMouseMove = (event: MouseEvent) => {
  if (mode === "move") {
    moveBar(event)
  }
  // TODO: 分割
  else if (mode === "expand-east" && east.value && bar.value) {
    if (!temp) {
      temp = bar.value.offsetWidth
    }
    const value = event.pageX - bar.value.offsetLeft
    bar.value.style.width = `${value}px`
  }
  // TODO: 分割
  else if (mode === "expand-west" && west.value && bar.value && container.value) {
    if (!temp) {
      temp = bar.value.offsetWidth
    }
    if (!temp2) {
      temp2 = state.value.offset
    }
    const pos = event.pageX - container.value.offsetLeft
    state.value.offset = pos
    bar.value.style.width = `${temp + temp2 - pos}px`
  }
}

const onMouseUp = () => {
  mode = ""
  temp = 0
  temp2 = 0
  point = 0
}
const mouseMoveReset = () => {
  if (mode === "move") {
    mode = ""
  }
}
</script>

<template>
  <div
    class="task-bar-container"
    ref="container"
    @mousemove="onMouseMove"
    @mouseup="onMouseUp"
    @mouseout="mouseMoveReset"
    @blur="mouseMoveReset"
    role="button"
    tabindex="0"
  >
    <div
      class="position edge"
      role="button"
      ref="west"
      tabindex="0"
      @mousedown="() => (mode = 'expand-west')"
      @mouseup="onMouseUp"
    ></div>
    <div
      class="task-bar position"
      @mousedown="() => (mode = 'move')"
      @mouseup="onMouseUp"
      role="button"
      tabindex="0"
      ref="bar"
    ></div>
    <div
      class="position edge reverse"
      ref="east"
      role="button"
      tabindex="0"
      @mousedown="() => (mode = 'expand-east')"
      @mouseup="onMouseUp"
    ></div>
  </div>
</template>

<style scoped>
.position {
  position: relative;
  left: v-bind(left);
}

.edge {
  min-width: 10px;
  background-color: silver;
  cursor: w-resize;
  &:hover {
    opacity: 0.8;
  }
  &.reverse {
    cursor: e-resize;
  }
}

.task-bar-container {
  height: 30px;
  padding: 1px 0;
  display: flex;
  flex-direction: row;
}

.task-bar {
  height: 100%;
  width: calc(40 * v-bind(size) - 20px);
  background-color: silver;
  cursor: pointer;
}
</style>
