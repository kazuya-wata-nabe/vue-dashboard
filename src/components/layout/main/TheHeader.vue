<script lang="ts" setup>
import FlexBox from '@/components/parts/FlexBox.vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const onClickLogout = () => router.replace({ name: "login" })
</script>

<template>
  <FlexBox class="row header">
    this is header
    <FlexBox class="row icons" gap="24">
      <span class="material-symbols-outlined" @click="onClickLogout">
        logout
      </span>
      <span class="material-symbols-outlined">
        more_horiz
      </span>
    </FlexBox>
  </FlexBox>
</template>

<style scoped>
.header {
  grid-area: header;
  background: whitesmoke;
  justify-content: space-between;
}

.icons {
  place-content: center;
  place-items: center;
  padding: 0 16px;
}

.material-symbols-outlined {
  cursor: pointer;
}
</style>