<script setup lang="ts">
import { FlexCol, FlexRow } from "@/shared/components/parts"
import { IconMenu, IconSideItem } from "@/shared/components/parts"
import { TypedLink } from "@/shared/components/parts/link"

defineProps<{
  slim: boolean
}>()

const emits = defineEmits<{ toggle: [] }>()

const routes = [
  { name: "Home", link: "home", icon: "home" },
  { name: "Book", link: "book-list", icon: "book" },
] as const
</script>

<template>
  <FlexCol :class="['aside', slim && 'aside-slim']">
    <FlexRow class="menu-icon">
      <IconMenu @click="emits('toggle')" />
    </FlexRow>
    <FlexRow>
      <ul class="menu-list">
        <li class="menu-item" v-for="route in routes" :key="route.name">
          <TypedLink :to="{ name: route.link }" class="link" active-class="active">
            <IconSideItem :icon="route.icon" />
            <span v-if="!slim">{{ route.name }}</span>
          </TypedLink>
        </li>
      </ul>
    </FlexRow>
  </FlexCol>
</template>

<style scoped>
.aside {
  grid-area: aside;
  height: calc(100vh - var(--header-height));
  background: dimgray;
}

.menu-icon {
  padding: 0 8px;
  justify-content: end;
}

.menu-list {
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  padding: 0 0;

  .menu-item {
    color: whitesmoke;
    list-style: none;
    position: relative;
    height: 60px;

    &:has(> .active) {
      background: lightgray;
    }
  }
}

.link {
  text-decoration: none;
  color: whitesmoke;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: inline-flex;
  padding: 16px 13px;

  &.active {
    color: var(--color-text);
  }
}

.aside-slim {
  align-items: center;

  .menu-toggle {
    &:hover {
      &::after {
        content: "arrow_forward";
      }
    }
  }

  .link {
    position: unset;
  }
}
</style>
