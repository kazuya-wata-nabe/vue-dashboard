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

const size = computed(() => `${state.value.width / 100}px`)
const left = computed(() => `${state.value.offset}px`)

let mode: "move" | "expand-west" | "expand-east" | ""
let point = 0
let temp = 0

const onMouseMove = (event: MouseEvent) => {
  if (mode !== "move") return
  if (!point) {
    point = event.offsetX
  }
  const parent = document.querySelector("#right")
  const parentLeft = parent?.scrollLeft ?? 0
  const shiftX = container.value?.offsetLeft ?? 0
  const value = event.pageX - shiftX - point + parentLeft
  state.value.offset = value > -1 ? value : 0
}

const expand = (event: MouseEvent) => {
  if (mode === "expand-east" && east.value && bar.value) {
    if (!temp) {
      temp = bar.value.offsetWidth
    }
    const shiftX = container.value?.offsetLeft ?? 0
    const value = event.pageX - shiftX - temp
    console.debug(value)
    bar.value.style.width = `${value}px`
  }
}

const onMouseUp = () => {
  mode = ""
  temp = 0
  point = 0
}
</script>

<template>
  <div class="task-bar-container" ref="container" @mousemove="expand" role="button" tabindex="0">
    <div
      class="position edge"
      role="button"
      tabindex="0"
      @mousedown="() => (mode = 'expand-west')"
      @mouseup="onMouseUp"
    ></div>
    <div
      class="task-bar position"
      @mousemove="onMouseMove"
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
