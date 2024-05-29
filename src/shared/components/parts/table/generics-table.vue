<script setup lang="ts" generic="T extends { id: string | number }">
defineProps<{ items: T[] }>()
</script>

<template>
  <table v-if="items.length">
    <thead>
      <tr class="table-header">
        <slot name="head"></slot>
      </tr>
    </thead>
    <tbody class="table-body">
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
  padding: 8px 16px;
}
:slotted(th) {
  background: gainsboro;
}
</style>
