<script setup lang="ts">
import FlexBox from '@/components/parts/FlexBox.vue';

defineProps<{ headerHeight: string, slim: boolean }>()
defineEmits<{ "toggle": [] }>()
</script>

<template>
  <FlexBox class="column aside">
    <FlexBox class="row menu-icon">
      <span class="material-symbols-outlined" :class="{ slim }" @click="$emit('toggle')"></span>
    </FlexBox>
  </FlexBox>
</template>

<style scoped>
.aside {
  grid-area: aside;
  height: calc(100vh - v-bind(headerHeight));
  background: lightsteelblue;
}

.menu-icon {
  justify-content: end;
  padding: 0 8px;
}

.material-symbols-outlined {
  cursor: pointer;

  &::after {
    content: "menu";
  }

  &:hover {
    &::after {
      content: "arrow_back";
    }
  }

  &.slim:hover {
    &::after {
      content: "arrow_forward";
    }
  }
}
</style>