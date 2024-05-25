<script setup lang="ts">
defineOptions({ name: "BookList" })
</script>

<template>
  <div>book list</div>
  <RouterLink :to="{ name: 'book-add' }"> Add </RouterLink>
</template>
