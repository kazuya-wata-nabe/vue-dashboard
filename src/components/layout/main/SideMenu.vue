<script setup lang="ts">
import { FlexBox } from "@/components/parts"
import GoogleIcon from "@/components/parts/GoogleIcon.vue"
import { RouterLink } from "vue-router"

defineProps<{ headerHeight: string; slim: boolean }>()
defineEmits<{ toggle: [] }>()

const routes = [
  { name: "Home", link: "home", icon: "home" },
  // TODO: implements route
  { name: "Book", link: "home", icon: "book" },
  // TODO: implements route
  { name: "WebSocket", link: "home", icon: "rocket" },
]
</script>

<template>
  <FlexBox class="col aside">
    <FlexBox class="row menu-icon" :class="{ slim }">
      <GoogleIcon class="menu-toggle clickable" :class="{ slim }" @click="$emit('toggle')" />
    </FlexBox>
    <FlexBox class="row" :class="{ slim }">
      <ul class="menu-list" :class="{ slim }">
        <template v-for="route in routes" :key="route.name">
          <li class="menu-item">
            <RouterLink :to="{ name: route.link }" class="link">
              <GoogleIcon class="clickable">{{ route.icon }}</GoogleIcon>
              <span v-if="!slim">{{ route.name }}</span>
            </RouterLink>
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
