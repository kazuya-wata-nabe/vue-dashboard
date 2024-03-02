<script setup lang="ts">
import { FlexBox } from "@/components/parts"
import { RouterView } from "vue-router"

defineProps<{ headerHeight: string; slim: boolean }>()
defineEmits<{ toggle: [] }>()

const routes = [{ name: "Home", link: "home" }]
</script>

<template>
  <FlexBox class="col aside">
    <FlexBox class="row menu-icon" :class="{ slim }">
      <span class="material-symbols-outlined" :class="{ slim }" @click="$emit('toggle')"></span>
    </FlexBox>
    <FlexBox class="col">
      <ul>
        <template v-for="route in routes" :key="route.name">
          <li class="menu-item">
            <RouterView :to="route.link">{{ route.name }}</RouterView>
          </li>
        </template>
      </ul>
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

.menu-item {
  color: whitesmoke;
  list-style: none;
}
</style>
