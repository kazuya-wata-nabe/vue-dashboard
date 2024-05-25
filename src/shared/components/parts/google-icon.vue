<script lang="ts" setup>
import { computed } from "vue"

const props = defineProps<{
  dark?: true
  clickable?: true
  colorInherit?: true
}>()

const classes = computed(() => ({
  "material-symbols-outlined": true,
  dark: props.dark,
  clickable: props.clickable,
  "color-inherit": props.colorInherit,
}))
</script>

<template>
  <span :class="classes" v-bind="$attrs"><slot></slot></span>
</template>

<style scoped>
span {
  color: lightgray;

  &.color-inherit {
    color: inherit;
  }

  &.dark {
    color: black;
  }
}

.clickable {
  cursor: pointer;
}
</style>
