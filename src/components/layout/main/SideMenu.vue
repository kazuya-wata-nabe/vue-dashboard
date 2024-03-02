<script setup lang="ts">
import FlexBox from "@/components/parts/FlexBox.vue"

defineProps<{ headerHeight: string; slim: boolean }>()
defineEmits<{ toggle: [] }>()
</script>

<template>
  <FlexBox class="col aside">
    <FlexBox class="row menu-icon" :class="{ slim }">
      <span class="material-symbols-outlined" :class="{ slim }" @click="$emit('toggle')"></span>
    </FlexBox>
  </FlexBox>
</template>

<style scoped>
.aside {
  grid-area: aside;
  height: calc(100vh - v-bind(headerHeight));
  background: dimgray;
}

.menu-icon {
  padding: 0 8px;
  justify-content: end;

  &.slim {
    padding: 0 0;
    justify-content: center;
  }
}

.material-symbols-outlined {
  cursor: pointer;
  color: lightgray;

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
