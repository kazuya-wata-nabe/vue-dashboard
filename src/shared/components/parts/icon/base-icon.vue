<script lang="ts" setup>
import { computed } from "vue"

const props = defineProps<{
  dark?: true
  clickable?: true
}>()

const classes = computed(() => ({
  "material-symbols-outlined": true,
  dark: props.dark,
  clickable: props.clickable,
}))
</script>

<template>
  <span :class="classes" v-bind="$attrs"><slot></slot></span>
</template>

<style scoped>
span {
  color: lightgray;
  &.dark {
    color: dimgray;
  }
}

.clickable {
  cursor: pointer;
}
</style>
