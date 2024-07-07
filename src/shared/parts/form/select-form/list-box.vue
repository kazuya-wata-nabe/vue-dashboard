<script lang="ts" setup>
import { computed, ref } from "vue"

defineProps<{
  id: string
  isOpen: boolean
}>()
</script>

<template>
  <ul role="listbox" class="listbox pointer" :aria-labelledby="id" :aria-expanded="isOpen">
    <slot></slot>
  </ul>
</template>

<style scoped>
.pointer {
  cursor: pointer;
}

.combobox {
  position: relative;
  width: 100px;
}

.combobox-list {
}

.eclipse {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.group {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 1.6rem;
  border: solid 1px;
  position: relative;
}

.select-input {
  line-height: 1.2rem;
}

.pl-10 {
  padding: 0 0 0 10px;
}

.display-value {
  width: 100%;
}

.listbox {
  width: 100%;
  position: absolute;
  margin: 2px 0 0 0;
  padding: 0;
  border: solid 1px;
  display: flex;
  flex-direction: column;

  &:not([aria-expanded="true"]) {
    width: 0;
    height: 0;
    overflow: hidden;
    border: none;
  }
}

.option {
  list-style: none;
  padding: 0 0 0 10px;

  &:hover {
    background: whitesmoke;
  }
}

button:not([aria-expanded="true"]) + ul {
  width: 0;
  height: 0;
  overflow: hidden;
}
</style>
