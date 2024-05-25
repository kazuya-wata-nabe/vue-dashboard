<script setup lang="ts">
import { RouterLink } from "vue-router"
import { FlexCol, FlexRow } from "@/shared/components/parts"
import GoogleIcon from "@/shared/components/parts/google-icon.vue"

defineProps<{ headerHeight: string; slim: boolean }>()
defineEmits<{ toggle: [] }>()

const routes = [
  { name: "Home", link: "home", icon: "home" },
  { name: "Book", link: "book-list", icon: "book" },
]
</script>

<template>
  <FlexCol class="aside">
    <FlexRow class="row menu-icon">
      <GoogleIcon class="menu-toggle clickable" @click="$emit('toggle')" />
    </FlexRow>
    <FlexRow>
      <ul class="menu-list">
        <li class="menu-item" v-for="route in routes" :key="route.name">
          <RouterLink :to="{ name: route.link }" class="link">
            <GoogleIcon class="clickable">{{ route.icon }}</GoogleIcon>
            <span v-if="!slim">{{ route.name }}</span>
          </RouterLink>
        </li>
      </ul>
    </FlexRow>
  </FlexCol>
</template>

<style scoped>
.aside {
  grid-area: aside;
  height: calc(100vh - v-bind(headerHeight));
  background: dimgray;
}

.slim {
  padding: 0 0;
  justify-content: center;
}

.menu-icon {
  padding: 0 8px;
  justify-content: end;
}

.clickable {
  cursor: pointer;
}
.link {
  text-decoration: none;
  color: whitesmoke;
}
.menu-toggle {
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
.menu-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.menu-item {
  color: whitesmoke;
  list-style: none;
}
</style>
