<script setup lang="ts">
import { PublicLayout } from '@/components/layout/public';
import FlexBox from "@/components/parts/FlexBox.vue";
import InputForm from '@/components/parts/InputForm.vue';
import TextInput from '@/components/parts/TextInput.vue';
import TheButton from '@/components/parts/button/TheButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const onSubmit = () => {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      router.replace({ name: "home" })
      resolve()
    }, 1 * 1000)
  })
}
</script>

<template>
  <PublicLayout>
    <main>
      <FlexBox class="column">
        <FlexBox class="column header">
          <h1>This is Header Area</h1>
        </FlexBox>
        <InputForm @submit.prevent id="form">
          <TextInput label="id" />
          <TextInput label="password" type="password" />
          <TheButton :command="onSubmit">submit</TheButton>
        </InputForm>
      </FlexBox>
    </main>
  </PublicLayout>
</template>

<style scoped>
.header {
  height: 100px;
  place-content: center;
}
</style>
