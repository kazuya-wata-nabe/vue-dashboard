<script setup lang="ts">
import { PublicLayout } from "@/components/layout"
import FlexBox from "@/components/parts/FlexBox.vue"
import InputForm from "@/components/parts/InputForm.vue"
import TextInput from "@/components/parts/TextInput.vue"
import TheButton from "@/components/parts/button/TheButton.vue"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { type AuthRepository } from "./model/repository"

const props = defineProps<{ repository: AuthRepository }>()
const router = useRouter()

const id = ref("")
const password = ref("")

const onSubmit = async () => {
  try {
    await props.repository.login({ id: id.value, password: password.value })
    await router.replace({ name: "home" })
  } catch {
    return alert("ng")
  }
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
          <TextInput label="id" v-model="id" />
          <TextInput label="password" type="password" v-model="password" />
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
./model/repository
