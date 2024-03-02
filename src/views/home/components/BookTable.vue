<script setup lang="ts" generic="T">
type Item<T> = {
  id: string
} & T

defineProps<{ items: Item<T>[] }>()
</script>

<template>
  <table class="outline">
    <thead class="outline">
      <tr>
        <slot name="head"></slot>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <slot name="record" v-bind="{ item }"></slot>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table,
:slotted(th),
:slotted(td) {
  border: 1px solid black;
  border-collapse: collapse;
}
:slotted(th) {
  background: gainsboro;
}
</style>
